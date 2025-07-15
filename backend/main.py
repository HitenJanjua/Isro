from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from typing import Optional
from dotenv import load_dotenv
import os
import logging
import ssl
import certifi
from motor.motor_asyncio import AsyncIOMotorClient

ssl_context = ssl.create_default_context(cafile=certifi.where())


app = FastAPI()

logger = logging.getLogger("uvicorn.error")

# CORS settings
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or restrict to specific origins like ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
load_dotenv()
# MongoDB setup
MONGO_DETAILS = os.environ.get("MONGO_URI")

# Alternative SSL configuration that often works with Atlas
client = AsyncIOMotorClient(
    MONGO_DETAILS,
    tls=True,
    tlsInsecure=False,
    tlsCAFile=certifi.where()
)
db = client.contact_db
collection = db.submissions

# Request model
class ContactForm(BaseModel):
    name: str
    email: EmailStr
    company: Optional[str] = None
    message: str

@app.get("/")
async def root():
    return {"message": "Successfully deployed!"}

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "database": "connected"}

@app.post("/api/contact")
async def submit_form(data: ContactForm):
    try:
        result = await collection.insert_one(data.dict())
        return {
            "status": "success",
            "id": str(result.inserted_id),
            "message": "Form submitted successfully."
        }
    except Exception as e:
        logger.error(f"Database insert error: {e}")
        raise HTTPException(status_code=500, detail=f"Database insert error: {str(e)}")