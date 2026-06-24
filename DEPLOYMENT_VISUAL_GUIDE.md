# 🎨 AI Unica - Visual Deployment Guide

A visual guide to help you choose and execute the best deployment method.

---

## 🗺️ Deployment Decision Tree

```
                    Want to deploy AI Unica?
                              |
                    ┌─────────┴─────────┐
                    |                   |
            Just testing?        Ready for production?
                    |                   |
                    ↓                   ↓
              ┌─────────┐         ┌─────────┐
              │ Docker  │         │  Cloud  │
              │ Local   │         │ Deploy  │
              └─────────┘         └─────────┘
                    |                   |
                    |         ┌─────────┼─────────┐
                    |         |         |         |
                    |    Free Tier  Paid   Full Control
                    |         |         |         |
                    |         ↓         ↓         ↓
                    |    ┌────────┐ ┌────────┐ ┌────────┐
                    |    │ Render │ │Railway │ │  VPS   │
                    |    └────────┘ └────────┘ └────────┘
                    |    $0/month   $5/month   $5+/month
                    |
                    ↓
              5 minutes setup!
```

---

## 📊 Deployment Methods Comparison

```
┌─────────────────────────────────────────────────────────────────┐
│                    Deployment Matrix                            │
├──────────┬──────┬──────┬───────┬──────────┬────────────────────┤
│ Method   │ Cost │ Time │ Level │ HTTPS    │ Best For           │
├──────────┼──────┼──────┼───────┼──────────┼────────────────────┤
│ Docker   │ FREE │  5m  │ Easy  │ Manual   │ Local testing      │
│ Render   │ FREE │ 10m  │ Easy  │ Auto ✅  │ Free cloud hosting │
│ Railway  │ $5/m │  7m  │ Easy  │ Auto ✅  │ Simple cloud       │
│ Vercel   │ FREE │ 15m  │ Med   │ Auto ✅  │ Split architecture │
│ VPS      │ $5/m │ 30m  │ Hard  │ Manual   │ Full control       │
└──────────┴──────┴──────┴───────┴──────────┴────────────────────┘
```

---

## 🐳 Docker Deployment Flow

```
┌─────────────────────────────────────────────────────────────┐
│                     Docker Deployment                        │
└─────────────────────────────────────────────────────────────┘

Step 1: Prepare
┌─────────────────────────┐
│ cd codepilot-ai         │
│ cp .env.production .env │
│ nano .env (add API key) │
└────────────┬────────────┘
             │
             ↓
Step 2: Deploy
┌─────────────────────────┐
│ docker-compose build    │
│ docker-compose up -d    │
└────────────┬────────────┘
             │
             ↓
Step 3: Access
┌─────────────────────────┐
│ http://localhost:8000   │
└─────────────────────────┘

Time: 5 minutes ⏱️
Cost: FREE 💰
```

---

## 🎨 Render Deployment Flow

```
┌─────────────────────────────────────────────────────────────┐
│                     Render Deployment                        │
└─────────────────────────────────────────────────────────────┘

Step 1: Push to GitHub
┌─────────────────────────┐
│ git init                │
│ git add .               │
│ git commit -m "Deploy"  │
│ git push origin main    │
└────────────┬────────────┘
             │
             ↓
Step 2: Connect to Render
┌─────────────────────────┐
│ Go to render.com        │
│ Click "New +"           │
│ Select "Web Service"    │
│ Connect GitHub repo     │
└────────────┬────────────┘
             │
             ↓
Step 3: Configure
┌─────────────────────────┐
│ Root: backend           │
│ Build: pip install...   │
│ Start: uvicorn main...  │
│ Add env variables       │
└────────────┬────────────┘
             │
             ↓
Step 4: Deploy
┌─────────────────────────┐
│ Click "Create"          │
│ Wait 5-10 minutes       │
└────────────┬────────────┘
             │
             ↓
Step 5: Access
┌─────────────────────────┐
│ https://ai-unica        │
│   .onrender.com         │
└─────────────────────────┘

Time: 10 minutes ⏱️
Cost: FREE (750 hrs/mo) 💰
HTTPS: Auto ✅
```

---

## 🚂 Railway Deployment Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    Railway Deployment                        │
└─────────────────────────────────────────────────────────────┘

Step 1: Install CLI
┌─────────────────────────┐
│ npm i -g @railway/cli   │
│ railway login           │
└────────────┬────────────┘
             │
             ↓
Step 2: Deploy Backend
┌─────────────────────────┐
│ cd backend              │
│ railway init            │
│ railway up              │
└────────────┬────────────┘
             │
             ↓
