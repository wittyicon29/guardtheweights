# Render + Vercel Deployment Guide

## Complete Step-by-Step Deployment Plan

### Prerequisites
- GitHub account with your repo pushed
- Groq API Key (from https://console.groq.com)
- Vercel account (free)
- Render account (free)

---

## PART 1: DEPLOY FRONTEND TO VERCEL (5 minutes)

### Step 1.1: Connect GitHub to Vercel
1. Go to https://vercel.com
2. Click **"Continue with GitHub"**
3. Sign in with your GitHub account
4. Click **"Authorize Vercel"**

### Step 1.2: Import Your Repository
1. Click **"Import Project"**
2. In "From Git Repository" field, paste: `https://github.com/YOUR_USERNAME/guardtheweights`
3. Click **"Continue"**

### Step 1.3: Configure Build Settings
1. **Project Name**: `echoes-aethermoor-frontend`
2. **Framework Preset**: React
3. **Root Directory**: `./frontend` ← **IMPORTANT**
4. **Build Command**: `npm run build` (default, keep as is)
5. **Output Directory**: `.next` (auto-detected, keep as is)

### Step 1.4: Add Environment Variables
1. Click **"Environment Variables"**
2. Add new variable:
   - **Name**: `REACT_APP_API_URL`
   - **Value**: `https://echoes-aethermoor-backend.onrender.com/api`
     (You'll update this after Render deployment with correct URL)
3. **Environment**: Select **"Production"**
4. Click **"Add"**

### Step 1.5: Deploy
1. Click **"Deploy"** button
2. Wait 2-3 minutes for build to complete
3. You'll see: `https://echoes-aethermoor-frontend.vercel.app`
4. **Copy this URL** - you'll need it for Render

✅ Frontend is now live at Vercel!

---

## PART 2: DEPLOY BACKEND TO RENDER (10 minutes)

### Step 2.1: Create Render Account
1. Go to https://render.com
2. Click **"Sign up"**
3. Select **"GitHub"** and authorize
4. Complete account setup

### Step 2.2: Create a New Web Service
1. Go to Render Dashboard
2. Click **"New +"** → **"Web Service"**
3. Select **"Connect a GitHub repository"**

### Step 2.3: Connect Your Repository
1. Find and click on **guardtheweights** repo
2. Click **"Connect"**

### Step 2.4: Configure Web Service
Fill in the following fields:

| Field | Value |
|-------|-------|
| **Name** | `echoes-aethermoor-backend` |
| **Environment** | `Python 3` |
| **Region** | Your closest (e.g., US East) |
| **Branch** | `main` |
| **Build Command** | `pip install -r backend/requirements.txt` |
| **Start Command** | `cd backend && uvicorn app:app --host 0.0.0.0 --port 8080` |

### Step 2.5: Add Environment Variables
Click **"Advanced"** → **"Add Environment Variable"** for each:

```
GROQ_API_KEY = your_groq_api_key_here
FRONTEND_URL = https://echoes-aethermoor-frontend.vercel.app
DEBUG = false
```

### Step 2.6: Select Plan
1. When asked about plan, select **"Free"** ← IMPORTANT
2. Click **"Create Web Service"**

### Step 2.7: Wait for Deployment
- Render will start building (takes 3-5 minutes)
- You'll see deployment logs in real-time
- Once done, you'll get URL: `https://echoes-aethermoor-backend.onrender.com`
- **Copy this URL** - needed for frontend update

✅ Backend is now live at Render!

---

## PART 3: LINK FRONTEND & BACKEND (3 minutes)

### Step 3.1: Update Frontend Environment Variable
1. Go to Vercel Dashboard
2. Click on **echoes-aethermoor-frontend** project
3. Click **"Settings"** → **"Environment Variables"**
4. Edit `REACT_APP_API_URL`
5. Change value to: `https://echoes-aethermoor-backend.onrender.com/api`
6. Click **"Save"**

### Step 3.2: Trigger Frontend Rebuild
1. Go to **Deployments** tab
2. Click **"Redeploy"** on latest deployment
3. Wait 1-2 minutes for rebuild

### Step 3.3: Test the Connection
1. Open your Vercel frontend URL
2. Try asking a question to the narrator
3. If it works → ✅ Deployment successful!

✅ Frontend and Backend are now connected!

---

## PART 4: VERIFY EVERYTHING WORKS (2 minutes)

### Test Your Game
1. Open: `https://echoes-aethermoor-frontend.vercel.app`
2. Click in chat box
3. Ask: "Who built Aethermoor?"
4. Should see narrator response
5. Try extracting information
6. Validate answer

If all works → **🎉 Deployment Complete!**

---

## TROUBLESHOOTING

### Issue: "Failed to connect to API"
**Solution:**
1. Check `REACT_APP_API_URL` in Vercel is correct
2. Check `FRONTEND_URL` in Render is correct
3. Trigger Vercel redeploy
4. Wait 2 minutes

### Issue: "Backend returns 502 Bad Gateway"
**Solution:**
1. Go to Render → Your service → Logs
2. Check for Python errors
3. Verify `GROQ_API_KEY` is set correctly
4. Restart service: Dashboard → Click service → "Manual Deploy"

### Issue: "CORS errors in browser console"
**Solution:**
1. Check `FRONTEND_URL` matches exactly
2. Make sure no trailing slashes
3. Must be `https://`, not `http://`

### Issue: "Cold start - slow first request"
**Reason**: Render free tier sleeps after 15 minutes of inactivity
**Solution**: First request takes 10-30 seconds. Subsequent requests are fast.

---

## FREE TIER LIMITS

| Platform | Free Tier Limit |
|----------|---|
| **Vercel** | Unlimited requests, unlimited projects |
| **Render** | 1 free web service, 750 compute hours/month (always free) |
| **Groq API** | 30 requests/minute |

**Your game usage**: ~2 requests per secret = ~15 unlocks/minute = Well within limits ✅

---

## DEPLOYMENT CHECKLIST

- [ ] Groq API key obtained from https://console.groq.com
- [ ] Code pushed to GitHub
- [ ] Vercel frontend deployed (Step 1)
- [ ] Render backend deployed (Step 2)
- [ ] Frontend URL updated in Render (Step 3.1)
- [ ] Backend URL updated in Vercel (Step 3.1)
- [ ] Frontend redeployed (Step 3.2)
- [ ] Game tested and working (Step 4)

---

## NEXT STEPS

Once deployed:
1. **Share your game URL** with friends
2. **Monitor free tier limits**:
   - Check Groq usage at https://console.groq.com
   - Check Render logs: Dashboard → Your service → Logs
3. **If you hit Render limits** (unlikely):
   - Upgrade to paid tier ($7/month)
   - Or use Railway/Fly.io instead

---

## TOTAL TIME: ~20-25 minutes
## TOTAL COST: $0 ✅
