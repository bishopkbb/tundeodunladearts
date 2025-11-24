# Vercel Deployment Guide - Step by Step

Complete guide to deploy your TOACC Gallery website to Vercel.

## Prerequisites

- ✅ Your code committed to GitHub
- ✅ Vercel account (free tier works fine)
- ✅ Supabase credentials ready

---

## Step 1: Push to GitHub

**First, make sure all changes are pushed:**

```bash
# Check status
git status

# If you have uncommitted changes, commit them:
git add .
git commit -m "Your commit message"

# Push to GitHub
git push origin main
```

**Note**: If push fails due to network issues, try again later or use:
```bash
git push origin main --verbose
```

---

## Step 2: Create Vercel Account

1. **Go to**: https://vercel.com
2. **Click "Sign Up"** (or "Log In" if you have an account)
3. **Choose "Continue with GitHub"** (recommended)
4. **Authorize Vercel** to access your GitHub account

---

## Step 3: Import Your Project

1. **After logging in**, you'll see your Vercel dashboard
2. **Click "Add New..." → "Project"**
3. **Select your GitHub repository**: `tundeodunladearts` (or your repo name)
4. **If you don't see it**, click "Adjust GitHub App Permissions" and grant access

---

## Step 4: Configure Project Settings

### 4.1 Root Directory

**Important**: Your frontend is in the `frontend` folder!

1. **Under "Root Directory"**, click **"Edit"**
2. **Select `frontend`** from the dropdown (or type `frontend`)
3. **Click "Continue"**

### 4.2 Framework Preset

- **Framework Preset**: Should auto-detect as "Next.js"
- If not, select **"Next.js"** manually

### 4.3 Build and Output Settings

- **Build Command**: `npm run build` (default)
- **Output Directory**: `.next` (default - leave as is)
- **Install Command**: `npm install` (default)

---

## Step 5: Configure Environment Variables ⚠️ **CRITICAL**

**This is the most important step!**

1. **Before clicking "Deploy"**, click **"Environment Variables"** section
2. **Add these variables one by one:**

### Required Variables:

```env
NEXT_PUBLIC_SUPABASE_URL=https://ohuhloadfzntoyblftwr.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

**Optional (if using):**
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-sanity-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_FLW_PUBLIC_KEY=your-flutterwave-public-key
```

3. **For each variable:**
   - Click **"Add"** or **"Add Another"**
   - **Name**: e.g., `NEXT_PUBLIC_SUPABASE_URL`
   - **Value**: Paste your actual value
   - **Environment**: Select all three:
     - ✅ Production
     - ✅ Preview
     - ✅ Development
   - Click **"Save"**

4. **Repeat for all variables**

