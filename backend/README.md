# Backend API

This is the backend API for the application.

## Render Deployment

This backend is configured for deployment on Render.com.

### Database Setup:

The backend now supports both SQLite (development) and PostgreSQL (production).

**For Render Deployment:**
1. Create a PostgreSQL database service on Render
2. Copy the database URL from Render
3. Add it as an environment variable `DATABASE_URL` in your web service

### Deployment Steps:

1. Push this code to a GitHub repository
2. Connect the repository to Render
3. Create a PostgreSQL database service first
4. Create a new Web Service with these settings:
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - **Environment**: Python 3.11
   - **Environment Variable**: `DATABASE_URL` (from your PostgreSQL service)

### Adding Your Joblib Model:

**Note**: ML dependencies have been temporarily removed to ensure successful deployment. 
To add your joblib model later:
1. Add ML dependencies back to requirements.txt (scikit-learn, joblib, numpy, pandas)
2. Upload your `.joblib` file to the backend directory  
3. Add the model loading and prediction endpoints
4. Redeploy the service

### Environment Variables (Optional):

- `DATABASE_URL`: Database connection string (PostgreSQL for production, SQLite for development)
- `CORS_ORIGINS`: Allowed origins for CORS (default: *)

### Database Configuration:

**Development (SQLite):**
```bash
# No DATABASE_URL needed - uses sqlite:///./contacts.db by default
```

**Production (PostgreSQL on Render):**
```bash
DATABASE_URL=postgresql://username:password@hostname:port/database_name
```

## Setup

1. Create a virtual environment:
```bash
python -m venv venv
```

2. Activate the virtual environment:
```bash
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run the server:
```bash
python main.py
```

The API will be available at http://localhost:8000