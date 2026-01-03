from fastapi import APIRouter, HTTPException, Depends, status
from pydantic import BaseModel
from app.database import users_collection
from app.auth import get_password_hash, create_access_token, verify_password
from app.models import UserModel
from datetime import timedelta

router = APIRouter()

class LoginRequest(BaseModel):
    username: str
    password: str

class RegisterRequest(BaseModel):
    username: str
    email: str
    password: str
    full_name: str
    role: str # vendor or distributor
    region: str = None
    # For MVP, allowing direct registration, usually invite only for distributor

@router.post("/register")
async def register(request: RegisterRequest):
    existing_user = await users_collection.find_one({"username": request.username})
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already registered")

    hashed_password = get_password_hash(request.password)
    user_data = request.dict()
    user_data["hashed_password"] = hashed_password
    del user_data["password"]

    result = await users_collection.insert_one(user_data)
    return {"message": "User created successfully", "id": str(result.inserted_id)}

@router.post("/token")
async def login(request: LoginRequest):
    user = await users_collection.find_one({"username": request.username})
    if not user or not verify_password(request.password, user["hashed_password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    access_token = create_access_token(data={"sub": user["username"], "role": user["role"]})
    return {"access_token": access_token, "token_type": "bearer", "role": user["role"]}
