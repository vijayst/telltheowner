-- Add demo business for public access
INSERT INTO "Business" ("clientId", "businessName", "businessAddress", "createdAt", "updatedAt")
VALUES ('demo', 'Demo Business', '123 Demo Street, Demo City, DC 12345', NOW(), NOW())
ON CONFLICT ("clientId") DO UPDATE SET
  "businessName" = EXCLUDED."businessName",
  "businessAddress" = EXCLUDED."businessAddress",
  "updatedAt" = NOW();