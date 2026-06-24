# AI Unica - Deployment Guide

Complete guide to deploy AI Unica to production on various platforms.

---

## 📋 Table of Contents

1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [Docker Deployment](#docker-deployment-recommended)
3. [Render Deployment](#render-deployment-easiest)
4. [Railway Deployment](#railway-deployment-simple)
5. [Vercel + Railway](#vercel--railway-separate-deployments)
6. [VPS Deployment](#vps-deployment-digital-ocean-aws-etc)
7. [Post-Deployment](#post-deployment)

---

## Pre-Deployment Checklist

Before deploying, ensure you have:

- [ ] **OpenAI API Key** (or Ollama for local AI)
- [ ] **Generate SECRET_KEY** for JWT authentication
- [ ] **Update CORS_ORIGINS** with your production domain
- [ ] **Test locally** with production build
- [ ] **Database choice** (SQLite for simple, PostgreSQL for scale)
- [ ] **Environment variables** configured

### Generate SECRET_KEY

```bash
# Generate a secure random secret key
python -c "import secrets; print(secrets.token_urlsafe(32))"
```

---

## Docker Deployment (Recommended)

Docker provides the easiest way to deploy AI Unica with all dependencies.

### Step 1: Install Docker

```bash
# macOS
brew install docker docker-compose

# Ubuntu/Debian
sudo apt-get update
sudo apt-get install docker.io docker-compose

# Verify installation
docker --version
docker-compose --version
```

### Step 2: Configure Environment

```bash
# Create .env file
cp .env.production .env

# Edit .env and update:
nano .env
```

Update these values:
```env
OPENAI_API_KEY=sk-your-actual-key-here
SECRET_KEY=your-generated-secret-key-here
CORS_ORIGINS=["https://your-domain.com"]
```

### Step 3: Build and Run

```bash
# Build the Docker image
docker-compose build

# Start the application
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the application
docker-compose down
```

### Step 4: Access Application

Open your browser:
```
http://localhost:8000
```

### With Ollama (Local AI)

```bash
# Start with Ollama
docker-compose --profile with-ollama up -d

# Pull model inside Ollama container
docker exec -it codepilot-ai-ollama-1 ollama pull llama3.2:3b
```

### Docker Commands

```bash
# Rebuild after code changes
docker-compose build --no-cache

# View running containers
docker ps

# Access container shell
docker exec -it codepilot-ai-ai-unica-1 bash

# View logs
docker-compose logs -f ai-unica

# Remove all containers and volumes
docker-compose down -v
```

---

## Render Deployment (Easiest)

Render offers free hosting with automatic HTTPS and continuous deployment.

### Step 1: Create Render Account

1. Go to [render.com](https://render.com)
2. Sign up (free tier available)
3. Connect your GitHub account

### Step 2: Push Code to GitHub

```bash
cd codepilot-ai

# Initialize git (if not already)
git init
git add .
git commit -m "Initial commit"

# Create GitHub repo and push
git remote add origin https://github.com/yourusername/codepilot-ai.git
git push -u origin main
```

### Step 3: Create Web Service

1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Configure:

**Basic Settings:**
- **Name**: `ai-unica`
- **Region**: Choose closest to users
- **Branch**: `main`
- **Root Directory**: `backend`
- **Runtime**: `Python 3`

**Build Settings:**
- **Build Command**: 
  ```bash
  pip install -r requirements-deploy.txt
  ```
- **Start Command**:
  ```bash
  uvicorn main:app --host 0.0.0.0 --port $PORT
  ```

**Environment Variables:**
Click **"Add Environment Variable"** for each:
```
OPENAI_API_KEY=sk-your-key-here
SECRET_KEY=your-secret-key-here
DATABASE_URL=sqlite:///./codepilot_ai.db
ENVIRONMENT=production
USE_OLLAMA=false
CORS_ORIGINS=["https://ai-unica.onrender.com"]
```

4. Click **"Create Web Service"**
5. Wait 5-10 minutes for deployment

### Step 4: Access Your App

Your app will be available at:
```
https://ai-unica.onrender.com
```

### Render + Frontend (Separate Deploy)

1. Create another Web Service for frontend
2. Configure:
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
3. Update backend CORS to include frontend URL

---

## Railway Deployment (Simple)

Railway provides easy deployment with PostgreSQL database support.

### Step 1: Create Railway Account

1. Go to [railway.app](https://railway.app)
2. Sign in with GitHub
3. Install Railway CLI:

```bash
# macOS
brew install railway

# Others
npm install -g @railway/cli

# Login
railway login
```

### Step 2: Deploy Backend

```bash
cd codepilot-ai/backend

# Initialize Railway project
railway init

# Add PostgreSQL (optional, or use SQLite)
railway add --plugin postgresql

# Set environment variables
railway variables set OPENAI_API_KEY=sk-your-key-here
railway variables set SECRET_KEY=your-secret-key-here
railway variables set USE_OLLAMA=false
railway variables set ENVIRONMENT=production

# Deploy
railway up
```

### Step 3: Deploy Frontend

```bash
cd ../frontend

# Initialize separate Railway project
railway init

# Deploy
railway up
```

### Step 4: Configure

1. Go to Railway dashboard
2. Click on your backend service
3. Add environment variables in UI
4. Update CORS_ORIGINS with frontend URL
5. Get public URL from "Settings" → "Domains"

---

## Vercel + Railway (Separate Deployments)

Best for high performance: Vercel for frontend, Railway for backend.

### Step 1: Deploy Backend on Railway

Follow [Railway Deployment](#railway-deployment-simple) above.

Get your backend URL: `https://your-app.railway.app`

### Step 2: Deploy Frontend on Vercel

```bash
# Install Vercel CLI
npm install -g vercel

cd codepilot-ai/frontend

# Deploy
vercel

# Follow prompts:
# - Project name: ai-unica
# - Framework: Vite
# - Build command: npm run build
# - Output directory: dist
```

### Step 3: Configure Frontend Environment

Create `frontend/.env.production`:
```env
VITE_API_URL=https://your-app.railway.app
```

Update API calls in frontend code to use:
```typescript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
```

### Step 4: Update Backend CORS

In Railway dashboard, add environment variable:
```
CORS_ORIGINS=["https://ai-unica.vercel.app"]
```

### Step 5: Production Deploy

```bash
# Deploy to production
vercel --prod
```

Your app: `https://ai-unica.vercel.app`

---

## VPS Deployment (Digital Ocean, AWS, etc.)

For full control, deploy to a VPS.

### Step 1: Create VPS

Create a VPS with:
- **OS**: Ubuntu 22.04 LTS
- **RAM**: 2GB minimum
- **Storage**: 20GB minimum

### Step 2: Initial Server Setup

```bash
# SSH into server
ssh root@your-server-ip

# Update system
apt update && apt upgrade -y

# Install dependencies
apt install -y python3 python3-pip nodejs npm nginx certbot python3-certbot-nginx git

# Create non-root user
adduser aiunica
usermod -aG sudo aiunica
su - aiunica
```

### Step 3: Clone and Setup Application

```bash
# Clone repository
git clone https://github.com/yourusername/codepilot-ai.git
cd codepilot-ai

# Setup backend
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements-deploy.txt

# Create .env
nano .env
# Add your environment variables

# Test backend
python main.py  # Should start on port 8000
# Press Ctrl+C to stop

# Setup frontend
cd ../frontend
npm install
npm run build
```

### Step 4: Setup Systemd Service

```bash
# Create service file
sudo nano /etc/systemd/system/aiunica.service
```

Add:
```ini
[Unit]
Description=AI Unica Backend
After=network.target

[Service]
Type=simple
User=aiunica
WorkingDirectory=/home/aiunica/codepilot-ai/backend
Environment="PATH=/home/aiunica/codepilot-ai/backend/venv/bin"
ExecStart=/home/aiunica/codepilot-ai/backend/venv/bin/uvicorn main:app --host 0.0.0.0 --port 8000
Restart=always

[Install]
WantedBy=multi-user.target
```

```bash
# Enable and start service
sudo systemctl enable aiunica
sudo systemctl start aiunica
sudo systemctl status aiunica
```

### Step 5: Setup Nginx Reverse Proxy

```bash
# Create Nginx config
sudo nano /etc/nginx/sites-available/aiunica
```

Add:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    # Frontend
    location / {
        root /home/aiunica/codepilot-ai/frontend/dist;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:8000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Health check
    location /health {
        proxy_pass http://localhost:8000;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/aiunica /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Step 6: Setup HTTPS with Let's Encrypt

```bash
# Get SSL certificate
sudo certbot --nginx -d your-domain.com

# Auto-renewal is configured automatically
# Test renewal
sudo certbot renew --dry-run
```

### Step 7: Access Application

Your app is now live at:
```
https://your-domain.com
```

---

## Post-Deployment

### 1. Test Everything

- [ ] Homepage loads
- [ ] AI chat works
- [ ] Code editor functions
- [ ] File upload works
- [ ] Terminal commands work
- [ ] Voice input (if enabled)

### 2. Monitor Application

```bash
# Docker logs
docker-compose logs -f

# Systemd logs (VPS)
sudo journalctl -u aiunica -f

# Check health endpoint
curl https://your-domain.com/health
```

### 3. Setup Monitoring (Optional)

Use services like:
- **UptimeRobot** - Free uptime monitoring
- **Sentry** - Error tracking
- **LogRocket** - Session replay

### 4. Backup Database

```bash
# SQLite backup
cp codepilot_ai.db codepilot_ai_backup.db

# Automated backup script
crontab -e
# Add: 0 0 * * * cp /path/to/codepilot_ai.db /path/to/backups/codepilot_ai_$(date +\%Y\%m\%d).db
```

### 5. Update Application

```bash
# Docker
git pull
docker-compose build
docker-compose up -d

# VPS
git pull
cd backend
source venv/bin/activate
pip install -r requirements-deploy.txt
sudo systemctl restart aiunica

cd ../frontend
npm install
npm run build
```

---

## Troubleshooting

### Application won't start

```bash
# Check logs
docker-compose logs

# Verify environment variables
docker-compose config

# Restart services
docker-compose restart
```

### Database errors

```bash
# Reset database (WARNING: deletes all data)
rm codepilot_ai.db
docker-compose restart
```

### Port already in use

```bash
# Find process using port
lsof -ti:8000

# Kill process
kill -9 $(lsof -ti:8000)
```

### CORS errors

Update `CORS_ORIGINS` in `.env`:
```env
CORS_ORIGINS=["https://your-frontend-domain.com","https://your-backend-domain.com"]
```

### SSL certificate issues

```bash
# Renew certificate
sudo certbot renew

# Restart Nginx
sudo systemctl restart nginx
```

---

## Security Checklist

- [ ] Change `SECRET_KEY` from default
- [ ] Use strong `OPENAI_API_KEY`
- [ ] Enable HTTPS (SSL/TLS)
- [ ] Configure firewall (UFW)
- [ ] Regular security updates
- [ ] Rate limiting configured
- [ ] Database backups automated
- [ ] Monitor error logs
- [ ] Use environment variables (never commit secrets)

---

## Cost Estimates

### Free Tier Options

**Render:**
- ✅ Free tier available
- ⚠️ Sleeps after inactivity
- 💾 500MB RAM, 500MB storage

**Railway:**
- ✅ $5 free credit/month
- 💾 1GB RAM, 1GB storage

**Vercel (Frontend):**
- ✅ Free for personal projects
- 🚀 Unlimited bandwidth

### Paid Options

**Docker + VPS:**
- 💰 $5-10/month (DigitalOcean, Linode)
- 💾 1-2GB RAM recommended
- 🎯 Full control

**AWS/GCP:**
- 💰 $10-30/month (depending on usage)
- 📈 Auto-scaling
- 🏢 Enterprise-grade

---

## Next Steps

After successful deployment:

1. ✅ Test all features
2. 📊 Setup monitoring
3. 🔐 Configure backups
4. 📈 Add analytics (optional)
5. 🚀 Share with users!

---

## Support

Need help deploying?

- 📖 Check [README.md](README.md) for project overview
- 🐛 Report issues on GitHub
- 💬 Join our Discord community
- 📧 Email: support@aicodepilot.com

---

**Happy Deploying! 🚀**

AI Unica - Professional AI Development Platform

