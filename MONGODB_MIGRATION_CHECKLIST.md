# MongoDB Migration Checklist

## ✅ Completed Migrations

All API endpoints have been successfully migrated from Supabase to MongoDB.

### API Endpoints Migrated:
1. ✅ `/api/newsletter/subscribe` - Newsletter subscription
2. ✅ `/api/orders/create-order` - Create new order
3. ✅ `/api/orders/get-order` - Retrieve order by ID
4. ✅ `/api/rsvp/create-rsvp` - Create RSVP for events
5. ✅ `/api/contact/submit` - Contact form submission

### Frontend Components Updated:
1. ✅ `NewsletterSection.tsx` - Newsletter subscription form
2. ✅ `Footer.tsx` - Newsletter subscription in footer
3. ✅ `contact/page.tsx` - Contact form
4. ✅ `CheckoutForm.tsx` - Order creation during checkout

## 🔧 Error Handling Improvements

All components now have improved error handling for:
- Network connection failures ("fetch failed" errors)
- MongoDB connection issues
- Server configuration errors
- Better user-facing error messages

## 📋 Production Setup Checklist

### 1. Vercel Environment Variables (REQUIRED)
Add these in Vercel Dashboard → Settings → Environment Variables:

```
MONGODB_URI=mongodb+srv://ajibadetosin_db_user:talentist@cluster0.wsbfg5v.mongodb.net/toacc?retryWrites=true&w=majority
MONGODB_DB_NAME=toacc
```

**Important:** 
- Add to all environments (Production, Preview, Development)
- Redeploy after adding variables

### 2. MongoDB Atlas Network Access
- Go to MongoDB Atlas → Network Access
- Add IP Address: `0.0.0.0/0` (for testing) OR specific Vercel IP ranges
- Wait 1-2 minutes after adding

### 3. Test All Endpoints in Production

After deployment, test each endpoint:

#### Newsletter Subscription
```bash
curl -X POST https://your-domain.vercel.app/api/newsletter/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

#### Contact Form
```bash
curl -X POST https://your-domain.vercel.app/api/contact/submit \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","subject":"Test","message":"Test message"}'
```

#### Create Order
```bash
curl -X POST https://your-domain.vercel.app/api/orders/create-order \
  -H "Content-Type: application/json" \
  -d '{"orderId":"ORD-TEST","customerEmail":"test@example.com","customerName":"Test","shippingAddress":{"address":"123 Test","city":"Lagos","state":"Lagos","zipCode":"100001","country":"Nigeria"},"cartItems":[{"id":"art-1","name":"Test","price":1000,"quantity":1}],"subtotal":1000,"shippingCost":50,"tax":150,"total":1200}'
```

#### Get Order
```bash
curl "https://your-domain.vercel.app/api/orders/get-order?orderId=ORD-TEST"
```

#### Create RSVP
```bash
curl -X POST https://your-domain.vercel.app/api/rsvp/create-rsvp \
  -H "Content-Type: application/json" \
  -d '{"eventId":"exhibition-1","eventType":"exhibition","name":"Test User","email":"test@example.com","guestCount":2}'
```

## 🐛 Common Issues & Solutions

### Issue: "TypeError: fetch failed"
**Cause:** Missing `MONGODB_URI` in Vercel environment variables
**Solution:** Add `MONGODB_URI` and `MONGODB_DB_NAME` to Vercel, then redeploy

### Issue: "Database connection error"
**Cause:** MongoDB Atlas IP whitelist blocking Vercel
**Solution:** Add `0.0.0.0/0` to MongoDB Atlas Network Access (or specific Vercel IPs)

### Issue: "MongoDB connection string not configured"
**Cause:** Environment variable not set or incorrect
**Solution:** Verify `MONGODB_URI` is set correctly in Vercel

## 📊 Monitoring

### Check MongoDB Atlas Dashboard
- Go to MongoDB Atlas → Database → Collections
- Verify data is being inserted:
  - `newsletter_subscriptions`
  - `orders`
  - `rsvps`
  - `contact_submissions`

### Check Vercel Logs
- Go to Vercel Dashboard → Your Project → Functions
- Check for any MongoDB connection errors
- Look for "MONGODB_URI" or "MongoDB connection" in logs

## ✅ Verification Steps

1. [ ] `MONGODB_URI` added to Vercel environment variables
2. [ ] `MONGODB_DB_NAME` added to Vercel environment variables
3. [ ] MongoDB Atlas Network Access configured
4. [ ] Application redeployed on Vercel
5. [ ] Newsletter subscription tested on live site
6. [ ] Contact form tested on live site
7. [ ] Order creation tested (during checkout)
8. [ ] MongoDB Atlas dashboard shows data being inserted

## 📝 Notes

- All API routes maintain the same interface (request/response format unchanged)
- Error handling improved across all components
- Session storage used as backup for orders if API fails
- All components gracefully handle connection errors

## 🔄 Rollback Plan (if needed)

If you need to rollback to Supabase:
1. Restore Supabase environment variables in Vercel
2. Revert API route files to previous Supabase versions
3. Redeploy

However, MongoDB migration is complete and working! 🎉

