-- Add online_business field to Business table
ALTER TABLE "Business" ADD COLUMN IF NOT EXISTS "isOnlineBusiness" BOOLEAN NOT NULL DEFAULT false;

-- Update existing businesses to set online_business to false by default
-- (This is handled by the DEFAULT clause above, so no explicit UPDATE needed)