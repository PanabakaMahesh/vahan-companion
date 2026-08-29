from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.applications import router as applications_router
from app.api.intent import router as intent_router
from app.api.journey import router as journey_router
from app.api.documents import router as documents_router


app = FastAPI(
    title="VAHAN Companion API",
    description="AI-powered assistant for vehicle ownership transfer and application status.",
    version="1.0.0",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://vahan-companion.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(applications_router)
app.include_router(intent_router)
app.include_router(journey_router)
app.include_router(documents_router)


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