-- Add Review table
CREATE TABLE "Review" (
    "id" STRING NOT NULL,
    "clientId" STRING NOT NULL,
    "text" STRING(65536) NOT NULL,
    "visibility" BOOL NOT NULL DEFAULT FALSE,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    CONSTRAINT "Review_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Business"("clientId") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Review_pkey" PRIMARY KEY ("id", "clientId")
);

-- Create index on clientId
CREATE INDEX "Review_clientId_idx" ON "Review"("clientId");