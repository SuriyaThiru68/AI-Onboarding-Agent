from fastapi import APIRouter, Depends
import random
from pydantic import BaseModel

router = APIRouter()

class AadhaarRequest(BaseModel):
    aadhaar_number: str

class PanRequest(BaseModel):
    pan_number: str

@router.post("/aadhaar/verify")
async def verify_aadhaar(request: AadhaarRequest):
    # Mock Verification
    if len(request.aadhaar_number) == 12 and request.aadhaar_number.isdigit():
        return {"verified": True, "message": "Aadhaar Verified Successfully (MOCK)"}
    return {"verified": False, "message": "Invalid Aadhaar Number"}

@router.post("/pan/verify")
async def verify_pan(request: PanRequest):
    # Mock Verification
    if len(request.pan_number) == 10 and request.pan_number.isalnum():
        return {"verified": True, "message": "PAN Verified Successfully (MOCK)"}
    return {"verified": False, "message": "Invalid PAN Number"}

@router.post("/esign/init")
async def init_esign(user_id: str):
    # Mock eSign URL generation
    return {
        "esign_url": f"https://mock-esign-provider.com/sign?user={user_id}&doc=distributor_agreement",
        "status": "pending"
    }
