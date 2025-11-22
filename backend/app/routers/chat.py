from fastapi import APIRouter
from pydantic import BaseModel
from datetime import datetime
from app import data

router = APIRouter()

class SendMessageRequest(BaseModel):
    contactId: str
    text: str

from app.database import supabase

@router.get("/contacts")
async def get_contacts():
    response = supabase.table("contacts").select("*").execute()
    # Map snake_case to camelCase if needed
    contacts = []
    for c in response.data:
        contacts.append({
            "id": c["id"],
            "name": c["name"],
            "specialty": c["specialty"],
            "avatar": c["avatar"],
            "status": c["status"],
            "lastMessage": c["last_message"],
            "lastMessageTime": c["last_message_time"],
            "unreadCount": c["unread_count"]
        })
    return contacts

@router.get("/messages/{contact_id}")
async def get_messages(contact_id: str):
    response = supabase.table("messages").select("*").eq("contact_id", contact_id).execute()
    messages = []
    for m in response.data:
        messages.append({
            "id": m["id"],
            "senderId": m["sender_id"],
            "text": m["text"],
            "timestamp": m["timestamp"],
            "isMe": m["is_me"]
        })
    return messages

@router.post("/messages")
async def send_message(request: SendMessageRequest):
    new_message = {
        "id": str(datetime.now().timestamp()),
        "contact_id": request.contactId,
        "sender_id": "me",
        "text": request.text,
        "timestamp": datetime.now().strftime("%I:%M %p"),
        "is_me": True
    }
    
    supabase.table("messages").insert(new_message).execute()
    
    return {
        "id": new_message["id"],
        "senderId": new_message["sender_id"],
        "text": new_message["text"],
        "timestamp": new_message["timestamp"],
        "isMe": new_message["is_me"]
    }
