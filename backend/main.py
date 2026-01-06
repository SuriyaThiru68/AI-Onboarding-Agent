from fastapi import FastAPI
from dotenv import load_dotenv
import os
from pathlib import Path

env_path = Path(__file__).parent / '.env'

load_dotenv(dotenv_path=env_path)
print(f"DEBUG: Loading env from {env_path}")
print(f"DEBUG: GEMINI_API_KEY is {'set' if os.getenv('GEMINI_API_KEY') else 'NOT SET'}")
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.database import users_collection
from app.auth import get_password_hash

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Seed test users
    existing_vendor = await users_collection.find_one({"username": "admin_vendor"})
    if not existing_vendor:
        await users_collection.insert_one({
            "username": "admin_vendor",
            "email": "admin@vendor.com",
            "hashed_password": get_password_hash("password"),
            "role": "vendor",
            "region": "Mumbai",
            "full_name": "Admin Vendor",
            "kyc_status": "verified",
            "contract_signed": True
        })
        print("Seeded: admin_vendor")
    else:
        await users_collection.update_one(
            {"username": "admin_vendor"},
            {"$set": {"hashed_password": get_password_hash("password")}}
        )
        print("Updated password: admin_vendor")

    existing_dist = await users_collection.find_one({"username": "raj_distributor"})
    if not existing_dist:
        await users_collection.insert_one({
            "username": "raj_distributor",
            "email": "raj@example.com",
            "hashed_password": get_password_hash("password"),
            "role": "distributor",
            "region": "Delhi",
            "full_name": "Raj Kumar",
            "kyc_status": "pending",
            "contract_signed": False
        })
        print("Seeded: raj_distributor")
    else:
        await users_collection.update_one(
            {"username": "raj_distributor"},
            {"$set": {"hashed_password": get_password_hash("password")}}
        )
        print("Updated password: raj_distributor")
    
    yield
    # Shutdown: nothing to do

app = FastAPI(title="Distributor Onboarding API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from app.routers import auth, verification, ai, vendor, distributor
app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(verification.router, prefix="/api", tags=["Verification"])
app.include_router(ai.router, prefix="/api", tags=["AI"])
app.include_router(vendor.router, prefix="/api/vendor", tags=["Vendor"])
app.include_router(distributor.router, prefix="/api/distributor", tags=["Distributor"])

@app.get("/")
def read_root():
    return {"message": "Welcome to the AI-Powered Distributor Onboarding Platform API"}
