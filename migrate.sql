-- Migration: Add online_business field to Business table
-- Run this directly against your CockroachDB database

-- Add the column if it doesn't exist
ALTER TABLE "Business" ADD COLUMN IF NOT EXISTS "isOnlineBusiness" BOOLEAN NOT NULL DEFAULT false;

-- Verify the column was added
SELECT column_name, data_type, column_default 
FROM information_schema.columns 
WHERE table_name = 'Business' AND column_name = 'isOnlineBusiness';