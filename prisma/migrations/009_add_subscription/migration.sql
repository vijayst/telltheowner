-- Link a business to its Paddle customer and mirror subscription state.
ALTER TABLE "Business" ADD COLUMN IF NOT EXISTS "paddleCustomerId" STRING;

CREATE UNIQUE INDEX IF NOT EXISTS "Business_paddleCustomerId_key" ON "Business"("paddleCustomerId");

-- A changefeed can schema-lock Subscription as soon as it exists. Later
-- statements in this migration, including a retry, have to unlock it first.
ALTER TABLE IF EXISTS "Subscription" SET (schema_locked = false);

CREATE TABLE IF NOT EXISTS "Subscription" (
    "subscriptionId" STRING NOT NULL,
    "clientId" STRING NOT NULL,
    "status" STRING NOT NULL,
    "priceId" STRING NOT NULL,
    "productId" STRING NOT NULL,
    "scheduledChangeAction" STRING,
    "scheduledChangeAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("subscriptionId"),
    CONSTRAINT "Subscription_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Business"("clientId") ON DELETE CASCADE ON UPDATE CASCADE
);

ALTER TABLE "Subscription" SET (schema_locked = false);

CREATE INDEX IF NOT EXISTS "Subscription_clientId_idx" ON "Subscription"("clientId");

ALTER TABLE "Subscription" SET (schema_locked = true);
