from fastapi import APIRouter
from app import data

router = APIRouter()

from app.database import supabase

@router.get("/anonymization")
async def get_anonymization_data():
    response = supabase.table("anonymization_logs").select("*").execute()
    return response.data
