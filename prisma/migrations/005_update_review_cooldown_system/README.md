# Migration: Update Review System with 24-Hour Cooldown

## Overview

This migration implements a 24-hour cooldown system for customer reviews, allowing customers to submit one review per day per business while preventing spam from repeated submissions.

## Migration Type

**Manual Migration** - This migration was created manually with hand-written SQL for full control over database changes and to avoid database resets.

## What This Migration Does

### Schema Changes

1. **Review Table Updates:**
   - Adds `customerFingerprint` column (STRING) to track which customer submitted each review
   - Creates index on `customerFingerprint` for efficient queries
   - Creates index on `createdAt` for time-based queries

2. **CustomerFingerprint Table:**
   - Creates new table to track customer fingerprints per business
   - Fields:
     - `id` (STRING): Primary key
     - `clientId` (STRING): Foreign key to Business table
     - `fingerprint` (STRING): Browser/device fingerprint
     - `lastSubmittedAt` (TIMESTAMP): When this customer last submitted a review
     - `reviewCount` (INT): Total number of reviews submitted by this customer
     - `firstSeenAt` (TIMESTAMP): When this customer was first seen
   - Unique constraint on `[clientId, fingerprint]` - one record per customer per business
   - Foreign key constraint to Business table (CASCADE delete)

### Business Logic Changes

After this migration, the review system will:

- **Allow customers** to submit one review every 24 hours per business
- **Prevent spam** by blocking submissions within the 24-hour window
- **Show countdown** messages when cooldown is active (e.g., "Please wait 5 hours before submitting another review")
- **Track customer history** with fingerprint-based identification
- **Support multi-day visits** - regular customers can leave reviews on different days

## How to Apply the Migration

### For Local Development

```bash
# Deploy the migration to your local database
npm run db:migrate:deploy
```

### For Production Deployment

```bash
# Deploy the migration to your production database
npm run db:migrate:deploy
```

This command applies all pending migrations that have been created but not yet deployed to the database.

## Migration Steps

The migration executes these steps in order:

1. ✅ Add `customerFingerprint` column to Review table
2. ✅ Create index on `customerFingerprint` in Review table
3. ✅ Create index on `createdAt` in Review table
4. ✅ Create CustomerFingerprint table
5. ✅ Add foreign key constraint to Business table
6. ✅ Create unique constraint on `[clientId, fingerprint]`
7. ✅ Create index on `fingerprint` column
8. ✅ Update existing reviews with empty fingerprints

## Post-Migration Steps

After the migration succeeds, you need to:

### 1. Regenerate Prisma Client

```bash
npm run db:generate
```

This updates the TypeScript types and Prisma client to match the new schema.

### 2. Restart the Development Server

```bash
npm run dev
```

### 3. Test the System

1. Navigate to a review page: `/b/[clientId]/review`
2. Submit a review using the voice recording interface
3. Try submitting again immediately - you should see a cooldown error
4. Wait 24 hours (or modify `lastSubmittedAt` in the database for testing)
5. Submit another review - it should work

## Verification

### Check Table Structure

```bash
# Using Prisma Studio
npm run db:studio

# Or using SQL
# Connect to your database and run:
\d Review
\d CustomerFingerprint
```

### Check Indexes

```sql
-- Check Review table indexes
SHOW INDEXES FROM Review;

-- Check CustomerFingerprint table indexes
SHOW INDEXES FROM CustomerFingerprint;
```

### Test API Endpoint

```bash
# Submit a review
curl -X POST http://localhost:3000/api/b/your-client-id/review \
  -F "fingerprint=test-fingerprint-123" \
  -F "audio=@test-audio.mp3"

# Try submitting again (should get 429 status)
curl -X POST http://localhost:3000/api/b/your-client-id/review \
  -F "fingerprint=test-fingerprint-123" \
  -F "audio=@test-audio.mp3"
```

## Rollback

If you need to rollback this migration:

