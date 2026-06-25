# 🚀 Deployment Steps - Your Code is on GitHub!

## ✅ Step 1: Code Pushed to GitHub (DONE!)

Your repository: https://github.com/arjitjaiswal08-art/AI-Automation

---

## 🎯 Step 2: Deploy to Render (10 minutes)

### Quick Deploy

1. **Go to Render**
   - Visit: https://render.com
   - Click **"Sign Up"** or **"Get Started"**
   - Sign in with GitHub

2. **Create Web Service**
   - Click **"New +"** → **"Web Service"**
   - Click **"Connect GitHub"**
   - Select **"AI-Automation"** repository
   - Click **"Connect"**

3. **Configure Service**

   **Basic Settings:**
   - **Name**: `ai-unica-backend`
   - **Region**: Choose closest (e.g., Oregon, Singapore)
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Python 3`

   **Build Command:**
   ```
   pip install -r requirements-deploy.txt
   ```

   **Start Command:**
   ```
   uvicorn main:app --host 0.0.0.0 --port $PORT
   ```

   **Instance Type:**
   - Select **"Free"** (or paid for better performance)

4. **Add Environment Variables**

   Click **"Add Environment Variable"** for each:

   ```
   OPENAI_API_KEY          sk-your-NEW-key-here
   SECRET_KEY              [Click "Generate" button]
   DATABASE_URL            sqlite:///./codepilot_ai.db
   ENVIRONMENT             production
   USE_OLLAMA              false
   CORS_ORIGINS            ["https://ai-unica-backend.onrender.com"]
   ```

   **⚠️ IMPORTANT**: Get a NEW OpenAI API key!
   - Go to: https://platform.openai.com/api-keys
   - Click **"Create new secret key"**
   - Copy and paste it

5. **Deploy!**
   - Click **"Create Web Service"**
   - Wait 5-10 minutes
   - Watch the logs

6. **Get Your URL**
   - After deployment: `https://ai-unica-backend.onrender.com`
   - Test: `https://ai-unica-backend.onrender.com/health`

---

## 🎨 Step 3: Deploy Frontend to Vercel (5 minutes)

### Option A: Automatic Deploy

1. **Go to Vercel**
   - Visit: https://vercel.com
   - Click **"Sign Up"** with GitHub
   - Click **"Import Project"**

2. **Import Repository**
   - Select **"AI-Automation"**
   - Click **"Import"**

3. **Configure**
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

4. **Environment Variables**
   ```
   VITE_API_URL = https://ai-unica-backend.onrender.com
   ```

5. **Deploy**
   - Click **"Deploy"**
   - Wait 2-3 minutes
   - Get URL: `https://ai-automation.vercel.app`

### Option B: Manual Deploy (CLI)

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
cd frontend
vercel --prod

# Follow prompts
# Enter backend URL when asked
```

---

## 🔄 Step 4: Update CORS (Important!)

After getting your Vercel URL, update backend CORS:

1. **Go to Render Dashboard**
2. **Click your service** (ai-unica-backend)
3. **Go to "Environment"**
4. **Update CORS_ORIGINS**:
   ```
   ["https://ai-automation.vercel.app","https://ai-unica-backend.onrender.com"]
   ```
5. **Save** → Service will redeploy

---

## ✅ Step 5: Test Your Deployment

### Backend Health Check
```bash
curl https://ai-unica-backend.onrender.com/health
# Expected: {"status":"healthy"}
```

### API Documentation
Visit: `https://ai-unica-backend.onrender.com/docs`

### Frontend
Visit: `https://ai-automation.vercel.app`

### Test Features
- [ ] Open AI chat
- [ ] Send a message
- [ ] Create new file
- [ ] Open projects
- [ ] Check terminal

---

## 🎉 You're Live!

Your app is now deployed at:
- **Frontend**: https://ai-automation.vercel.app
- **Backend**: https://ai-unica-backend.onrender.com
- **API Docs**: https://ai-unica-backend.onrender.com/docs

---

## 📊 What You Get (Free Tier)

### Render (Backend)
- ✅ 750 hours/month free
- ✅ Auto-deploy on git push
- ✅ Free SSL/HTTPS
- ✅ Auto-scaling
- ⚠️ Sleeps after 15min inactivity (wakes on request)

### Vercel (Frontend)
- ✅ Unlimited bandwidth
- ✅ Global CDN
- ✅ Auto-deploy on git push
- ✅ Free SSL/HTTPS
- ✅ Never sleeps

---

## 💰 Upgrade Options

### Keep Backend Awake (Render)
**Paid Plan**: $7/month
- Never sleeps
- Better performance
- More memory

### Better Backend (Railway)
**$5/month**
- Better performance
- PostgreSQL included
- Never sleeps

---

## 🔄 Future Updates

To update your deployed app:

```bash
# 1. Make changes locally
# 2. Commit and push
git add .
git commit -m "Update features"
git push origin main

# 3. Render auto-deploys backend
# 4. Vercel auto-deploys frontend
# Done!
```

---

## 🐛 Troubleshooting

### Backend won't start
- Check logs in Render dashboard
- Verify all environment variables
- Check OpenAI API key is valid

### Frontend can't connect
- Check CORS_ORIGINS includes frontend URL
- Verify VITE_API_URL in Vercel
- Check backend is running

### API Key errors
- Get NEW key from OpenAI
- Update in Render environment variables
- Restart service

---

## 📞 Support

- **Render Docs**: https://render.com/docs
- **Vercel Docs**: https://vercel.com/docs
- **Your Deployment Guides**: Check `DEPLOYMENT.md`

---

## 🎯 Quick Links

### Dashboards
- Render: https://dashboard.render.com
- Vercel: https://vercel.com/dashboard
- GitHub: https://github.com/arjitjaiswal08-art/AI-Automation

### API Keys
- OpenAI: https://platform.openai.com/api-keys
- OpenAI Usage: https://platform.openai.com/usage

### Monitoring
- Render Logs: In service dashboard
- Vercel Logs: `vercel logs`

---

**You're ready to deploy! Follow Step 2 above to deploy to Render! 🚀**

