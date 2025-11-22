from pydantic import BaseModel
from typing import List, Optional, Dict, Any

class Document(BaseModel):
    id: int
    content: str
    metadata: Dict[str, Any]
    embedding: Optional[List[float]] = None

class Patient(BaseModel):
    id: str
    name: str
    diagnosis: str
    lastVisit: str
    adherenceRate: int
    alerts: List[str]

class Contact(BaseModel):
    id: str
    name: str
    specialty: str
    avatar: str
    status: str
    lastMessage: str
    lastMessageTime: str
    unreadCount: int

class Message(BaseModel):
    id: str
    contact_id: str
    senderId: str
    text: str
    timestamp: str
    isMe: bool

class AnonymizationLog(BaseModel):
    id: str
    original: Dict[str, Any]
    anonymized: Dict[str, Any]
