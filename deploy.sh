#!/bin/bash

# AI Unica Quick Deployment Script
# This script helps you deploy AI Unica quickly

set -e  # Exit on error

echo "🚀 AI Unica Deployment Script"
echo "=============================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if .env exists
if [ ! -f "backend/.env" ]; then
    echo -e "${YELLOW}⚠️  Warning: backend/.env not found${NC}"
    echo "Creating from .env.production template..."
    cp .env.production backend/.env
    echo -e "${RED}⚠️  IMPORTANT: Edit backend/.env with your API keys!${NC}"
    echo ""
    read -p "Press Enter after updating .env file..."
fi

# Deployment menu
echo "Choose deployment method:"
echo ""
echo "1. 🐳 Docker (Recommended - Full stack with one command)"
echo "2. 🚂 Railway (Easy cloud deployment)"
echo "3. 🎨 Render (Free tier with auto-deploy)"
echo "4. ⚡ Vercel + Railway (Frontend + Backend separately)"
echo "5. 💻 Local Development (Test before deploy)"
echo "6. 🔧 VPS/Server Setup Guide"
echo ""
read -p "Enter your choice (1-6): " choice

case $choice in
    1)
        echo ""
        echo "🐳 Docker Deployment"
        echo "===================="
        
        # Check if Docker is installed
        if ! command -v docker &> /dev/null; then
            echo -e "${RED}❌ Docker not found!${NC}"
            echo "Install Docker: https://docs.docker.com/get-docker/"
            exit 1
        fi
        
        if ! command -v docker-compose &> /dev/null; then
            echo -e "${RED}❌ Docker Compose not found!${NC}"
            echo "Install Docker Compose: https://docs.docker.com/compose/install/"
            exit 1
        fi
        
        echo -e "${GREEN}✅ Docker found${NC}"
        echo ""
        
        # Ask about Ollama
        read -p "Include Ollama for local AI? (y/n): " include_ollama
        
        echo ""
        echo "Building Docker images..."
        docker-compose build
        
        echo ""
        echo "Starting services..."
        if [ "$include_ollama" = "y" ]; then
            docker-compose --profile with-ollama up -d
            echo ""
            echo "⏳ Pulling Ollama model (this may take a few minutes)..."
            sleep 5
            docker exec -it $(docker ps -qf "name=ollama") ollama pull llama3.2:3b || echo "Run manually: docker exec -it <ollama-container> ollama pull llama3.2:3b"
        else
            docker-compose up -d
        fi
        
        echo ""
        echo -e "${GREEN}✅ Deployment complete!${NC}"
        echo ""
        echo "🌐 Access your app: http://localhost:8000"
        echo "📊 View logs: docker-compose logs -f"
        echo "🛑 Stop: docker-compose down"
        ;;
        
    2)
        echo ""
        echo "🚂 Railway Deployment"
        echo "====================="
        
        # Check if Railway CLI is installed
        if ! command -v railway &> /dev/null; then
            echo -e "${YELLOW}⚠️  Railway CLI not found${NC}"
            echo "Install: npm install -g @railway/cli"
            echo "Or: brew install railway"
            exit 1
        fi
        
        echo "1. Make sure you're logged in: railway login"
        echo "2. Push your code to GitHub"
        echo "3. Connect Railway to your GitHub repo"
        echo ""
        read -p "Ready to continue? (y/n): " ready
        
        if [ "$ready" = "y" ]; then
            cd backend
            railway init
            railway up
            
            echo ""
            echo -e "${GREEN}✅ Backend deployed!${NC}"
            echo ""
            echo "📝 Next steps:"
            echo "1. Go to Railway dashboard"
            echo "2. Add environment variables (OPENAI_API_KEY, SECRET_KEY)"
            echo "3. Get your app URL from Settings > Domains"
        fi
        ;;
        
    3)
        echo ""
        echo "🎨 Render Deployment"
        echo "===================="
        echo ""
        echo "📝 Steps:"
        echo "1. Push your code to GitHub"
        echo "2. Go to https://render.com"
        echo "3. Click 'New +' > 'Blueprint'"
        echo "4. Connect your GitHub repository"
        echo "5. Render will auto-detect render.yaml"
        echo "6. Add OPENAI_API_KEY in environment variables"
        echo "7. Deploy!"
        echo ""
        echo "Or use render.yaml for manual setup."
        ;;
        
    4)
        echo ""
        echo "⚡ Vercel + Railway"
        echo "==================="
        
        # Check Vercel CLI
        if ! command -v vercel &> /dev/null; then
            echo -e "${YELLOW}⚠️  Vercel CLI not found${NC}"
            echo "Install: npm install -g vercel"
            exit 1
        fi
        
        echo "Step 1: Deploy Backend to Railway"
        echo "Step 2: Get backend URL"
        echo "Step 3: Deploy Frontend to Vercel"
        echo ""
        read -p "Do you have your Railway backend URL? (y/n): " has_backend
        
        if [ "$has_backend" = "y" ]; then
            read -p "Enter your backend URL: " backend_url
            
            cd frontend
            
            # Create .env.production
            echo "VITE_API_URL=$backend_url" > .env.production
            
            echo ""
            echo "Deploying to Vercel..."
            vercel --prod
            
            echo ""
            echo -e "${GREEN}✅ Frontend deployed!${NC}"
        else
            echo "Deploy backend first, then run this script again."
        fi
        ;;
        
    5)
        echo ""
        echo "💻 Local Development"
        echo "===================="
        echo ""
        echo "Starting local development environment..."
        echo ""
        
        # Check Python
        if ! command -v python3 &> /dev/null; then
            echo -e "${RED}❌ Python 3 not found!${NC}"
            exit 1
        fi
        
        # Check Node
        if ! command -v node &> /dev/null; then
            echo -e "${RED}❌ Node.js not found!${NC}"
            exit 1
        fi
        
        # Backend
        echo "Setting up backend..."
        cd backend
        
        if [ ! -d "venv" ]; then
            python3 -m venv venv
        fi
        
        source venv/bin/activate
        pip install -r requirements.txt
        
        echo "Starting backend on http://localhost:8000..."
        python main.py &
        BACKEND_PID=$!
        
        cd ..
        
        # Frontend
        echo "Setting up frontend..."
        cd frontend
        
        if [ ! -d "node_modules" ]; then
            npm install
        fi
        
        echo "Starting frontend on http://localhost:3000..."
        npm run dev &
        FRONTEND_PID=$!
        
        echo ""
        echo -e "${GREEN}✅ Development servers running!${NC}"
        echo ""
        echo "🌐 Frontend: http://localhost:3000"
        echo "🔌 Backend: http://localhost:8000"
        echo "📚 API Docs: http://localhost:8000/docs"
        echo ""
        echo "Press Ctrl+C to stop all servers"
        
        # Wait for Ctrl+C
        trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT
        wait
        ;;
        
    6)
        echo ""
        echo "🔧 VPS/Server Setup"
        echo "==================="
        echo ""
        echo "📖 Full guide available in DEPLOYMENT.md"
        echo ""
        echo "Quick overview:"
        echo "1. Create VPS (DigitalOcean, AWS, etc.)"
        echo "2. SSH into server"
        echo "3. Install Docker: curl -fsSL https://get.docker.com | sh"
        echo "4. Clone repository"
        echo "5. Configure .env"
        echo "6. Run: docker-compose up -d"
        echo "7. Setup Nginx reverse proxy (optional)"
        echo "8. Setup SSL with certbot (optional)"
        echo ""
        echo "See DEPLOYMENT.md for detailed instructions."
        ;;
        
    *)
        echo -e "${RED}❌ Invalid choice${NC}"
        exit 1
        ;;
esac

echo ""
echo "📚 Full documentation: DEPLOYMENT.md"
echo "❓ Need help? Check README.md or QUICKSTART.md"
echo ""
echo -e "${GREEN}Happy coding! 🚀${NC}"
