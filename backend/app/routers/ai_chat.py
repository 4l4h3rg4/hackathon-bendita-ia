from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import os
import google.generativeai as genai

router = APIRouter()

# Configure Gemini
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if GEMINI_API_KEY and GEMINI_API_KEY != "your_gemini_key_here":
    genai.configure(api_key=GEMINI_API_KEY)

class ChatRequest(BaseModel):
    message: str
    context: str = ""

class ChatResponse(BaseModel):
    response: str
    success: bool

@router.post("/ai/chat", response_model=ChatResponse)
async def chat_with_ai(request: ChatRequest):
    """
    Endpoint para chatear con Gemini AI
    """
    try:
        if not GEMINI_API_KEY or GEMINI_API_KEY == "your_gemini_key_here":
            # Fallback to mock response if no API key
            return ChatResponse(
                response="Entiendo, Dr. Castillo. He analizado la solicitud. Aquí tiene un resumen preliminar de los datos. ¿Desea que genere un reporte detallado en PDF?",
                success=True
            )
        
        # Use Gemini Flash Latest - fast and available in free tier
        model = genai.GenerativeModel('models/gemini-flash-latest')
        
        # Create system prompt for medical context
        system_prompt = """Eres SADI, un asistente de IA especializado en apoyo clínico para profesionales de la salud en Teletón Chile.
Tu rol es ayudar a médicos y terapeutas con:
- Análisis de historias clínicas
- Búsqueda de evidencia científica
- Generación de reportes
- Recomendaciones basadas en datos

Responde de manera profesional, concisa y en español. Si te piden generar un reporte, ofrece hacerlo en PDF."""

        # Combine context if provided
        full_prompt = f"{system_prompt}\n\nContexto: {request.context}\n\nPregunta del médico: {request.message}"
        
        # Generate response with safety settings
        response = model.generate_content(
            full_prompt,
            generation_config={
                'temperature': 0.7,
                'top_p': 0.8,
                'top_k': 40,
                'max_output_tokens': 1024,
            }
        )
        
        return ChatResponse(
            response=response.text,
            success=True
        )
    
    except Exception as e:
        # If Gemini fails, return a helpful error
        return ChatResponse(
            response=f"Lo siento, Dr. Castillo. Estoy experimentando dificultades técnicas en este momento. Por favor, intente nuevamente. (Error: {str(e)})",
            success=False
        )
