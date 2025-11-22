from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter()

class LoginRequest(BaseModel):
    username: str
    password: str

@router.post("/login")
async def login(request: LoginRequest):
    if request.username and request.password:
        return {"token": "mock-token-123", "user": {"name": "Dr. Castillo"}}
    raise HTTPException(status_code=401, detail="Invalid credentials")
