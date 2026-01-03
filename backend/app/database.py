import os
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel

MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017")
DB_NAME = "distributor_onboarding"

client = AsyncIOMotorClient(MONGO_URL)
database = client[DB_NAME]

users_collection = database.get_collection("users")
invites_collection = database.get_collection("invites")
contracts_collection = database.get_collection("contracts")
tasks_collection = database.get_collection("tasks")
