from fastapi import FastAPI, HTTPException, APIRouter, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import Optional, AsyncGenerator
from datetime import datetime
import motor.motor_asyncio
import os
from dotenv import load_dotenv
import ssl
from contextlib import asynccontextmanager
import logging
import certifi

# Load environment variables
load_dotenv()

# Logging setup
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# MongoDB Configuration
MONGO_URI = os.getenv("MONGO_URI")
if not MONGO_URI:
    raise ValueError("MONGO_URI environment variable is required")

DB_NAME = os.getenv("MONGO_DB_NAME", "contacts_db")
COLLECTION_NAME = "contacts"

@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    """Lifespan handler for MongoDB connection management"""
    client = None
    try:
        client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_URI,
        tls=True,
        tlsCAFile=certifi.where()
        )

        # Try pinging MongoDB
        await client.admin.command("ping")
        logger.info("✅ Successfully connected to MongoDB")

        app.state.mongo_client = client

        # Optional: Create index on created_at
        db = client[DB_NAME]
        await db[COLLECTION_NAME].create_index("created_at", background=True)

    except Exception as e:
        logger.error("❌ Failed to connect to MongoDB: %s", str(e))
        # Store None if connection fails - routes will need to handle this
        app.state.mongo_client = None
        # Continue startup but services will fail when trying to use MongoDB

    yield

    if client:
        client.close()
        logger.info("🔒 MongoDB connection closed")

# Initialize FastAPI with lifespan handler
app = FastAPI(lifespan=lifespan)
router = APIRouter()

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ------------------------
# Pydantic Models
# ------------------------

class ContactForm(BaseModel):
    name: str = Field(..., min_length=2, max_length=50)
    email: EmailStr
    company: Optional[str] = Field(None, max_length=50)
    message: str = Field(..., min_length=1, max_length=1000)

    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "name": "John Doe",
                "email": "user@example.com",
                "company": "Acme Inc",
                "message": "I'm interested in your services"
            }
        }
    )

class ContactOut(ContactForm):
    id: str = Field(..., alias="_id")
    created_at: datetime

    model_config = ConfigDict(
        populate_by_name=True,
        from_attributes=True
    )

# ------------------------
# Dependency
# ------------------------

async def get_contacts_collection():
    if not app.state.mongo_client:
        raise HTTPException(status_code=503, detail="Database unavailable")
    db = app.state.mongo_client[DB_NAME]
    return db[COLLECTION_NAME]

# ------------------------
# Routes
# ------------------------

@router.get("/api/health")
async def health_check():
    try:
        if not app.state.mongo_client:
            return {"status": "unhealthy", "database": "disconnected"}
        
        await app.state.mongo_client.admin.command('ping')
        return {"status": "healthy", "database": "connected"}
    except Exception as e:
        return {"status": "unhealthy", "database": "error", "detail": str(e)}

@router.post("/api/contact", response_model=ContactOut)
async def submit_contact_form(
    contact_data: ContactForm,
    contacts_collection=Depends(get_contacts_collection)
):
    try:
        contact_dict = contact_data.model_dump()
        contact_dict["created_at"] = datetime.utcnow()

        result = await contacts_collection.insert_one(contact_dict)
        inserted_contact = await contacts_collection.find_one({"_id": result.inserted_id})

        if not inserted_contact:
            raise HTTPException(status_code=500, detail="Failed to retrieve created contact")

        inserted_contact["_id"] = str(inserted_contact["_id"])
        return ContactOut(**inserted_contact)

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to process contact form: {str(e)}")

@router.get("/api/contacts", response_model=list[ContactOut])
async def get_contacts(
    contacts_collection=Depends(get_contacts_collection)
):
    try:
        contacts = []
        async for doc in contacts_collection.find().sort("created_at", -1):
            doc["_id"] = str(doc["_id"])
            contacts.append(ContactOut(**doc))
        return contacts
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch contacts: {str(e)}")

@router.get("/")
async def root():
    return {"message": "Contact API Service"}

# Include router
app.include_router(router)