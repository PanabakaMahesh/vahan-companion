from fastapi import FastAPI

app = FastAPI(
    title="VAHAN Companion API",
    description="AI-powered assistant for vehicle ownership transfer and application status.",
    version="1.0.0"
)


@app.get("/")
def home():
    return {
        "message": "Welcome to VAHAN Companion API"
    }


@app.get("/health")
def health():
    return {
        "status": "ok",
        "service": "VAHAN Companion API",
        "version": "1.0.0"
    }