Step 3: Configure
┌─────────────────────────┐
│ Go to railway.app       │
│ Add env variables       │
│ Generate domain         │
└────────────┬────────────┘
             │
             ↓
Step 4: Access
┌─────────────────────────┐
│ https://your-app        │
│   .railway.app          │
└─────────────────────────┘

Time: 7 minutes ⏱️
Cost: $5/month 💰
HTTPS: Auto ✅
```

---

## ⚡ Vercel + Railway Flow

```
┌─────────────────────────────────────────────────────────────┐
│              Vercel (Frontend) + Railway (Backend)           │
└─────────────────────────────────────────────────────────────┘

Backend (Railway)                  Frontend (Vercel)
┌─────────────────┐               ┌─────────────────┐
│ cd backend      │               │ cd frontend     │
│ railway init    │               │ npm i -g vercel │
│ railway up      │               │ vercel --prod   │
└────────┬────────┘               └────────┬────────┘
         │                                 │
         ↓                                 ↓
┌─────────────────┐               ┌─────────────────┐
│ Configure:      │               │ Set API URL:    │
│ • Add env vars  │               │ VITE_API_URL=   │
│ • Get URL       │  ─────────>   │ backend URL     │
└────────┬────────┘               └────────┬────────┘
         │                                 │
         ↓                                 ↓
┌─────────────────┐               ┌─────────────────┐
│ Backend API:    │               │ Frontend:       │
│ your-app        │<─── CORS ────>│ ai-unica        │
│ .railway.app    │               │ .vercel.app     │
└─────────────────┘               └─────────────────┘

Time: 15 minutes ⏱️
Cost: FREE + $5/mo 💰
HTTPS: Auto ✅
Performance: Best 🚀
```

---

## 💻 VPS Deployment Flow

```
┌─────────────────────────────────────────────────────────────┐
│                      VPS Deployment                          │
└─────────────────────────────────────────────────────────────┘

Step 1: Create VPS
┌─────────────────────────┐
│ DigitalOcean/AWS/Linode │
│ Ubuntu 22.04 LTS        │
│ 2GB RAM minimum         │
└────────────┬────────────┘
             │
             ↓
Step 2: Initial Setup
┌─────────────────────────┐
│ ssh root@server-ip      │
│ apt update && upgrade   │
│ Install Docker          │
└────────────┬────────────┘
             │
             ↓
Step 3: Deploy App
┌─────────────────────────┐
│ git clone repo          │
│ cd codepilot-ai         │
│ docker-compose up -d    │
└────────────┬────────────┘
             │
             ↓
Step 4: Setup Nginx
┌─────────────────────────┐
│ apt install nginx       │
│ Configure reverse proxy │
│ certbot --nginx         │
└────────────┬────────────┘
             │
             ↓
Step 5: Access
┌─────────────────────────┐
│ https://your-domain.com │
└─────────────────────────┘

Time: 30 minutes ⏱️
Cost: $5-10/month 💰
HTTPS: Manual (certbot) ✅
Control: Full 💪
```

---

## 🎯 Use Case Recommendations

```
┌──────────────────────────────────────────────────────────────┐
│                    What's Your Goal?                         │
└──────────────────────────────────────────────────────────────┘

🧪 "I want to test locally"
   ↓
   Use: Docker
   Time: 5 minutes
   Command: ./deploy.sh (option 1)

───────────────────────────────────────────────────────────────

🎓 "I'm learning/building portfolio"
   ↓
   Use: Render (Free)
   Time: 10 minutes
   Cost: $0/month

───────────────────────────────────────────────────────────────

💼 "I need it for a client/startup"
   ↓
   Use: Vercel + Railway
   Time: 15 minutes
   Cost: $5/month
   Best performance ✨

───────────────────────────────────────────────────────────────

🏢 "I need full control/custom domain"
   ↓
   Use: VPS (DigitalOcean)
   Time: 30 minutes
   Cost: $5-10/month
   Full customization 💪

───────────────────────────────────────────────────────────────

🚀 "I need enterprise-grade"
   ↓
   Use: AWS/GCP + Load Balancer
   Time: 1-2 hours
   Cost: $30+/month
   Auto-scaling, monitoring 📊
```

---

## 🔐 Security Setup Visual

```
┌──────────────────────────────────────────────────────────────┐
│                   Security Checklist                         │
└──────────────────────────────────────────────────────────────┘

Before Deployment:

1. Generate SECRET_KEY
   ┌─────────────────────────────────────────────┐
   │ python3 -c "import secrets;                 │
   │   print(secrets.token_urlsafe(32))"         │
   └─────────────────────────────────────────────┘
   ↓
   Copy to .env

