from fastapi import APIRouter
from pydantic import BaseModel
from fpdf import FPDF
from fastapi.responses import FileResponse
import os

router = APIRouter()

@router.get("/generate-certificate")
async def generate_certificate(name: str = "Distributor Name"):
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", size=15)
    pdf.cell(200, 10, txt="Certificate of Completion", ln=1, align="C")
    pdf.cell(200, 10, txt=f"This certifies that {name}", ln=2, align="C")
    pdf.cell(200, 10, txt="Has successfully completed the Distributor Onboarding", ln=3, align="C")
    
    file_path = "certificate.pdf"
    pdf.output(file_path)
    
    return FileResponse(file_path, media_type='application/pdf', filename="certificate.pdf")
