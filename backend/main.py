from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from bson import ObjectId
import motor.motor_asyncio
import os
from dotenv import load_dotenv

load_dotenv()  # Load environment variables from .env (in dev)

app = FastAPI()

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB setup
MONGO_URI = os.getenv("MONGO_URI")  # set this in your Render environment or .env file
client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_URI)
db = client.contacts_db
contacts_collection = db.contacts


# Pydantic models
class ContactForm(BaseModel):
    name: str
    email: str
    company: Optional[str] = None
    message: str


class ContactOut(ContactForm):
    id: str
    created_at: datetime


# Routes

@app.get("/")
async def root():
    return {"message": "Successfully deployed with MongoDB!"}


@app.get("/api/health")
async def health_check():
    try:
        await client.server_info()
        return {"status": "healthy", "database": "connected"}
    except Exception:
        raise HTTPException(status_code=500, detail="MongoDB connection failed")


@app.post("/api/contact")
async def submit_contact_form(contact_data: ContactForm):
    """Store a new contact submission."""
    contact = contact_data.dict()
    contact["created_at"] = datetime.utcnow()
    result = await contacts_collection.insert_one(contact)
    return {
        "success": True,
        "message": "Cosmic transmission received successfully!",
        "contact_id": str(result.inserted_id),
        "data": contact_data.dict()
    }


@app.get("/api/contacts", response_model=List[ContactOut])
async def get_contacts():
    """Get all contact form submissions."""
    contacts = []
    async for doc in contacts_collection.find().sort("created_at", -1):
        doc["id"] = str(doc["_id"])
        contacts.append(ContactOut(**doc))
    return contacts


@app.get("/api/contacts/count")
async def get_contacts_count():
    count = await contacts_collection.count_documents({})
    return {
        "success": True,
        "total_contacts": count
    }


# For local testing
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
