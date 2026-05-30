# Migration: Add Demo Business

## Overview

This migration creates a demo business that can be used for public demonstration of the review system.

## What This Migration Does

### 1. Creates Demo Business Record

```sql
INSERT INTO "Business" (clientId, businessName, businessAddress, createdAt, updatedAt)
VALUES ('demo', 'Demo Business', '123 Demo Street, Demo City, DC 12345', NOW(), NOW())
```

### 2. Conflict Handling

Uses `ON CONFLICT (clientId)` to update the demo business if it already exists, ensuring the demo data is always current.

## Demo Business Details

- **Client ID**: `demo`
- **Business Name**: `Demo Business`
- **Address**: `123 Demo Street, Demo City, DC 12345`

## Public Access

The demo business is designed to be publicly accessible:

1. **Public QR Code Page**: `/product/review-demo`
   - Shows the QR code for the demo business
   - Anyone can view and scan the QR code
   - Links to the review form

2. **Public Review Wall**: `/product/review-wall-demo`
   - Shows all reviews for the demo business
   - No authentication required
   - Paginated display with customizable page sizes (20, 50, 100)
   - Sorted by submission date (newest first)

3. **Review Form**: `/b/demo/review`
   - Publicly accessible review submission form
   - Uses the same review submission API
   - Applies 24-hour cooldown based on browser fingerprint

## Footer Links

The footer component includes links to:
- **Product / Review Demo**: `/product/review-demo`
- **Product / Review Wall Demo**: `/product/review-wall-demo`

These links appear on all pages that use the Footer component.

## API Changes

### `/api/reviews` Route

Modified to support public access for demo reviews:

```typescript
// Public access for demo (no auth required)
GET /api/reviews?clientId=demo&page=1&pageSize=20

// Authenticated access for regular businesses
GET /api/reviews (requires authentication)
```

The route checks for a `clientId` parameter. If it equals `"demo"`, it returns reviews without requiring authentication.

## Deployment

Apply the migration:

```bash
npm run db:migrate:deploy
```

## Post-Migration Steps

1. ✅ Migration file created
2. ✅ Public QR code page created
3. ✅ Public review wall page created
4. ✅ Footer component created with demo links
5. ✅ Reviews API updated to support public demo access
6. ⏳ Deploy migration to create demo business in database
7. ⏳ Test demo pages after deployment

## Testing

After deployment, test the following:

1. Visit `/product/review-demo` - should show QR code
2. Visit `/product/review-wall-demo` - should show review wall (empty initially)
3. Submit a review via `/b/demo/review` - should work without login
4. Check review wall - should show the submitted review
5. Try submitting another review within 24 hours - should show cooldown message

## Benefits

✅ **Easy demonstration** - No account creation needed
✅ **Public accessibility** - Anyone can view and use
✅ **Real functionality** - Shows actual review submission flow
✅ **Separate from production** - Demo business doesn't affect real businesses
✅ **Footer integration** - Easy access from any page

## Notes

- The demo business uses the same database schema as regular businesses
- Reviews submitted to the demo business persist in the database
- The 24-hour cooldown system applies to the demo business
- Demo reviews are visible to anyone who visits the review wall page
- No authentication is required to view or submit demo reviews