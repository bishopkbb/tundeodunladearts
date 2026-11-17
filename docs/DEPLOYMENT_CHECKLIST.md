# Pre-Deployment Checklist

## ✅ Before Deploying to Vercel

### Code Status
- [x] All changes committed
- [x] Code pushed to GitHub (or ready to push)
- [x] No `.env.local` or secrets in repository
- [x] `.gitignore` properly configured

### Project Configuration
- [x] Root directory: `frontend`
- [x] Framework: Next.js 15
- [x] Build command: `npm run build`
- [x] Output directory: `.next`

### Environment Variables Required

**Copy these from `frontend/.env.local`:**

```env
NEXT_PUBLIC_SUPABASE_URL=https://ohuhloadfzntoyblftwr.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[your-anon-key]
SUPABASE_SERVICE_ROLE_KEY=[your-service-role-key]
```

**Optional:**
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=[if using CMS]
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_FLW_PUBLIC_KEY=[if using payments]
```

### Database Setup
- [x] All migrations run on Supabase
- [x] Tables created and accessible
- [x] RLS policies configured
- [x] Test connection works locally

### Testing
- [x] Newsletter subscription works locally
- [x] All API routes tested
- [x] Pages load correctly
- [x] Mobile responsive
- [x] Images optimized

---

## Quick Deploy Steps Summary

1. ✅ **Push to GitHub** (done or ready)
2. ⏭️ **Create Vercel account** → vercel.com
3. ⏭️ **Import GitHub repo**
4. ⏭️ **Set root directory**: `frontend`
5. ⏭️ **Add environment variables** (all 3 required)
6. ⏭️ **Deploy!**
7. ⏭️ **Test live site**

See `VERCEL_DEPLOYMENT_GUIDE.md` for detailed steps.

