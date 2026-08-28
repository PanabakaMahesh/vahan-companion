from app.workflow.engine import WorkflowEngine

print(
    WorkflowEngine.process("DOCUMENT_REQUIRED")
)
print(
    WorkflowEngine.process("UNDER_VERIFICATION")
)