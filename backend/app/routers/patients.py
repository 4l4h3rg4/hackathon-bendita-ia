from fastapi import APIRouter, HTTPException
from app import data

router = APIRouter()

from app.database import supabase

@router.get("/patient/{patient_id}")
async def get_patient(patient_id: str):
    response = supabase.table("patients").select("*").eq("id", patient_id).execute()
    if response.data:
        patient = response.data[0]
        # Map DB columns to camelCase if needed, or ensure frontend handles snake_case.
        # The mock data used camelCase (lastVisit, adherenceRate).
        # The DB uses snake_case (last_visit, adherence_rate).
        # We should map it back to match the expected API response.
        return {
            "id": patient["id"],
            "name": patient["name"],
            "diagnosis": patient["diagnosis"],
            "lastVisit": patient["last_visit"],
            "adherenceRate": patient["adherence_rate"],
            "alerts": patient["alerts"]
        }
    raise HTTPException(status_code=404, detail="Patient not found")
