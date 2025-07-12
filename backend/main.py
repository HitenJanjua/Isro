from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
from datetime import datetime
from typing import Optional
import joblib
import numpy as np
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

# Pydantic model for ML prediction request
class PredictionRequest(BaseModel):
    features: list

# Load joblib model (add this when you upload your model file)
# MODEL_PATH = "model.joblib"  # Update with your actual model filename
# try:
#     model = joblib.load(MODEL_PATH)
#     print(f"Model loaded successfully from {MODEL_PATH}")
# except FileNotFoundError:
#     print(f"Warning: Model file {MODEL_PATH} not found. ML endpoints will not work.")
#     model = None
# except Exception as e:
#     print(f"Error loading model: {e}")
#     model = None
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

@app.post("/api/predict")
async def make_prediction(request: PredictionRequest):
    """Make predictions using the loaded joblib model."""
    # Uncomment and modify this when you add your joblib file
    # try:
    #     if model is None:
    #         raise HTTPException(status_code=503, detail="Model not available")
    #     
    #     # Convert input to numpy array
    #     features = np.array(request.features).reshape(1, -1)
    #     
    #     # Make prediction
    #     prediction = model.predict(features)
    #     
    #     return {
    #         "success": True,
    #         "prediction": prediction.tolist(),
    #         "message": "Prediction completed successfully"
    #     }
    # except Exception as e:
    #     raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")
    
    # Temporary response until you add your model
    return {
        "success": False,
        "message": "Model endpoint ready - please upload your joblib file"
    }

@app.post("/api/refresh-analysis")
async def refresh_analysis():
    """Refresh CME analysis using the joblib model."""
    # This endpoint will run your joblib model when refresh button is clicked
    # Uncomment and modify when you add your model file
    # try:
    #     if model is None:
    #         raise HTTPException(status_code=503, detail="Model not available")
    #     
    #     # Add your model logic here
    #     # For example, if your model processes CME data:
    #     # result = model.predict(cme_data)
    #     
    #     return {
    #         "success": True,
    #         "analysis": "Updated analysis results",
    #         "timestamp": datetime.now().isoformat()
    #     }
    # except Exception as e:
    #     raise HTTPException(status_code=500, detail=f"Analysis refresh failed: {str(e)}")
    
    # Temporary response
    return {
        "success": True,
        "message": "Analysis refresh endpoint ready - please upload your joblib file",
        "timestamp": datetime.now().isoformat()
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=PORT)