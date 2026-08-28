"""
Workflow Engine
Calculates the workflow response.
"""

from app.workflow.rules import get_next_action


class WorkflowEngine:

    @staticmethod
    def process(status: str):

        action = get_next_action(status)

        return {
            "status": status,
            "next_action": action
        }