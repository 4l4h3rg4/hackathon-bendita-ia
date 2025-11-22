from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.workflow import run_clinical_chain

router = APIRouter()

class IntelligenceRequest(BaseModel):
    query: str

@router.post("/intelligence/process")
async def process_intelligence(request: IntelligenceRequest):
    try:
        result = await run_clinical_chain(request.query)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
