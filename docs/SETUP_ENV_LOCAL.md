# Setup .env.local File

## Issue
All Supabase environment variables are missing:
- ❌ `NEXT_PUBLIC_SUPABASE_URL` - Missing
- ❌ `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Missing
- ❌ `SUPABASE_SERVICE_ROLE_KEY` - Missing

## Solution: Create `.env.local` File

### Step 1: Create the File

1. **Go to your `frontend` folder**
2. **Create a new file called `.env.local`** (note the dot at the start)
3. **Add the following content:**

```env
# Supabase Configuration
# Get these values from: Supabase Dashboard → Settings → API

NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# CMS Configuration (if using Sanity)
NEXT_PUBLIC_SANITY_PROJECT_ID=your-sanity-project-id
NEXT_PUBLIC_SANITY_DATASET=production

# Payment Configuration (if using Flutterwave)
NEXT_PUBLIC_FLW_PUBLIC_KEY=your-flutterwave-public-key
```

### Step 2: Get Your Supabase Credentials

1. **Open your Supabase Dashboard**: https://app.supabase.com
2. **Select your project** (project ref: `ohuhloadfzntoyblftwr`)
3. **Go to Settings** → **API**
4. **Copy these values:**

#### a) Project URL
- Look for "Project URL" or "API URL"
- Copy the full URL (e.g., `https://ohuhloadfzntoyblftwr.supabase.co`)
- Paste it as `NEXT_PUBLIC_SUPABASE_URL`

#### b) Anon/Public Key
- Look for "Project API keys"
- Find "anon" or "public" key
- Copy the key (long string starting with `eyJ...`)
- Paste it as `NEXT_PUBLIC_SUPABASE_ANON_KEY`

#### c) Service Role Key ⚠️ **SECRET!**
- In the same "Project API keys" section
- Find "service_role" key
- **Click "Reveal" or "Show"** to see it (it's hidden by default)
- Copy the key
- Paste it as `SUPABASE_SERVICE_ROLE_KEY`
- **⚠️ NEVER commit this to git or expose it publicly!**

### Step 3: Update Your .env.local File

Replace the placeholder values in your `.env.local` file with your actual credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://ohuhloadfzntoyblftwr.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Step 4: Restart Your Dev Server

**IMPORTANT**: Environment variables are only loaded when the server starts!

1. **Stop your dev server** (Ctrl+C in the terminal)
2. **Restart it:**
   ```bash
   cd frontend
   npm run dev
   ```

### Step 5: Test Again

Visit: `http://localhost:3000/api/test-backend-connection`

You should now see:
```json
{
  "timestamp": "...",
  "environment": {
    "supabaseUrl": true,
    "supabaseAnonKey": true,
    "supabaseServiceRoleKey": true
  },
  "database": {
    "connected": true,
    "tables": {
      "newsletter_subscriptions": {
        "exists": true,
        "accessible": true
      },
      ...
    }
  }
}
```

## Quick Reference

### File Location
```
tunde-arts-connexions/
└── frontend/
    └── .env.local  ← Create this file here
```

### Required Variables
1. `NEXT_PUBLIC_SUPABASE_URL` - From Supabase Dashboard → Settings → API
2. `NEXT_PUBLIC_SUPABASE_ANON_KEY` - From Supabase Dashboard → Settings → API
3. `SUPABASE_SERVICE_ROLE_KEY` - From Supabase Dashboard → Settings → API (service_role)

### Security Notes
- ✅ `.env.local` is already in `.gitignore` - your secrets are safe
- ⚠️ Never commit `.env.local` to git
- ⚠️ Never expose `SUPABASE_SERVICE_ROLE_KEY` in client-side code

## Troubleshooting

### "File not found" error
- Make sure the file is named exactly `.env.local` (with the dot)
- Make sure it's in the `frontend` folder, not the root folder

### "Variables still missing" after restart
- Make sure you saved the file before restarting
- Make sure there are no extra spaces or quotes around the values
- Restart the dev server completely (stop and start)

### Still getting errors
- Check that your Supabase project is active
- Verify the project URL is correct
- Make sure you copied the full keys (they're long!)