```sql
-- Drop indexes
DROP INDEX IF EXISTS "Review_customerFingerprint_idx";
DROP INDEX IF EXISTS "Review_createdAt_idx";
DROP INDEX IF EXISTS "CustomerFingerprint_fingerprint_idx";
DROP INDEX IF EXISTS "CustomerFingerprint_clientId_fingerprint_key";

-- Drop foreign key
ALTER TABLE "CustomerFingerprint" DROP CONSTRAINT IF EXISTS "CustomerFingerprint_clientId_fkey";

-- Drop tables
DROP TABLE IF EXISTS "CustomerFingerprint";
```

Then remove the `customerFingerprint` column from the Review table:

```sql
ALTER TABLE "Review" DROP COLUMN IF EXISTS "customerFingerprint";
```

## Troubleshooting

### Error: "column already exists"

This is expected and will be skipped automatically. The migration is idempotent.

### Error: "relation already exists"

This means the table already exists and will be skipped. Safe to continue.

### Error: "constraint already exists"

This means the constraint is already in place. Safe to continue.

### Error: Migration Fails Partway Through

If the migration fails partway through, it will skip steps that have already been applied. You can safely run `npm run db:migrate:deploy` again to complete the migration.

### Prisma Client Errors After Migration

Make sure to regenerate the Prisma client:

```bash
npm run db:generate
```

If you still see errors, clear the build cache:

```bash
rm -rf .next
rm -rf src/generated/prisma
npm run db:generate
```

## Technical Details

### Browser Fingerprinting

The system uses browser fingerprinting to identify customers:

- **What it collects:** User agent, screen resolution, timezone, language, platform, CPU cores, device memory
- **Storage:** Stored in localStorage for persistence
- **Privacy:** No personal data collected, only browser characteristics
- **Collision Rate:** Very low - highly unlikely for two different customers to have the same fingerprint

### 24-Hour Cooldown Logic

The API endpoint calculates hours since last submission:

```typescript
const hoursSinceLastSubmission = (Date.now() - lastSubmissionAt.getTime()) / (1000 * 60 * 60);

if (hoursSinceLastSubmission < 24) {
  const hoursRemaining = Math.ceil(24 - hoursSinceLastSubmission);
  return error(`Please wait ${hoursRemaining} hour(s) before submitting another review`);
}
```

### Database Schema

**Review Table:**
```prisma
model Review {
  id              String   @id @default(cuid())
  clientId        String
  text            String
  visibility      Boolean  @default(false)
  customerFingerprint String  // NEW
  createdAt       DateTime @default(now())

  business Business @relation(fields: [clientId], references: [clientId], onDelete: Cascade)

  @@index([clientId])
  @@index([customerFingerprint])  // NEW
  @@index([createdAt])            // NEW
}
```

**CustomerFingerprint Table (NEW):**
```prisma
model CustomerFingerprint {
  id                    String   @id @default(cuid())
  clientId              String
  fingerprint           String
  lastSubmittedAt       DateTime? // NEW
  reviewCount           Int      @default(0) // NEW
  firstSeenAt           DateTime @default(now())

  @@unique([clientId, fingerprint])
  @@index([fingerprint])
}
```

## Related Documentation

- [REVIEW_SYSTEM.md](../../REVIEW_SYSTEM.md) - Complete review system documentation
- [prisma/schema.prisma](../../prisma/schema.prisma) - Database schema
- [src/app/api/b/[clientId]/review/route.ts](../../src/app/api/b/[clientId]/review/route.ts) - Review API endpoint
- [src/lib/fingerprint.ts](../../src/lib/fingerprint.ts) - Fingerprint generation logic

## Support

If you encounter issues:

1. Check the terminal output for specific error messages
2. Verify your `DATABASE_URL` is set correctly in `.env`
3. Ensure you have write permissions on the database
4. Check CockroachDB is running and accessible

## Future Enhancements

Potential improvements to consider:

- Configurable cooldown period per business
- Review moderation workflow
- Abuse detection for suspicious patterns
- CAPTCHA for high-abuse environments
- Rate limiting per IP address