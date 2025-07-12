from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
from datetime import datetime
from typing import Optional
from sqlalchemy import create_engine, Column, Integer, String, DateTime, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy.sql import func

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database configuration
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./contacts.db")

# SQLAlchemy setup
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Database model
class Contact(Base):
    __tablename__ = "contacts"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    company = Column(String, nullable=True)
    message = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

# Get port from environment variable (Render sets this automatically)
PORT = int(os.getenv("PORT", 8000))
# Pydantic model for contact form data
class ContactForm(BaseModel):
    name: str
    email: str
    company: Optional[str] = None
    message: str

# Database dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def init_database():
    """Create database tables."""
    Base.metadata.create_all(bind=engine)

def insert_contact(db: Session, contact_data: ContactForm):
    """Insert a new contact form submission into the database."""
    db_contact = Contact(
        name=contact_data.name,
        email=contact_data.email,
        company=contact_data.company,
        message=contact_data.message
    )
    db.add(db_contact)
    db.commit()
    db.refresh(db_contact)
    return db_contact.id

def get_all_contacts(db: Session):
    """Retrieve all contact form submissions from the database."""
    contacts = db.query(Contact).order_by(Contact.created_at.desc()).all()
    
    # Convert to list of dictionaries
    contact_list = []
    for contact in contacts:
        contact_list.append({
            "id": contact.id,
            "name": contact.name,
            "email": contact.email,
            "company": contact.company,
            "message": contact.message,
            "created_at": contact.created_at.isoformat() if contact.created_at else None
        })
    
    return contact_list

# Initialize database on startup
init_database()

@app.get("/")
async def root():
    return {"message": "Successfully deployed!"}

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "database": "connected"}

@app.post("/api/contact")
async def submit_contact_form(contact_data: ContactForm, db: Session = next(get_db())):
    """Handle contact form submissions and store them in the database."""
    try:
        contact_id = insert_contact(db, contact_data)
        return {
            "success": True,
            "message": "Cosmic transmission received successfully!",
            "contact_id": contact_id,
            "data": contact_data.dict()
        }
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Failed to store contact data: {str(e)}")
    finally:
        db.close()

@app.get("/api/contacts")
async def get_contacts(db: Session = next(get_db())):
    """Retrieve all contact form submissions (for admin use)."""
    try:
        contacts = get_all_contacts(db)
        return {
            "success": True,
            "count": len(contacts),
            "contacts": contacts
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to retrieve contacts: {str(e)}")
    finally:
        db.close()

@app.get("/api/contacts/count")
async def get_contacts_count(db: Session = next(get_db())):
    """Get the total number of contact form submissions."""
    try:
        count = db.query(Contact).count()
        return {
            "success": True,
            "total_contacts": count
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get contact count: {str(e)}")
    finally:
        db.close()

@app.get("/api/mock-data")
async def get_mock_data():
    """Return mock CME data for dashboard display."""
    return {
        "success": True,
        "cme_events": [
            {
                "id": "CME-2024-001",
                "timestamp": "2024-12-19T08:45:00Z",
                "confidence": 0.92,
                "velocity": 650,
                "density": 12.5,
                "temperature": 1.2e5,
                "status": "detected"
            },
            {
                "id": "CME-2024-002", 
                "timestamp": "2024-12-19T06:20:00Z",
                "confidence": 0.87,
                "velocity": 580,
                "density": 8.9,
                "temperature": 9.8e4,
                "status": "confirmed"
            }
        ],
        "model_metrics": {
            "accuracy": 94.2,
            "detection_rate": 69.02,
            "precision": 91.8,
            "recall": 96.5,
            "f1_score": 88.2,
            "total_events": 24313,
            "confirmed_events": 16781
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=PORT)