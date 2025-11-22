import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if GEMINI_API_KEY and GEMINI_API_KEY != "your_gemini_key_here":
    genai.configure(api_key=GEMINI_API_KEY)
    
    print("Modelos disponibles con tu API key:")
    print("-" * 50)
    for model in genai.list_models():
        if 'generateContent' in model.supported_generation_methods:
            print(f"✓ {model.name}")
            print(f"  Display name: {model.display_name}")
            print(f"  Description: {model.description}")
            print()
else:
    print("No hay API key configurada")
