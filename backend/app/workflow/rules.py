"""
Workflow Rules
Business rules for ownership transfer.
"""

from app.workflow import states


def get_next_action(status: str):
    """
    Returns the next action for a given application status.
    """

    rules = {

        states.START:
            "ASK_SELLER",

        states.SELLER_INITIATION:
            "WAIT_FOR_SELLER",

        states.BUYER_CONFIRMATION:
            "CONFIRM_PURCHASE",

        states.DOCUMENTS:
            "UPLOAD_DOCUMENTS",

        states.PAYMENT:
            "MAKE_PAYMENT",

        states.UNDER_VERIFICATION:
            "WAIT",

        states.DOCUMENT_REQUIRED:
            "UPLOAD_DOCUMENT",

        states.DELAYED:
            "START_RESOLUTION",

        states.COMPLETED:
            "NO_ACTION",

    }

    return rules.get(status, "UNKNOWN")