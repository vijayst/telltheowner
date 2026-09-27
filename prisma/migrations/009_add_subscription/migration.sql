-- Link a business to its Paddle customer and mirror subscription state.
ALTER TABLE "Business" ADD COLUMN IF NOT EXISTS "paddleCustomerId" STRING;

CREATE UNIQUE INDEX IF NOT EXISTS "Business_paddleCustomerId_key" ON "Business"("paddleCustomerId");

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

CREATE INDEX IF NOT EXISTS "Subscription_clientId_idx" ON "Subscription"("clientId");
