import json
from pathlib import Path

from fastapi import APIRouter, HTTPException

from app.ai.explainer import explain_status
from app.workflow.engine import WorkflowEngine

router = APIRouter(
    prefix="/api/applications",
    tags=["Applications"]
)

# Path to applications.json
BASE_DIR = Path(__file__).resolve().parents[2]
DATA_FILE = BASE_DIR.parent / "data" / "applications.json"


@router.get("/{application_id}")
def get_application(application_id: str):
    """
    Get application details by ID.
    Uses the workflow engine to determine the next action
    and OpenAI to generate a user-friendly explanation.
    """

    try:
        with open(DATA_FILE, "r") as file:
            applications = json.load(file)

        application = next(
            (app for app in applications if app["id"] == application_id),
            None
        )

        if application is None:
            raise HTTPException(
                status_code=404,
                detail="Application not found"
            )

        workflow = WorkflowEngine.process(application["status"])

        explanation = explain_status(
            application["status"],
            workflow["next_action"]
        )

        return {
            "id": application["id"],
            "status": application["status"],
            "action": workflow["next_action"],
            "explanation": explanation,
            "missing_documents": application.get(
                "missing_documents",
                []
            )
        }

    except HTTPException:
        raise

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Internal Server Error: {str(e)}"
        )