from fastapi import APIRouter

router = APIRouter(
    prefix="/api/documents",
    tags=["Documents"]
)


@router.get("")
def get_documents():

    return {
        "documents": [
            {
                "name": "Transfer Document",
                "required": True,
                "uploaded": False
            },
            {
                "name": "Insurance Certificate",
                "required": True,
                "uploaded": True
            },
            {
                "name": "Vehicle Registration Certificate (RC)",
                "required": True,
                "uploaded": True
            }
        ]
    }