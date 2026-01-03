from fastapi import APIRouter

router = APIRouter()

@router.get("/stats")
async def get_stats():
    # Mock stats
    return {
        "total_distributors": 1240,
        "pending_kyc": 45,
        "contract_signed": 890,
        "completion_rate": 72
    }
