# Debugging Test Endpoint Internal Server Error

## Common Causes

### 1. Missing Environment Variables ⚠️ **MOST LIKELY**

Check if `frontend/.env.local` exists and contains:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

**How to fix:**
1. Create `frontend/.env.local` if it doesn't exist
2. Add the three variables above
3. Get values from: **Supabase Dashboard → Settings → API**
4. **Restart your dev server** after adding variables

### 2. Check Server Logs

When you visit `http://localhost:3000/api/test-backend-connection`, check your terminal where `npm run dev` is running.

**Look for:**
- Error messages
- Stack traces
- "SUPABASE_SERVICE_ROLE_KEY is missing" warnings

### 3. Test After Fix

I've updated the test endpoint to:
- ✅ Catch all errors gracefully
- ✅ Return detailed error information
- ✅ Show environment variable status

After fixing, visit the endpoint again - it should now show:
- Environment variable status (true/false)
- Specific error messages
- Detailed debugging info

## Quick Fix Steps

1. **Verify `.env.local` exists:**
   ```bash
   # In frontend folder
   ls .env.local
   ```

2. **Check if variables are set:**
   - `NEXT_PUBLIC_SUPABASE_URL` should be your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` should be the anon/public key
   - `SUPABASE_SERVICE_ROLE_KEY` should be the service_role key (secret!)

3. **Restart dev server:**
   ```bash
   # Stop server (Ctrl+C)
   # Then restart
   npm run dev
   ```

4. **Test again:**
   Visit: `http://localhost:3000/api/test-backend-connection`

## Expected Response After Fix

```json
{
  "timestamp": "2024-...",
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
        "accessible": true,
        "recordCount": 0
      },
      ...
    }
  }
}
```

## If Still Getting Errors

Share the response from the endpoint - it should now show detailed error information instead of just "Internal Server Error".

