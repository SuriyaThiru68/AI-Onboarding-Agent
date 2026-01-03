from pydantic import BaseModel, Field, EmailStr
from typing import Optional, List, Literal
from datetime import datetime
from bson import ObjectId

class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid objectid")
        return ObjectId(v)

    @classmethod
    def __modify_schema__(cls, field_schema):
        field_schema.update(type="string")

class UserModel(BaseModel):
    id: Optional[str] = Field(None, alias="_id")
    username: str
    email: EmailStr
    hashed_password: str
    role: Literal["vendor", "distributor"]
    region: Optional[str] = None
    full_name: Optional[str] = None
    kyc_status: Literal["pending", "verified", "rejected"] = "pending"
    contract_signed: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "username": "raj_distributor",
                "email": "raj@example.com",
                "role": "distributor",
                "region": "Mumbai"
            }
        }

class InviteModel(BaseModel):
    id: Optional[str] = Field(None, alias="_id")
    email: EmailStr
    role: str
    region: str
    token: str
    used: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)

class TaskModel(BaseModel):
    id: Optional[str] = Field(None, alias="_id")
    title: str
    description: str
    assigned_to: str # user_id
    status: Literal["pending", "completed"] = "pending"
    due_date: Optional[datetime] = None

class ContractModel(BaseModel):
    id: Optional[str] = Field(None, alias="_id")
    user_id: str
    content_bucket_url: str # or text content
    signed_at: Optional[datetime] = None
    signature_id: Optional[str] = None
