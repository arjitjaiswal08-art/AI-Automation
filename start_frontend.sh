#!/bin/bash

# CodePilot AI - Frontend Startup Script

echo "🎨 Starting CodePilot AI Frontend..."
echo ""

# Navigate to frontend directory
cd "$(dirname "$0")/frontend"

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "❌ Dependencies not installed!"
    echo "Installing dependencies..."
    npm install
    echo "✅ Dependencies installed"
fi

# Start the frontend
echo ""
echo "Starting frontend server on http://localhost:3000"
echo "Press Ctrl+C to stop"
echo ""

npm run dev
