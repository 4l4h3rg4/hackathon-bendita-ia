from fastapi import APIRouter
from app import data

router = APIRouter()

from app.database import supabase

@router.get("/evidence")
async def get_evidence():
    response = supabase.table("documents").select("*").limit(1).execute()
    if response.data:
        # Return the metadata of the first document which contains the evidence structure
        return response.data[0]["metadata"]
    return {}
