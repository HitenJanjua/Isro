from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import sqlite3
import os
from datetime import datetime
from typing import Optional

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database file path
DB_FILE = "contacts.db"

# Pydantic model for contact form data
class ContactForm(BaseModel):
    name: str
    email: str
    company: Optional[str] = None
    message: str

def init_database():
    """Initialize the SQLite database and create the contacts table if it doesn't exist."""
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS contacts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            company TEXT,
            message TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    conn.commit()
    conn.close()

def insert_contact(contact_data: ContactForm):
    """Insert a new contact form submission into the database."""
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    
    cursor.execute('''
        INSERT INTO contacts (name, email, company, message, created_at)
        VALUES (?, ?, ?, ?, ?)
    ''', (
        contact_data.name,
        contact_data.email,
        contact_data.company,
        contact_data.message,
        datetime.now().isoformat()
    ))
    
    contact_id = cursor.lastrowid
    conn.commit()
    conn.close()
    
    return contact_id

def get_all_contacts():
    """Retrieve all contact form submissions from the database."""
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    
    cursor.execute('''
        SELECT id, name, email, company, message, created_at
        FROM contacts
        ORDER BY created_at DESC
    ''')
    
    contacts = cursor.fetchall()
    conn.close()
    
    # Convert to list of dictionaries
    contact_list = []
    for contact in contacts:
        contact_list.append({
            "id": contact[0],
            "name": contact[1],
            "email": contact[2],
            "company": contact[3],
            "message": contact[4],
            "created_at": contact[5]
        })
    
    return contact_list

# Initialize database on startup
init_database()

@app.get("/")
async def root():
    return {"message": "Stellar Labs API - Ready for cosmic transmissions!"}

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "database": "connected"}

@app.post("/api/contact")
async def submit_contact_form(contact_data: ContactForm):
    """Handle contact form submissions and store them in the database."""
    try:
        contact_id = insert_contact(contact_data)
        return {
            "success": True,
            "message": "Cosmic transmission received successfully!",
            "contact_id": contact_id,
            "data": contact_data.dict()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to store contact data: {str(e)}")

@app.get("/api/contacts")
async def get_contacts():
    """Retrieve all contact form submissions (for admin use)."""
    try:
        contacts = get_all_contacts()
        return {
            "success": True,
            "count": len(contacts),
            "contacts": contacts
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to retrieve contacts: {str(e)}")

@app.get("/api/contacts/count")
async def get_contacts_count():
    """Get the total number of contact form submissions."""
    try:
        conn = sqlite3.connect(DB_FILE)
        cursor = conn.cursor()
        cursor.execute("SELECT COUNT(*) FROM contacts")
        count = cursor.fetchone()[0]
        conn.close()
        
        return {
            "success": True,
            "total_contacts": count
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get contact count: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)