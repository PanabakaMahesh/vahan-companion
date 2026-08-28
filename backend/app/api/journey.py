from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(
    prefix="/api/journey",
    tags=["Journey"]
)


class JourneyRequest(BaseModel):
    intent: str
    role: str
    vehicle_type: str


@router.post("")
def create_journey(request: JourneyRequest):

    return {
        "journey_id": "DEMO-J-001",
        "current_step": "SELLER_INITIATION",
        "next_action": "ASK_SELLER",
        "progress": 20,
        "steps": [
            "SELLER_INITIATION",
            "BUYER_CONFIRMATION",
            "DOCUMENTS",
            "PAYMENT",
            "UNDER_VERIFICATION",
            "COMPLETED"
        ],
        "role": request.role,
        "vehicle_type": request.vehicle_type
    }