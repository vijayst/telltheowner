-- Migration: Update Review System with 24-hour Cooldown
-- This migration adds customer fingerprint tracking with time-based cooldown

-- Step 1: Add customerFingerprint column to Review table
ALTER TABLE "Review" ADD COLUMN IF NOT EXISTS "customerFingerprint" STRING NOT NULL DEFAULT '';

-- Step 2: Create index on customerFingerprint in Review table
CREATE INDEX IF NOT EXISTS "Review_customerFingerprint_idx" ON "Review"("customerFingerprint");

-- Step 3: Create index on createdAt in Review table (for time-based queries)
CREATE INDEX IF NOT EXISTS "Review_createdAt_idx" ON "Review"("createdAt");

-- Step 4: Create CustomerFingerprint table
CREATE TABLE IF NOT EXISTS "CustomerFingerprint" (
    "id" STRING NOT NULL,
    "clientId" STRING NOT NULL,
    "fingerprint" STRING NOT NULL,
    "lastSubmittedAt" TIMESTAMP(3),
    "reviewCount" INT8 NOT NULL DEFAULT 0,
    "firstSeenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    CONSTRAINT "CustomerFingerprint_pkey" PRIMARY KEY ("id", "clientId")
);

-- Step 5: Add foreign key constraint from CustomerFingerprint to Business
ALTER TABLE "CustomerFingerprint" ADD CONSTRAINT "CustomerFingerprint_clientId_fkey"
    FOREIGN KEY ("clientId") REFERENCES "Business"("clientId")
    ON DELETE CASCADE ON UPDATE CASCADE;

-- Step 6: Create unique constraint on [clientId, fingerprint] in CustomerFingerprint
CREATE UNIQUE INDEX IF NOT EXISTS "CustomerFingerprint_clientId_fingerprint_key" ON "CustomerFingerprint"("clientId", "fingerprint");

-- Step 7: Create index on fingerprint in CustomerFingerprint table
CREATE INDEX IF NOT EXISTS "CustomerFingerprint_fingerprint_idx" ON "CustomerFingerprint"("fingerprint");

-- Step 8: Update existing reviews to have empty fingerprints if they don't have one
-- This ensures data consistency for reviews created before this migration
UPDATE "Review" SET "customerFingerprint" = '' WHERE "customerFingerprint" = '';