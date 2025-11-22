from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Optional, Any
from datetime import datetime
import data

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class LoginRequest(BaseModel):
    username: str
    password: str

class Message(BaseModel):
    id: str
    senderId: str
    text: str
    timestamp: str
    isMe: bool

class SendMessageRequest(BaseModel):
    contactId: str
    text: str

# Routes
@app.post("/api/login")
async def login(request: LoginRequest):
    # Mock login
    if request.username and request.password:
        return {"token": "mock-token-123", "user": {"name": "Dr. Castillo"}}
    raise HTTPException(status_code=401, detail="Invalid credentials")

@app.get("/api/evidence")
async def get_evidence():
    return data.MOCK_EVIDENCE

@app.get("/api/patient/{patient_id}")
async def get_patient(patient_id: str):
    if patient_id == "1234":
        return data.MOCK_PATIENT
    raise HTTPException(status_code=404, detail="Patient not found")

@app.get("/api/anonymization")
async def get_anonymization_data():
    return data.MOCK_ANONYMIZATION

@app.get("/api/contacts")
async def get_contacts():
    return data.MOCK_CONTACTS

@app.get("/api/messages/{contact_id}")
async def get_messages(contact_id: str):
    return data.MOCK_MESSAGES.get(contact_id, [])

@app.post("/api/messages")
async def send_message(request: SendMessageRequest):
    contact_id = request.contactId
    if contact_id not in data.MOCK_MESSAGES:
        data.MOCK_MESSAGES[contact_id] = []
    
    new_message = {
        "id": str(datetime.now().timestamp()),
        "senderId": "me",
        "text": request.text,
        "timestamp": datetime.now().strftime("%I:%M %p"),
        "isMe": True
    }
    
    data.MOCK_MESSAGES[contact_id].append(new_message)
    return new_message

@app.get("/")
async def root():
    return {"message": "SADI Backend is running"}