2. Get OpenAI API Key
   ┌─────────────────────────────────────────────┐
   │ Go to: platform.openai.com/api-keys         │
   │ Create new key                              │
   │ Copy to .env: OPENAI_API_KEY=sk-...         │
   └─────────────────────────────────────────────┘

3. Configure CORS
   ┌─────────────────────────────────────────────┐
   │ CORS_ORIGINS=["https://your-domain.com"]    │
   └─────────────────────────────────────────────┘

4. Set Production Mode
   ┌─────────────────────────────────────────────┐
   │ ENVIRONMENT=production                      │
   │ DEBUG=False                                 │
   └─────────────────────────────────────────────┘

✅ Ready to deploy securely!
```

---

## 📊 Architecture Diagrams

### Single Server (Docker)
```
┌────────────────────────────────────────┐
│         Docker Container               │
│                                        │
│  ┌──────────────┐  ┌───────────────┐  │
│  │   Frontend   │  │    Backend    │  │
│  │   (React)    │◄─┤   (FastAPI)   │  │
│  └──────────────┘  └───────┬───────┘  │
│                            │          │
│                    ┌───────▼───────┐  │
│                    │   SQLite DB   │  │
│                    └───────────────┘  │
└────────────────────────────────────────┘
         Port 8000
```

### Split Architecture (Vercel + Railway)
```
┌──────────────────┐         ┌──────────────────┐
│  Vercel CDN      │         │   Railway        │
│                  │         │                  │
│  ┌────────────┐  │         │ ┌──────────────┐ │
│  │  Frontend  │  │   API   │ │   Backend    │ │
│  │  (React)   │──┼────────►│ │  (FastAPI)   │ │
│  └────────────┘  │  calls  │ └──────┬───────┘ │
│                  │         │        │         │
│  Global CDN ⚡   │         │ ┌──────▼───────┐ │
└──────────────────┘         │ │  PostgreSQL  │ │
                             │ └──────────────┘ │
                             └──────────────────┘

Users → Vercel (Fast) → Railway API (Reliable)
```

---

## 🎬 Interactive Deployment Script

```bash
./deploy.sh

┌──────────────────────────────────────────────────┐
│        🚀 AI Unica Deployment Script             │
└──────────────────────────────────────────────────┘

Choose deployment method:

1. 🐳 Docker (Recommended - Full stack)
2. 🚂 Railway (Easy cloud deployment)
3. 🎨 Render (Free tier with auto-deploy)
4. ⚡ Vercel + Railway (Best performance)
5. 💻 Local Development (Test first)
6. 🔧 VPS/Server Setup Guide

Enter your choice (1-6): _
```

---

## 📝 Quick Commands Reference

### Docker Commands
```bash
# Start
docker-compose up -d

# Stop
docker-compose down

# Logs
docker-compose logs -f

# Rebuild
docker-compose build --no-cache

# Status
docker-compose ps
```

### Railway Commands
```bash
# Login
railway login

# Deploy
railway up

# Logs
railway logs

# Dashboard
railway open
```

### Vercel Commands
```bash
# Deploy
vercel --prod

# Logs
vercel logs

# Dashboard
vercel open
```

### Git Commands
```bash
# Initialize
git init
git add .
git commit -m "Initial deploy"

# Push to GitHub
git remote add origin <url>
git push -u origin main

# Update
git pull
git add .
git commit -m "Update"
git push
```

---

## ✅ Deployment Success Indicators

```
┌──────────────────────────────────────────────────┐
│          How to Know It's Working?               │
└──────────────────────────────────────────────────┘

✅ Health Check Returns
   curl https://your-app.com/health
   {"status":"healthy"}

✅ API Docs Load
   https://your-app.com/docs
   Shows FastAPI documentation

✅ Frontend Loads
   https://your-app.com
   Shows AI Unica interface

✅ AI Responds
   Send message in chat
   Get AI response

✅ No Errors in Logs
   docker-compose logs
   or platform-specific logs

✅ All Features Work
   • Code editor ✓
   • File explorer ✓
   • Terminal ✓
   • Chat ✓
```

---

## 🎉 You're Ready to Deploy!

Choose your method and follow the guide:

- **Quick Start**: [DEPLOY_QUICKSTART.md](DEPLOY_QUICKSTART.md)
- **Full Guide**: [DEPLOYMENT.md](DEPLOYMENT.md)
- **Summary**: [DEPLOYMENT_SUMMARY.md](DEPLOYMENT_SUMMARY.md)

Or run:
```bash
./deploy.sh
```

**Happy Deploying! 🚀**

