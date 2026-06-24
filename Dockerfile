# Multi-stage Docker build for AI Unica

# Stage 1: Build Frontend
FROM node:18-alpine AS frontend-builder

WORKDIR /app/frontend

# Copy frontend package files
COPY frontend/package*.json ./
RUN npm ci

# Copy frontend source
COPY frontend/ ./

# Build frontend
RUN npm run build

# Stage 2: Backend Runtime
FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy backend requirements
COPY backend/requirements-deploy.txt ./requirements.txt

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend source
COPY backend/ ./

# Copy built frontend (static files will be served by FastAPI)
COPY --from=frontend-builder /app/frontend/dist ./static

# Create necessary directories
RUN mkdir -p /app/data

# Expose port
EXPOSE 8000

# Environment variables
ENV PYTHONUNBUFFERED=1
ENV DATABASE_URL=sqlite:////app/data/codepilot_ai.db
ENV ENVIRONMENT=production

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8000/health || exit 1

# Run application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
