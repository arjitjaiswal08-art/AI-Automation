"""
AI Unica - Main FastAPI Application
"""
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import logging

from app.api import auth, chat, projects, code
from app.core.config import settings
from app.db.session import engine

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application startup and shutdown events"""
    # Startup
    logger.info("Starting AI Unica...")
    logger.info(f"Environment: {settings.ENVIRONMENT}")
    
    # Create database tables
    from app.db.base import Base, import_models
    import_models()  # Import models after Base is created
    Base.metadata.create_all(bind=engine)
    logger.info("Database tables created")
    
    yield
    
    # Shutdown
    logger.info("Shutting down AI Unica...")


app = FastAPI(
    title="AI Unica",
    description="AI-powered coding assistant API",
    version="0.1.0",
    lifespan=lifespan
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(chat.router, prefix="/api/chat", tags=["Chat"])
app.include_router(projects.router, prefix="/api/projects", tags=["Projects"])
app.include_router(code.router, prefix="/api/code", tags=["Code"])


@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "name": "AI Unica",
        "version": "0.1.0",
        "status": "running",
        "docs": "/docs"
    }


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )
