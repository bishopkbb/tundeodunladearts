# Fix Localhost Internal Server Error

## Quick Fix Steps:

### 1. Stop the Dev Server
- Press `Ctrl+C` in the terminal where `npm run dev` is running
- If it doesn't stop, close the terminal window

### 2. Delete the .next Directory

**Windows PowerShell:**
```powershell
cd frontend
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
```

**Or manually:**
- Navigate to `frontend` folder
- Delete the `.next` folder completely

### 3. Restart the Dev Server

```powershell
cd frontend
npm run dev
```

### 4. Check the Terminal Output

Look for any error messages. Common issues:

#### "Port 3000 already in use"
Kill the process:
```powershell
netstat -ano | findstr :3000
# Note the PID number
taskkill /PID <PID_NUMBER> /F
```

#### "Module not found"
Install dependencies:
```powershell
cd frontend
npm install
```

### 5. If Still Getting Internal Server Error

Check what the actual error is:

1. **Browser Console (F12)**:
   - Open DevTools
   - Check Console tab for errors
   - Check Network tab for failed requests

2. **Terminal Output**:
   - Look for error messages in red
   - Check if any API routes are failing

3. **Try These URLs**:
   - `http://localhost:3000/` - Homepage
   - `http://localhost:3000/api/artworks` - Should return JSON
   - `http://localhost:3000/api/test-backend-connection` - Should return status

## Common Causes:

1. **Build Error** - Check terminal for TypeScript/compile errors
2. **API Route Error** - Missing environment variables (app should still work with static data)
3. **Port Conflict** - Another app using port 3000
4. **Cache Issues** - `.next` directory corrupted

## Still Not Working?

Share:
- The exact error message from terminal
- Browser console errors (F12 → Console)
- What URL you're trying to access

