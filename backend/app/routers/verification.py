from fastapi import APIRouter, UploadFile, File, Form, HTTPException
import pytesseract
from PIL import Image
import re
from app.database import users_collection
from app.models import UserModel
import io

router = APIRouter()

# If tesseract is not in your PATH, uncomment and set the path below:
# pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

def extract_text(file_content):
    img = Image.open(io.BytesIO(file_content))
    return pytesseract.image_to_string(img)

@router.post("/kyc")
async def kyc_verify(
    username: str = Form(...),
    aadhaar: UploadFile = File(...), 
    pan: UploadFile = File(...)
):
    # 1. Get user profile from DB
    user = await users_collection.find_one({"username": username})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # 2. Extract text from images
    try:
        aadhaar_content = await aadhaar.read()
        pan_content = await pan.read()
        
        aadhaar_text = extract_text(aadhaar_content)
        pan_text = extract_text(pan_content)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error processing images: {str(e)}")

    # 3. Extract data using Regex
    # Aadhaar Number: 12 digits (often 4 4 4)
    aadhaar_no_match = re.search(r"\d{4}\s\d{4}\s\d{4}", aadhaar_text)
    if not aadhaar_no_match:
        aadhaar_no_match = re.search(r"\d{12}", aadhaar_text)
        
    # PAN Number: 5 letters, 4 digits, 1 letter
    pan_no_match = re.search(r"[A-Z]{5}[0-9]{4}[A-Z]", pan_text)

    # Simplified Name/DOB extraction (OCR can be messy)
    # Usually we look for "Name" or "DOB" keywords
    # This is a basic implementation
    name_found = user["full_name"].upper() in aadhaar_text.upper() or user["full_name"].upper() in pan_text.upper()

    # 4. Verification Logic
    verified = False
    if aadhaar_no_match and pan_no_match:
        # Check if numbers match or just that they exist (Matching with DB usually requires pre-stored data)
        # For this flow, we match the Name found in OCR with the Profile Name
        if name_found:
            verified = True

    # 5. Update Status in DB
    status = "verified" if verified else "failed"
    await users_collection.update_one(
        {"username": username},
        {"$set": {
            "kyc_status": status,
            "aadhaar_number": aadhaar_no_match.group().replace(" ", "") if aadhaar_no_match else None,
            "pan_number": pan_no_match.group() if pan_no_match else None
        }}
    )

    if verified:
        return {
            "kyc_status": "verified",
            "message": "KYC Verified Successfully",
            "aadhaar_found": aadhaar_no_match.group() if aadhaar_no_match else None,
            "pan_found": pan_no_match.group() if pan_no_match else None
        }
    else:
        return {
            "kyc_status": "failed",
            "message": "Data mismatch or could not read documents clearly. Please ensure name in profile matches your ID."
        }

# Keep original mock endpoints for compatibility if needed
@router.post("/aadhaar/verify")
async def verify_aadhaar(aadhaar_number: str):
    if len(aadhaar_number) == 12 and aadhaar_number.isdigit():
        return {"verified": True, "message": "Aadhaar Verified Successfully"}
    return {"verified": False, "message": "Invalid Aadhaar Number"}

@router.post("/pan/verify")
async def verify_pan(pan_number: str):
    if len(pan_number) == 10 and pan_number.isalnum():
        return {"verified": True, "message": "PAN Verified Successfully"}
    return {"verified": False, "message": "Invalid PAN Number"}

@router.post("/esign/init")
async def init_esign(user_id: str):
    return {
        "esign_url": f"https://mock-esign-provider.com/sign?user={user_id}&doc=distributor_agreement",
        "status": "pending"
    }
