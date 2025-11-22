from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.flash import FlashResearchService

router = APIRouter()

class FlashRequest(BaseModel):
    query: str

@router.post("/flash/research")
async def flash_research(request: FlashRequest):
    service = FlashResearchService()
    try:
        result = await service.execute(request.query)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
