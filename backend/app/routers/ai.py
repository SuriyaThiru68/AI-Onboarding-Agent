from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import google.generativeai as genai
import os

router = APIRouter()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)

class ChatRequest(BaseModel):
    message: str
    context: str = ""

@router.post("/chat")
async def chat_with_ai(request: ChatRequest):
    if not GEMINI_API_KEY:
        return {"response": "Gemini API Key not set. This is a mock response from the AI bot. Please set GEMINI_API_KEY in .env."}
    
    try:
        model = genai.GenerativeModel("gemini-2.0-flash")
        prompt = f"Context: {request.context}\nUser: {request.message}\nAI:"
        response = model.generate_content(prompt)
        return {"response": response.text}
    except Exception as e:
        return {"response": f"Error communicating with AI: {str(e)}"}

@router.post("/generate-plan")
async def generate_onboarding_plan(distributor_details: dict):
    if not GEMINI_API_KEY:
        return {
            "plan": [
                {"day": 1, "task": "Complete KYC", "details": "Upload Aadhaar and PAN"},
                {"day": 2, "task": "Sign Contract", "details": "Review and sign the agreement"},
                {"day": 3, "task": "Product Training", "details": "Watch video modules"},
                {"day": 4, "task": "First Order", "details": "Place initial stock order"}
            ]
        }
    
    # Logic to generate plan using Gemini
    return {"plan": "AI Generated Plan Placeholder"}
