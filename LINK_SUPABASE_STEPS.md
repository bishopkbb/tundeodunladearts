# How to Link Your Supabase Project

## Step 1: Login to Supabase CLI

You need to authenticate first. Choose one method:

### Method A: Interactive Login (Easiest)

1. Open your terminal/command prompt
2. Navigate to backend folder:
   ```bash
   cd backend
   ```

3. Run login command:
   ```bash
   npx supabase login
   ```

4. This will open your browser - log in to Supabase
5. Copy the access token shown in the terminal
6. Paste it when prompted

### Method B: Use Access Token Directly

1. Go to: https://supabase.com/dashboard/account/tokens
2. Click "Generate New Token"
3. Copy the token
4. Run:
   ```bash
   cd backend
   npx supabase login --token YOUR_ACCESS_TOKEN_HERE
   ```

## Step 2: Link Your Project

After logging in, link your project:

```bash
cd backend
npx supabase link --project-ref ohuhloadfzntoyblftwr
```

You should see a success message!

## Step 3: Verify the Link

Check that it's linked:

```bash
npx supabase status
```

## Step 4: Push Database Schema

Now push your database migrations:

```bash
cd backend
npx supabase db push
```

This will create all your tables in Supabase!

---

## Troubleshooting

### "Access token not provided"
- Make sure you've logged in first (Step 1)

### "Project not found"
- Double-check your project ref ID: `ohuhloadfzntoyblftwr`
- Make sure you're logged into the correct Supabase account

### "Permission denied"
- Make sure you have access to this Supabase project
- Check that you're logged into the correct account

---

## Your Project Details

- **Project Ref**: `ohuhloadfzntoyblftwr`
- **Project URL**: `https://ohuhloadfzntoyblftwr.supabase.co`

