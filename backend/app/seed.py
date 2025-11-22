import asyncio
from app import data
from app.database import supabase
import json

async def seed_data():
    print("Seeding data...")

    # Seed Patients
    print("Seeding patients...")
    patient = data.MOCK_PATIENT
    # Check if patient exists
    res = supabase.table("patients").select("*").eq("id", patient["id"]).execute()
    if not res.data:
        supabase.table("patients").insert({
            "id": patient["id"],
            "name": patient["name"],
            "diagnosis": patient["diagnosis"],
            "last_visit": patient["lastVisit"],
            "adherence_rate": patient["adherenceRate"],
            "alerts": patient["alerts"]
        }).execute()

    # Seed Contacts
    print("Seeding contacts...")
    for contact in data.MOCK_CONTACTS:
        res = supabase.table("contacts").select("*").eq("id", contact["id"]).execute()
        if not res.data:
            supabase.table("contacts").insert({
                "id": contact["id"],
                "name": contact["name"],
                "specialty": contact["specialty"],
                "avatar": contact["avatar"],
                "status": contact["status"],
                "last_message": contact["lastMessage"],
                "last_message_time": contact["lastMessageTime"],
                "unread_count": contact["unreadCount"]
            }).execute()

    # Seed Messages
    print("Seeding messages...")
    for contact_id, messages in data.MOCK_MESSAGES.items():
        for msg in messages:
            res = supabase.table("messages").select("*").eq("id", msg["id"]).execute()
            if not res.data:
                supabase.table("messages").insert({
                    "id": msg["id"],
                    "contact_id": contact_id,
                    "sender_id": msg["senderId"],
                    "text": msg["text"],
                    "timestamp": msg["timestamp"],
                    "is_me": msg["isMe"]
                }).execute()

    # Seed Anonymization Logs
    print("Seeding anonymization logs...")
    for log in data.MOCK_ANONYMIZATION:
        res = supabase.table("anonymization_logs").select("*").eq("id", log["id"]).execute()
        if not res.data:
            supabase.table("anonymization_logs").insert({
                "id": log["id"],
                "original": log["original"],
                "anonymized": log["anonymized"]
            }).execute()

    # Seed Evidence (Documents)
    print("Seeding evidence...")
    evidence = data.MOCK_EVIDENCE
    # Check if evidence exists (using ID in metadata or just assuming one for now)
    # The mock evidence has an ID 'ev-101'.
    # documents table has 'id' as bigint (auto increment).
    # We can store the mock ID in metadata or just insert it.
    # Let's check if a document with this title exists in metadata.
    
    # Note: querying jsonb in supabase-py might be tricky with simple filters, 
    # but let's try to just insert if table is empty or just append.
    # Actually, let's just insert it once.
    
    res = supabase.table("documents").select("*").limit(1).execute()
    if not res.data:
        supabase.table("documents").insert({
            "content": evidence["abstract"],
            "metadata": evidence
        }).execute()

    print("Seeding complete.")

if __name__ == "__main__":
    asyncio.run(seed_data())
