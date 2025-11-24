# How to Install and Use Supabase CLI on Windows

## ✅ Recommended Method: Install as Dev Dependency

The easiest way for Windows is to install Supabase CLI as a development dependency in your project.

### Step 1: Install in Backend Folder

```bash
cd backend
npm install supabase --save-dev
```

### Step 2: Use with npx

After installation, use `npx` to run Supabase commands:

```bash
# From backend folder
npx supabase --version
npx supabase init
npx supabase start
npx supabase link --project-ref your-project-ref
npx supabase db push
```

### Step 3: Add npm Scripts (Optional)

You can add scripts to `backend/package.json` to make commands easier:

```json
{
  "scripts": {
    "supabase:version": "supabase --version",
    "supabase:init": "supabase init",
    "supabase:start": "supabase start",
    "supabase:stop": "supabase stop",
    "supabase:link": "supabase link --project-ref",
    "supabase:push": "supabase db push",
    "supabase:generate": "supabase gen types typescript --local > types/database.types.ts"
  }
}
```

Then run:
```bash
npm run supabase:version
npm run supabase:start
```

---

## Alternative Method 1: Using Scoop (Windows Package Manager)

If you have Scoop installed:

### Step 1: Add Supabase Bucket

```powershell
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
```

### Step 2: Install Supabase CLI

```powershell
scoop install supabase
```

### Step 3: Verify Installation

```powershell
supabase --version
```

---

## Alternative Method 2: Manual Download (Windows)

1. Go to: https://github.com/supabase/cli/releases
2. Download the Windows binary (`.exe` file)
3. Extract and add to your PATH
4. Or place in a folder and run directly

---

## ✅ Quick Verification

After installation, verify it works:

```bash
# If installed as dev dependency
cd backend
npx supabase --version

# If installed globally (Scoop or manual)
supabase --version
```

---

## 🔧 Common Commands

Once installed, you can use these commands:

```bash
# Initialize Supabase in a project
npx supabase init

# Start local Supabase (requires Docker)
npx supabase start

# Link to remote project
npx supabase link --project-ref your-project-ref

# Push database migrations
npx supabase db push

# Generate TypeScript types
npx supabase gen types typescript --local > types/database.types.ts

# Stop local Supabase
npx supabase stop
```

---

## 📋 Prerequisites

Before using Supabase CLI, make sure you have:

1. **Docker Desktop** (for local development):
   - Download: https://www.docker.com/products/docker-desktop
   - Required for `supabase start` command

2. **Node.js** (already installed ✓):
   - Your current version: Node.js v20.19.0

3. **Supabase Account**:
   - Sign up at: https://supabase.com

---

## 🎯 Next Steps

After installation:

1. **Link your project**:
   ```bash
   cd backend
   npx supabase link --project-ref your-project-ref
   ```

2. **Push database schema**:
   ```bash
   npx supabase db push
   ```

3. **See full setup guide**: `SUPABASE_SETUP_GUIDE.md`

---

## 💡 Pro Tip

For convenience, you can create a `.npmrc` file in the backend folder with:
```
save-exact=true
```

This ensures consistent Supabase CLI versions across team members.

