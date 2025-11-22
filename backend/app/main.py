from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
from app.routers import auth, evidence, patients, anonymization, chat, intelligence, flash, ai_chat

# Load .env.local if it exists, otherwise .env
if os.path.exists(".env.local"):
    load_dotenv(".env.local")
else:
    load_dotenv()

app = FastAPI(title="SADI Backend")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(auth.router, prefix="/api", tags=["Auth"])
app.include_router(evidence.router, prefix="/api", tags=["Evidence"])
app.include_router(patients.router, prefix="/api", tags=["Patients"])
app.include_router(anonymization.router, prefix="/api", tags=["Anonymization"])
app.include_router(chat.router, prefix="/api", tags=["Chat"])
app.include_router(intelligence.router, prefix="/api", tags=["Intelligence"])
app.include_router(flash.router, prefix="/api", tags=["Flash"])
app.include_router(ai_chat.router, prefix="/api", tags=["AI Chat"])

@app.get("/")
async def root():
    return {"message": "SADI Backend is running (Modular)"}
