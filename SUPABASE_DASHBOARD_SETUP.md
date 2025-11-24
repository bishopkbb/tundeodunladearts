# Supabase Dashboard Setup Guide

## Overview

This guide covers what you need to do in your Supabase dashboard to ensure your database is properly set up.

## ✅ Required Actions

### 1. Run Database Migrations

You have **2 migration files** that need to be applied:

1. `20240101000000_initial_schema.sql` - Initial database schema (tables, RLS policies)
2. `20240101000001_add_newsletter_select_policy.sql` - Newsletter SELECT/UPDATE policies (NEW)

#### Option A: Using Supabase CLI (Recommended)

```bash
cd backend
npx supabase db push
```

This will push all migrations to your remote Supabase database.

#### Option B: Using Supabase Dashboard SQL Editor

1. **Go to Supabase Dashboard** → Your Project
2. **Click "SQL Editor"** in the left sidebar
3. **Create a new query**

**First, run the initial schema migration:**
- Open `backend/supabase/migrations/20240101000000_initial_schema.sql`
- Copy all contents
- Paste into SQL Editor
- Click **"Run"** (or press Ctrl/Cmd + Enter)

**Then, run the newsletter policy migration:**
- Open `backend/supabase/migrations/20240101000001_add_newsletter_select_policy.sql`
- Copy all contents
- Paste into SQL Editor
- Click **"Run"**

### 2. Verify Tables Were Created

1. **Go to "Table Editor"** in the left sidebar
2. **Verify these tables exist:**
   - ✅ `orders`
   - ✅ `rsvps`
   - ✅ `newsletter_subscriptions`
   - ✅ `contact_submissions`
   - ✅ `artwork_requests`

If any are missing, run the migrations again.

### 3. Verify Row Level Security (RLS) is Enabled

1. **Go to "Authentication" → "Policies"** (or check in Table Editor)
2. **For each table, verify RLS is enabled:**
   - Click on `newsletter_subscriptions` table
   - Check that "Enable RLS" toggle is ON (green)
   - Verify policies exist:
     - ✅ "Public can subscribe to newsletter" (INSERT)
     - ✅ "Public can check newsletter subscriptions" (SELECT) - NEW
     - ✅ "Public can update newsletter subscriptions" (UPDATE) - NEW

3. **Repeat for other tables:**
   - `orders`: Should have INSERT and SELECT policies
   - `rsvps`: Should have INSERT policy
   - `contact_submissions`: Should have INSERT policy
   - `artwork_requests`: Should have INSERT policy

### 4. Test the Database Connection

You can test your database connection using the test endpoint:

1. **Start your frontend dev server:**
   ```bash
   cd frontend
   npm run dev
   ```

2. **Visit the test endpoint:**
   ```
   http://localhost:3000/api/test-backend-connection
   ```

3. **Check the response:**
   - Should show `"connected": true`
   - All tables should show `"exists": true` and `"accessible": true`
   - No errors in the `errors` array

### 5. Verify Environment Variables

**In Supabase Dashboard:**

1. **Go to "Settings" → "API"**
2. **Copy these values to your `frontend/.env.local`:**

```env
# From Supabase Dashboard → Settings → API
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# From Supabase Dashboard → Settings → API → service_role (keep secret!)
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

⚠️ **Important**: The `SUPABASE_SERVICE_ROLE_KEY` is sensitive - never expose it in client-side code. It's already configured to only work server-side.

## 🔍 Quick Checklist

- [ ] Run migration `20240101000000_initial_schema.sql`
- [ ] Run migration `20240101000001_add_newsletter_select_policy.sql`
- [ ] Verify all 5 tables exist
- [ ] Verify RLS is enabled on all tables
- [ ] Verify policies exist for `newsletter_subscriptions`:
  - [ ] INSERT policy
  - [ ] SELECT policy (NEW)
  - [ ] UPDATE policy (NEW)
- [ ] Copy environment variables to `frontend/.env.local`
- [ ] Test connection using `/api/test-backend-connection`
- [ ] Test newsletter subscription form

## 🐛 Troubleshooting

### Issue: "Table does not exist" error

**Solution**: Run the initial schema migration:
```bash
cd backend
npx supabase db push
```

Or manually run the SQL in Supabase Dashboard → SQL Editor.

### Issue: "Permission denied" or "RLS policy violation"

**Solution**: 
1. Check that RLS policies exist for the table
2. Run the newsletter policy migration if missing:
   ```bash
   cd backend
   npx supabase db push
   ```

### Issue: Newsletter subscriptions not appearing

**Solution**:
1. Run the newsletter policy migration (`20240101000001_add_newsletter_select_policy.sql`)
2. Verify `SUPABASE_SERVICE_ROLE_KEY` is set in `frontend/.env.local`
3. Check server logs when submitting newsletter form
4. Verify in Supabase Dashboard → Table Editor → `newsletter_subscriptions`

### Issue: "SUPABASE_SERVICE_ROLE_KEY is missing"

**Solution**:
1. Go to Supabase Dashboard → Settings → API
2. Find "service_role" key (NOT the anon key)
3. Copy it to `frontend/.env.local` as `SUPABASE_SERVICE_ROLE_KEY`
4. Restart your dev server

## 📊 Monitoring

### Check Database Activity

1. **Go to "Database" → "Logs"** to see database activity
2. **Go to "Table Editor"** to view/manage data directly

### View Newsletter Subscriptions

1. **Go to "Table Editor"**
2. **Select `newsletter_subscriptions` table**
3. **View all subscriptions** - should see:
   - `email` (normalized, lowercase)
   - `name` (optional)
   - `status` ('active')
   - `subscribed_at` (timestamp)
   - `source` ('website')

## ✅ Summary

**Minimum Required Actions:**
1. ✅ Run both migration files (initial schema + newsletter policies)
2. ✅ Verify tables exist
3. ✅ Verify RLS policies exist
4. ✅ Set environment variables in `frontend/.env.local`

**That's it!** Once migrations are run and environment variables are set, your database is ready to use.

## Next Steps After Setup

1. Test newsletter subscription form
2. Test checkout/order creation
3. Test contact form submission
4. Monitor database logs for any errors

---

**Need Help?** 
- Check server logs when making API calls
- Use `/api/test-backend-connection` to diagnose issues
- Review Supabase Dashboard → Database → Logs for errors

