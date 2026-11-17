# Quick Supabase Dashboard Setup

## TL;DR - What You Need to Do

### 1. Run Database Migrations ⚠️ **REQUIRED**

You have **2 migration files** that must be run in your Supabase dashboard:

#### Using Supabase Dashboard (Easiest):

1. **Open Supabase Dashboard** → Your Project
2. **Click "SQL Editor"** (left sidebar)
3. **Click "New query"**
4. **Run Migration #1:**
   - Copy entire contents of `backend/supabase/migrations/20240101000000_initial_schema.sql`
   - Paste into SQL Editor
   - Click **"Run"** (or Ctrl/Cmd + Enter)

5. **Run Migration #2:**
   - Copy entire contents of `backend/supabase/migrations/20240101000001_add_newsletter_select_policy.sql`
   - Paste into SQL Editor
   - Click **"Run"**

#### Or Using CLI:
```bash
cd backend
npx supabase db push
```

### 2. Verify Setup ✅

1. **Go to "Table Editor"** - Check these tables exist:
   - `orders`
   - `newsletter_subscriptions`
   - `rsvps`
   - `contact_submissions`
   - `artwork_requests`

2. **Test connection:**
   - Visit: `http://localhost:3000/api/test-backend-connection`
   - Should show all tables as `"exists": true`

### 3. Environment Variables ⚠️ **REQUIRED**

In `frontend/.env.local`, ensure you have:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

Get these from: **Supabase Dashboard → Settings → API**

---

## That's It! 🎉

After running the migrations and setting environment variables, your database is ready.

**Need more details?** See `SUPABASE_DASHBOARD_SETUP.md` for comprehensive guide.

