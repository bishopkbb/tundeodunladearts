# Quick Vercel Deployment Guide

## 🚀 Step-by-Step Instructions

### Step 1: Push to GitHub

**If you haven't pushed yet:**
```bash
# Try pushing again (network might be better now)
git push origin main
```

**Or if you get errors, try:**
```bash
git push origin main --force-with-lease
```

---

### Step 2: Go to Vercel

1. **Visit**: https://vercel.com
2. **Sign Up/Log In** with GitHub
3. **Click "Add New..." → "Project"**

---

### Step 3: Import Your Repository

1. **Select your GitHub repo**: `tundeodunladearts` (or your repo name)
2. **Click "Import"**

---

### Step 4: Configure Project ⚠️ **IMPORTANT**

#### 4.1 Root Directory
- **Click "Edit"** next to Root Directory
- **Select `frontend`** from dropdown
- **This is critical!** Your Next.js app is in the `frontend` folder

#### 3.2 Framework Settings (Auto-detected)
- **Framework Preset**: Next.js
- **Build Command**: `npm run build` (leave as is)
- **Output Directory**: `.next` (leave as is)
- **Install Command**: `npm install` (leave as is)

---

### Step 4: Add Environment Variables ⚠️ **CRITICAL**

**BEFORE clicking "Deploy":**

1. **Click "Environment Variables"** section (or scroll down)
2. **Add these 3 variables:**

#### Variable 1: NEXT_PUBLIC_SUPABASE_URL
- **Name**: `NEXT_PUBLIC_SUPABASE_URL`
- **Value**: `https://ohuhloadfzntoyblftwr.supabase.co`
- **Environments**: ✅ Production ✅ Preview ✅ Development
- **Click "Save"**

#### Variable 2: NEXT_PUBLIC_SUPABASE_ANON_KEY
- **Name**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Value**: [Your anon key from Supabase Dashboard → Settings → API]
- **Environments**: ✅ Production ✅ Preview ✅ Development
- **Click "Save"**

#### Variable 3: SUPABASE_SERVICE_ROLE_KEY
- **Name**: `SUPABASE_SERVICE_ROLE_KEY`
- **Value**: [Your service_role key from Supabase Dashboard → Settings → API]
- **Environments**: ✅ Production ✅ Preview ✅ Development
- **Click "Save"**

#### Optional: If using Sanity CMS
- **Name**: `NEXT_PUBLIC_SANITY_PROJECT_ID`
- **Value**: [Your Sanity project ID]

#### Optional: If using Flutterwave
- **Name**: `NEXT_PUBLIC_FLW_PUBLIC_KEY`
- **Value**: [Your Flutterwave public key]

---

### Step 5: Deploy! 🎉

1. **Review all settings**:
   - ✅ Root Directory: `frontend`
   - ✅ All environment variables added
   - ✅ Framework: Next.js

2. **Click "Deploy"**

3. **Wait 2-5 minutes** for build to complete

4. **Watch the build logs** - you'll see:
   - Installing dependencies
   - Building Next.js app
   - Deploying...

---

### Step 6: Get Your Live URL

Once deployment completes:

1. **You'll see**: "Deployment Successful!"
2. **Your live URL**: `https://your-project-name.vercel.app`
3. **Click the URL** to visit your site!

---

### Step 7: Connect Your Namecheap Domain (Optional)

**After Vercel deployment:**

1. **In Vercel Dashboard**:
   - Go to Project → Settings → Domains
   - Click "Add Domain"
   - Enter your Namecheap domain (e.g., `www.toacc.com`)
   - Vercel will show DNS instructions

2. **In Namecheap Dashboard**:
   - Go to Domain List → Manage → Advanced DNS
   - Add DNS record as shown by Vercel:
     - **Type**: CNAME (or A record)
     - **Host**: `www` (or `@` for root domain)
     - **Value**: Vercel's CNAME/IP (shown in Vercel)
   - Save changes

3. **Wait for DNS Propagation**: 24-48 hours (can be faster)

4. **Result**: Your domain now points to your Vercel deployment!

**Note**: The domain only changes the URL - your site is still the same `frontend/` deployment.

---

### Step 8: Test Your Live Site

1. **Visit your Vercel URL**
2. **Test newsletter subscription**:
   - Go to homepage → Newsletter section
   - Submit an email
   - Check Supabase Dashboard → `newsletter_subscriptions` table
   - Email should appear!

3. **Test API endpoint**:
   - Visit: `https://your-site.vercel.app/api/test-backend-connection`
   - Should show connection status

---

## ⚠️ Common Mistakes to Avoid

### ❌ Wrong Root Directory
- **Wrong**: Leaving as `/` (root)
- **Correct**: Set to `frontend`

### ❌ Missing Environment Variables
- **Result**: Newsletter won't save, API routes will fail
- **Solution**: Add all 3 required Supabase variables

### ❌ Environment Variables in Wrong Environment
- **Result**: Variables not available in production
- **Solution**: Select all 3 environments (Production, Preview, Development)

### ❌ Wrong Variable Names
- **Wrong**: `SUPABASE_URL` (missing `NEXT_PUBLIC_`)
- **Correct**: `NEXT_PUBLIC_SUPABASE_URL`

---

## 🎯 Quick Checklist

Before clicking "Deploy":

- [ ] Root Directory set to `frontend`
- [ ] `NEXT_PUBLIC_SUPABASE_URL` added
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` added
- [ ] `SUPABASE_SERVICE_ROLE_KEY` added
- [ ] All variables set for Production, Preview, and Development
- [ ] Code pushed to GitHub

---

## 📋 After Deployment

### Verify Everything Works:

- [ ] Site loads at Vercel URL
- [ ] Newsletter subscription saves to Supabase
- [ ] Contact form works
- [ ] Gallery/Shop pages load
- [ ] Images display correctly
- [ ] Mobile responsive

### Monitor:

- **Vercel Dashboard** → Check analytics and errors
- **Supabase Dashboard** → Monitor database activity

---

## 🔄 Updating Your Site

**To deploy updates:**

1. Make changes locally
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Your update message"
   git push origin main
   ```
3. **Vercel automatically deploys** (if connected to main branch)

**Or manually redeploy:**
1. Go to Vercel Dashboard
2. Click "Redeploy" → "Redeploy" (latest)

---

## 🆘 Troubleshooting

### Build Fails

**Check:**
1. Root Directory is `frontend`
2. `package.json` exists in `frontend` folder
3. All dependencies listed correctly

### API Routes Return 500 Errors

**Fix:**
1. Check environment variables are set in Vercel
2. Verify variable names are correct (case-sensitive!)
3. Make sure `SUPABASE_SERVICE_ROLE_KEY` is set
4. Redeploy after adding variables

### Newsletter Not Saving

**Fix:**
1. Verify `SUPABASE_SERVICE_ROLE_KEY` is set in Vercel
2. Check Supabase Dashboard → Table Editor → `newsletter_subscriptions`
3. Test API endpoint: `/api/test-backend-connection`

---

## 📚 Need More Details?

See **`VERCEL_DEPLOYMENT_GUIDE.md`** for comprehensive guide with screenshots and troubleshooting.

---

**That's it!** Your site will be live at `https://your-project.vercel.app` 🎉

