from fastapi import FastAPI, HTTPException, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import Optional
from datetime import datetime
import motor.motor_asyncio
import os
from dotenv import load_dotenv
import urllib.parse

# Load environment variables
load_dotenv()

app = FastAPI()
router = APIRouter()

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB Configuration - Improved with better error handling
MONGO_URI = os.getenv("MONGO_URI")

if not MONGO_URI:
    # Construct URI from components if MONGO_URI not provided directly
    username = os.getenv("MONGO_USERNAME", "")
    password = os.getenv("MONGO_PASSWORD", "")
    cluster = os.getenv("MONGO_CLUSTER", "")
    db_name = os.getenv("MONGO_DB_NAME", "")
    
    if not all([username, password, cluster, db_name]):
        raise ValueError(
            "Either MONGO_URI or all of MONGO_USERNAME, MONGO_PASSWORD, "
            "MONGO_CLUSTER, and MONGO_DB_NAME must be set in environment variables"
        )
    
    # Safely encode password
    encoded_password = urllib.parse.quote_plus(password)
    MONGO_URI = (
        f"mongodb+srv://{username}:{encoded_password}@{cluster}/{db_name}"
        "?retryWrites=true&w=majority"
    )

# MongoDB Client with improved error handling
try:
    # Update your MongoDB client configuration
    client = motor.motor_asyncio.AsyncIOMotorClient(
    MONGO_URI,
    tls=True,
    tlsAllowInvalidCertificates=True,  # Bypass certificate validation
    serverSelectionTimeoutMS=5000
)
    db = client.get_database(os.getenv("MONGO_DB_NAME", "contacts_db"))
    contacts_collection = db["contacts"]
except Exception as e:
    raise RuntimeError(f"Failed to connect to MongoDB: {str(e)}")

# Pydantic Models
class ContactForm(BaseModel):
    name: str = Field(..., min_length=2, max_length=50)
    email: str = Field(..., pattern=r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$")
    company: Optional[str] = Field(None, max_length=50)
    message: str = Field(..., min_length=5, max_length=1000)

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

# Health Check Endpoint
@router.get("/api/health")
async def health_check():
    try:
        await client.admin.command('ping')
        return {
            "status": "healthy",
            "database": "connected"
        }
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"MongoDB connection failed: {str(e)}"
        )

# Contact Form Submission
@router.post("/api/contact", response_model=ContactOut)
async def submit_contact_form(contact_data: ContactForm):
    try:
        contact_dict = contact_data.model_dump()
        contact_dict["created_at"] = datetime.utcnow()
        
        result = await contacts_collection.insert_one(contact_dict)
        inserted_contact = await contacts_collection.find_one({"_id": result.inserted_id})
        
        if not inserted_contact:
            raise HTTPException(status_code=500, detail="Failed to retrieve created contact")
            
        inserted_contact["_id"] = str(inserted_contact["_id"])
        return ContactOut(**inserted_contact)
        
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=f"Failed to process contact form: {str(e)}"
        )

# Get All Contacts
@router.get("/api/contacts", response_model=list[ContactOut])
async def get_contacts():
    try:
        contacts = []
        async for doc in contacts_collection.find().sort("created_at", -1):
            doc["_id"] = str(doc["_id"])
            contacts.append(ContactOut(**doc))
        return contacts
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to fetch contacts: {str(e)}"
        )

# Root Endpoint
@router.get("/")
async def root():
    return {"message": "Contact API Service"}

# Include router
app.include_router(router)

# Startup Event
@app.on_event("startup")
async def startup_db_client():
    try:
        await client.admin.command('ping')
        print("Pinged your deployment. You successfully connected to MongoDB!")
    except Exception as e:
        print(f"Failed to connect to MongoDB: {e}")
        raise