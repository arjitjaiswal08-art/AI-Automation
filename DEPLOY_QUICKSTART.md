# 🚀 Deploy AI Unica in 5 Minutes

Choose your deployment method and follow the steps.

---

## 🐳 Option 1: Docker (Easiest - Recommended)

### Prerequisites
- Docker installed ([Get Docker](https://docs.docker.com/get-docker/))
- OpenAI API key

### Steps

```bash
# 1. Navigate to project
cd codepilot-ai

# 2. Create environment file
cp .env.production backend/.env

# 3. Edit .env and add your OpenAI API key
nano backend/.env
# Change: OPENAI_API_KEY=your-key-here

# 4. Deploy with one command!
./deploy.sh
# Choose option 1 (Docker)

# 5. Access your app
open http://localhost:8000
```

**Done! Your app is running! 🎉**

---

## 🎨 Option 2: Render (Free Cloud Hosting)

### Prerequisites
- GitHub account
- Render account ([render.com](https://render.com) - free tier)
- OpenAI API key

### Steps

```bash
# 1. Push to GitHub
git init
git add .
git commit -m "Deploy AI Unica"
git remote add origin https://github.com/yourusername/codepilot-ai.git
git push -u origin main

# 2. Go to Render dashboard
# https://dashboard.render.com

# 3. Click "New +" → "Web Service"

# 4. Connect your GitHub repo

# 5. Configure:
Name: ai-unica
Root Directory: backend
Build Command: pip install -r requirements-deploy.txt
Start Command: uvicorn main:app --host 0.0.0.0 --port $PORT

# 6. Add Environment Variables (click "Add Environment Variable"):
OPENAI_API_KEY = sk-your-key-here
SECRET_KEY = [click "Generate"]
DATABASE_URL = sqlite:///./codepilot_ai.db
ENVIRONMENT = production
USE_OLLAMA = false

# 7. Click "Create Web Service"

# 8. Wait 5 minutes for deployment

# 9. Access your app at:
# https://ai-unica.onrender.com
```

**Your app is live! 🌐**

---

## 🚂 Option 3: Railway (Simple Cloud)

### Prerequisites
- Railway account ([railway.app](https://railway.app))
- OpenAI API key

### Steps

```bash
# 1. Install Railway CLI
npm install -g @railway/cli

# 2. Login
railway login

# 3. Navigate to backend
cd codepilot-ai/backend

# 4. Initialize and deploy
railway init
railway up

# 5. Add environment variables (in Railway dashboard):
OPENAI_API_KEY = sk-your-key-here
SECRET_KEY = [generate random string]
USE_OLLAMA = false
ENVIRONMENT = production

# 6. Get your URL from Railway dashboard
# Settings → Domains → Generate Domain

# 7. Access your app at:
# https://your-app.railway.app
```

**Live in minutes! ⚡**

---

## ⚡ Option 4: Vercel (Frontend) + Railway (Backend)

### For best performance, separate frontend and backend.

#### Step 1: Deploy Backend on Railway
```bash
cd codepilot-ai/backend
railway init
railway up

# Add environment variables in Railway dashboard
# Get backend URL: https://your-backend.railway.app
```

#### Step 2: Deploy Frontend on Vercel
```bash
# Install Vercel CLI
npm install -g vercel

cd codepilot-ai/frontend

# Create .env.production
echo "VITE_API_URL=https://your-backend.railway.app" > .env.production

# Deploy
vercel --prod

# Your frontend: https://ai-unica.vercel.app
```

#### Step 3: Update Backend CORS
In Railway dashboard, add:
```
CORS_ORIGINS=["https://ai-unica.vercel.app"]
```

**Production-ready split! 🎯**

---

## 💻 Option 5: VPS (DigitalOcean, AWS, etc.)

### Prerequisites
- VPS with Ubuntu 22.04
- Domain name (optional)

### Quick Setup

```bash
# 1. SSH into your server
ssh root@your-server-ip

# 2. Install Docker
curl -fsSL https://get.docker.com | sh

# 3. Clone repository
git clone https://github.com/yourusername/codepilot-ai.git
cd codepilot-ai

# 4. Setup environment
cp .env.production backend/.env
nano backend/.env  # Add your API keys

# 5. Deploy
docker-compose up -d

# 6. Access your app
# http://your-server-ip:8000
```

### Add Domain + HTTPS (Optional)

```bash
# Install Nginx and Certbot
apt install -y nginx certbot python3-certbot-nginx

# Configure Nginx (see DEPLOYMENT.md)
nano /etc/nginx/sites-available/aiunica

# Get SSL certificate
certbot --nginx -d your-domain.com

# Access: https://your-domain.com
```

**Full control! 🔧**

---

## 🔐 Security Checklist

Before deploying, make sure:

- [ ] ✅ Changed `SECRET_KEY` from default
- [ ] ✅ Added real `OPENAI_API_KEY`
- [ ] ✅ Updated `CORS_ORIGINS` with your domain
- [ ] ✅ Set `ENVIRONMENT=production`
- [ ] ✅ Never commit `.env` file to git

### Generate SECRET_KEY

```bash
python3 -c "import secrets; print(secrets.token_urlsafe(32))"
```

---

## 🧪 Test Your Deployment

After deploying, verify everything works:

### 1. Check Health
```bash
curl https://your-domain.com/health
# Should return: {"status":"healthy"}
```

### 2. Test API Docs
```
https://your-domain.com/docs
```

### 3. Test AI Chat
1. Open your app URL
2. Click AI Chat
3. Send a message
4. Verify AI responds

### 4. Test Code Editor
1. Click Code Editor
2. Open a file
3. Edit and save
4. Verify changes persist

---

## 📊 Monitoring

### Docker Logs
```bash
docker-compose logs -f
```

### Application Status
```bash
docker-compose ps
```

### Restart Services
```bash
docker-compose restart
```

### Update Application
```bash
git pull
docker-compose build
docker-compose up -d
```

---

## 💰 Cost Comparison

| Platform | Free Tier | Paid | Best For |
|----------|-----------|------|----------|
| **Docker (Local)** | ✅ Free | - | Development |
| **Render** | ✅ 750 hrs/month | $7/month | Free hosting |
| **Railway** | ✅ $5 credit/month | $5/month | Simple deploy |
| **Vercel** | ✅ Unlimited | $20/month | Frontend only |
| **VPS (DO)** | ❌ | $5/month | Full control |

---

## 🐛 Common Issues

### Port Already in Use
```bash
# Kill process on port 8000
lsof -ti:8000 | xargs kill -9
```

### Database Locked
```bash
# Remove database and restart
rm backend/codepilot_ai.db
docker-compose restart
```

### CORS Errors
Update `CORS_ORIGINS` in `.env`:
```env
CORS_ORIGINS=["https://your-domain.com"]
```

### AI Not Responding
Check your API key:
```bash
# View logs
docker-compose logs ai-unica

# Verify API key in .env
cat backend/.env | grep OPENAI_API_KEY
```

---

## 🎯 Quick Commands

### Docker
```bash
# Start
docker-compose up -d

# Stop
docker-compose down

# Logs
docker-compose logs -f

# Rebuild
docker-compose build --no-cache

# Clean restart
docker-compose down -v && docker-compose up -d
```

### Railway
```bash
# Deploy
railway up

# Logs
railway logs

# Open dashboard
railway open
```

### Vercel
```bash
# Deploy
vercel --prod

# Logs
vercel logs

# Open dashboard
vercel open
```

---

## 📚 Need More Help?

- **Full Guide**: [DEPLOYMENT.md](DEPLOYMENT.md)
- **Project Setup**: [README.md](README.md)
- **Quick Start**: [QUICKSTART.md](QUICKSTART.md)
- **Features**: [FEATURES.md](FEATURES.md)

---

## ✅ Deployment Checklist

- [ ] Chose deployment platform
- [ ] Created `.env` with API keys
- [ ] Generated SECRET_KEY
- [ ] Updated CORS_ORIGINS
- [ ] Deployed application
- [ ] Tested health endpoint
- [ ] Tested AI chat
- [ ] Tested code editor
- [ ] Setup monitoring (optional)
- [ ] Added custom domain (optional)
- [ ] Enabled HTTPS (optional)

---

**You're all set! Start coding with AI! 🚀**

AI Unica - Professional AI Development Platform

