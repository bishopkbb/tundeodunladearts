# Debugging Localhost Internal Server Error

## Quick Fixes to Try:

### 1. Stop and Restart the Dev Server

```bash
# Press Ctrl+C to stop the server
# Then restart:
cd frontend
npm run dev
```

### 2. Clear Next.js Cache

```bash
cd frontend
rm -rf .next
npm run dev
```

### 3. Check for Missing Environment Variables

The app should work without `.env.local`, but if you're seeing errors, create one:

**Create `frontend/.env.local` file:**

```env
# Minimum required (app will work with static data without these)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

### 4. Check the Browser Console

Open browser DevTools (F12) and check:
- **Console tab** - Look for JavaScript errors
- **Network tab** - Check which requests are failing

### 5. Check Terminal Errors

The terminal running `npm run dev` will show:
- Build errors
- Runtime errors
- API route errors

### 6. Try Accessing Different Routes

- `http://localhost:3000/` - Homepage
- `http://localhost:3000/api/artworks` - API route (should return JSON)
- `http://localhost:3000/gallery` - Gallery page

### 7. Check Node Version

```bash
node --version
```

Should be Node.js 18.x or higher.

### Common Error Messages:

#### "EADDRINUSE" 
Port 3000 is already in use. Kill the process or use another port:
```bash
# Kill process on port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F

# Or use different port
PORT=3001 npm run dev
```

#### "Module not found"
Dependencies are missing:
```bash
cd frontend
npm install
```

#### Build Errors
Clear cache and rebuild:
```bash
cd frontend
rm -rf .next node_modules/.cache
npm run build
```

## Still Not Working?

Share the exact error message from:
1. Terminal where `npm run dev` is running
2. Browser console (F12 → Console tab)
3. Browser Network tab showing failed requests