⚠️ **Important**: 
- Get values from your `frontend/.env.local` file
- **NEVER** commit `.env.local` to GitHub (it's already in `.gitignore`)
- Copy the values manually

---

## Step 6: Deploy!

1. **Review your settings** (especially Root Directory and Environment Variables)
2. **Click "Deploy"**
3. **Wait for build** (usually 2-5 minutes)
4. **Watch the build logs** for any errors

---

## Step 7: Verify Deployment

### 7.1 Check Build Logs

- Look for: ✅ "Build Completed"
- If you see errors, check:
  - Environment variables are set correctly
  - Root directory is `frontend`
  - All dependencies installed

### 7.2 Visit Your Site

- Vercel will give you a URL like: `https://your-project-name.vercel.app`
- **Visit the URL** to see your site live!

### 7.3 Test Critical Features

1. **Newsletter Subscription**
   - Go to homepage → Newsletter section
   - Submit an email
   - Check Supabase Dashboard → Table Editor → `newsletter_subscriptions`
   - Email should appear!

2. **API Endpoints**
   - Visit: `https://your-site.vercel.app/api/test-backend-connection`
   - Should show connection status

3. **Pages**
   - Test all pages load correctly
   - Check images display
   - Test navigation

---

## Step 8: Custom Domain (Optional)

### 8.1 Add Domain in Vercel

1. **Go to Project Settings** → **Domains**
2. **Enter your domain** (e.g., `www.toacc.com`)
3. **Click "Add"**
4. **Follow DNS instructions** provided by Vercel

### 8.2 Configure DNS

You'll need to add DNS records to your domain provider:

**Option A: CNAME Record** (Recommended)
- **Type**: CNAME
- **Name**: `www` (or `@` for root domain)
- **Value**: `cname.vercel-dns.com`

**Option B: A Record** (For root domain)
- **Type**: A
- **Name**: `@`
- **Value**: Vercel's IP (provided in dashboard)

**DNS Propagation**: Can take 24-48 hours

---

## Step 9: Post-Deployment Checklist

### ✅ Verify Environment Variables

1. **Go to Project Settings** → **Environment Variables**
2. **Verify all variables are set**:
   - ✅ `NEXT_PUBLIC_SUPABASE_URL`
   - ✅ `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - ✅ `SUPABASE_SERVICE_ROLE_KEY`
   - ✅ Any CMS/payment keys you're using

### ✅ Test All Features

- [ ] Homepage loads
- [ ] Newsletter subscription works
- [ ] Contact form works
- [ ] Gallery/Shop pages load
- [ ] Checkout process works
- [ ] Images load correctly
- [ ] Mobile responsive
- [ ] SEO meta tags present

### ✅ Monitor Errors

1. **Go to Vercel Dashboard** → **Analytics**
2. **Check for errors** in logs
3. **Monitor performance**

---

## Troubleshooting

### Issue: Build Fails

**Common Causes:**
1. **Root Directory wrong** - Should be `frontend`
2. **Missing dependencies** - Check `package.json` exists
3. **Environment variables missing** - Add all required variables
4. **Build errors** - Check build logs for specific errors

**Solution:**
```bash
# Test build locally first
cd frontend
npm run build

# If local build works, check Vercel settings
```

### Issue: API Routes Return 500 Errors

**Cause**: Environment variables not set in Vercel

**Solution:**
1. Go to Vercel Dashboard → Project → Settings → Environment Variables
2. Add all required Supabase variables
3. Redeploy (Vercel auto-redeploys when env vars change)

### Issue: Newsletter Subscriptions Not Saving

**Cause**: `SUPABASE_SERVICE_ROLE_KEY` missing or incorrect

**Solution:**
1. Verify `SUPABASE_SERVICE_ROLE_KEY` is set in Vercel
2. Check it matches your Supabase Dashboard → Settings → API
3. Make sure it's set for **Production** environment

### Issue: Site Shows "Application Error"

**Cause**: Build or runtime error

**Solution:**
1. Check Vercel build logs
2. Look for specific error messages
3. Test API routes: `/api/test-backend-connection`
4. Verify all environment variables are correct

---

## Quick Deploy Checklist

Before deploying, ensure:

- [ ] Code pushed to GitHub
- [ ] `frontend` folder is the root directory in Vercel
- [ ] Environment variables added:
  - [ ] `NEXT_PUBLIC_SUPABASE_URL`
  - [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - [ ] `SUPABASE_SERVICE_ROLE_KEY`
  - [ ] Any other required variables
- [ ] Build command: `npm run build`
- [ ] Output directory: `.next`
- [ ] Install command: `npm install`

---

## Post-Deployment

### Monitoring

1. **Vercel Dashboard** → Check analytics and errors
2. **Supabase Dashboard** → Monitor database activity
3. **Test all features** on live site

### Updates

**To deploy updates:**
1. Make changes locally
2. Commit and push to GitHub
3. Vercel **automatically deploys** (if connected to main branch)

**Or manually:**
1. Go to Vercel Dashboard
2. Click "Redeploy" → "Redeploy" (latest deployment)

---

## Environment Variables Quick Reference

```env
# Required - Get from Supabase Dashboard → Settings → API
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Optional - If using Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production

# Optional - If using Flutterwave payments
NEXT_PUBLIC_FLW_PUBLIC_KEY=FLWPUBK-...
```

---

## Need Help?

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Deployment**: https://nextjs.org/docs/deployment
- **Check build logs** in Vercel Dashboard for specific errors

---

**You're all set!** Once deployed, your site will be live at `https://your-project.vercel.app`

