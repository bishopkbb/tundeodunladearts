# Understanding Vercel Deployment & Custom Domains

## 🎯 Quick Answer

**No, you only deploy the `frontend` folder to Vercel**, even with a Namecheap domain.

Here's why:

## 📦 What Gets Deployed Where

### ✅ Vercel (Deploy `frontend` folder only)
- **Purpose**: Hosts your Next.js website
- **What goes here**: Only the `frontend/` folder
- **Why**: Vercel is optimized for Next.js apps. Your Next.js app IS the website.

### 🗄️ Supabase (Already hosted separately)
- **Purpose**: Your database and backend API
- **What goes here**: Nothing from this repo (Supabase hosts it)
- **Where**: `backend/supabase/` is for **migrations** only (run via CLI)
- **Why**: Supabase is a separate service - it's already hosted in the cloud

### 📝 Sanity CMS (Already hosted separately)
- **Purpose**: Content management for artworks/exhibitions
- **What goes here**: Nothing from this repo (Sanity hosts it)
- **Why**: Sanity is a separate service - it's already hosted in the cloud

## 🌐 How Custom Domains Work

### Namecheap Domain → Vercel

```
User types: www.toacc.com (or your domain)
        ↓
    Namecheap DNS
        ↓
    Points to: Vercel's servers
        ↓
    Vercel serves: Your Next.js app (from frontend/)
```

**Important**: The domain only changes WHERE users access your site, not WHAT gets deployed.

## 📋 Complete Deployment Architecture

```
┌─────────────────────────────────────────┐
│         Namecheap Domain                │
│      (www.toacc.com - your domain)      │
└───────────────┬─────────────────────────┘
                │
                │ DNS Points To:
                ▼
┌─────────────────────────────────────────┐
│            Vercel Hosting               │
│  ┌──────────────────────────────────┐   │
│  │  frontend/ folder (Next.js app) │   │
│  │  - Pages & Components           │   │
│  │  - API Routes                   │   │
│  │  - Static Assets                │   │
│  └──────────────┬───────────────────┘   │
└─────────────────┼───────────────────────┘
                  │
      ┌───────────┼───────────┐
      │           │           │
      ▼           ▼           ▼
┌──────────┐ ┌──────────┐ ┌──────────┐
│ Supabase │ │  Sanity  │ │Flutterwave│
│ Database │ │   CMS    │ │ Payments  │
└──────────┘ └──────────┘ └──────────┘
(Already hosted) (Already hosted) (Already hosted)
```

## 🔧 What Each Folder Does

### `frontend/` → Deploy to Vercel ✅
```
This is your website!
- Next.js application
- Pages (homepage, gallery, shop, etc.)
- API routes (orders, newsletter, etc.)
- Components and UI
```

### `backend/` → Run migrations on Supabase ✅
```
NOT deployed to Vercel!
- Contains SQL migration files
- Run with: npx supabase db push
- These update your Supabase database
- Supabase is already hosted separately
```

### `cms/` → Deploy Sanity Studio separately ✅
```
NOT deployed to Vercel!
- Sanity Studio configuration
- Content schemas
- Deploy with: pnpm deploy (in cms folder)
- Sanity Studio is already hosted separately
```

## 🚀 Correct Deployment Process

### Step 1: Deploy Frontend to Vercel

1. **Import repo to Vercel**
2. **Set Root Directory**: `frontend` ⚠️
3. **Add environment variables**
4. **Deploy**

**Result**: Your website is live at `https://your-project.vercel.app`

### Step 2: Connect Namecheap Domain

1. **In Vercel Dashboard**:
   - Go to Project → Settings → Domains
   - Add your Namecheap domain (e.g., `www.toacc.com`)

2. **In Namecheap Dashboard**:
   - Go to Domain List → Manage
   - Advanced DNS
   - Add DNS record as instructed by Vercel:
     - **Type**: CNAME or A record
     - **Host**: `www` (or `@` for root)
     - **Value**: Vercel's IP/CNAME (provided by Vercel)

3. **Wait for DNS propagation** (up to 48 hours)

**Result**: `www.toacc.com` now points to your Vercel deployment!

### Step 3: Database & CMS (Already done)

- **Supabase**: Already hosted - just run migrations
- **Sanity CMS**: Already hosted - content is accessible via API

## ❓ Common Questions

### Q: Why only `frontend/` and not everything?

**A**: Because:
- Vercel is a hosting platform for web apps (Next.js)
- Your website IS the `frontend/` folder
- `backend/` is just migration files (Supabase hosts the database)
- `cms/` is just config files (Sanity hosts the CMS)

### Q: But I'll use my Namecheap domain - doesn't that change things?

**A**: No! The domain is just an address:
- Without custom domain: `https://your-project.vercel.app`
- With Namecheap domain: `https://www.toacc.com`
- Both point to the SAME deployment (your `frontend/` folder)

### Q: What about the backend folder - where does it go?

**A**: The `backend/` folder is **NOT deployed anywhere**. It contains:
- Migration files (SQL)
- You run these migrations ON Supabase (not deploy them)
- Command: `npx supabase db push` (updates Supabase database)

### Q: What about the CMS folder?

**A**: The `cms/` folder can be deployed separately:
- Option 1: Deploy Sanity Studio separately (for content editors)
- Option 2: Run locally (for development)
- The CMS data is already accessible via API (no deployment needed)

## ✅ Correct Vercel Configuration

### Root Directory
```
✅ CORRECT: frontend
❌ WRONG: / (root)
```

### Why `frontend`?
- Your Next.js app is in `frontend/`
- `package.json` is in `frontend/`
- Vercel needs to know where your app starts

### What happens if you use root (`/`)?
- ❌ Vercel looks for `package.json` in root (doesn't exist)
- ❌ Build fails
- ❌ Can't find Next.js app

## 🎯 Summary

| Folder | Deploy To | How | Purpose |
|--------|-----------|-----|---------|
| `frontend/` | ✅ Vercel | Set root directory to `frontend` | Your website |
| `backend/` | ❌ Not deployed | Run migrations on Supabase | Database migrations |
| `cms/` | ⚠️ Optional | Deploy Sanity Studio separately | CMS configuration |

## 🌐 Custom Domain Setup (Namecheap)

After deploying to Vercel:

1. **Get DNS instructions from Vercel**:
   - Vercel Dashboard → Project → Settings → Domains
   - Click "Add Domain"
   - Enter your Namecheap domain
   - Vercel shows DNS instructions

2. **Configure Namecheap DNS**:
   - Namecheap Dashboard → Domain List → Manage → Advanced DNS
   - Add CNAME or A record as shown by Vercel
   - Wait 24-48 hours for DNS propagation

3. **Result**:
   - Your domain (`www.toacc.com`) → Points to Vercel
   - Vercel serves your `frontend/` app
   - Website accessible at your custom domain!

---

**Bottom Line**: Only deploy `frontend/` to Vercel. The custom domain just changes the URL - it doesn't change what gets deployed.

