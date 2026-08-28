import json

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.ai.intent_parser import parse_intent

router = APIRouter(
    prefix="/api/intent",
    tags=["Intent"]
)


class IntentRequest(BaseModel):
    message: str


@router.post("")
def detect_intent(request: IntentRequest):
    """
    Detects the user's intent using OpenAI.
    Returns structured JSON for the frontend.
    """

    try:
        response = parse_intent(request.message)

        # Convert JSON string returned by OpenAI into Python dictionary
        return json.loads(response)

    except json.JSONDecodeError:
        raise HTTPException(
            status_code=500,
            detail="Invalid response received from AI."
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )