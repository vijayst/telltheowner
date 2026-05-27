-- CreateTable: User
CREATE TABLE IF NOT EXISTS "User" (
    "id" STRING NOT NULL DEFAULT gen_random_uuid(),
    "name" STRING,
    "email" STRING NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "image" STRING,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateUniqueIndex: User.email_unique
CREATE UNIQUE INDEX IF NOT EXISTS "User.email_unique" ON "User"("email");

-- CreateTable: Account
CREATE TABLE IF NOT EXISTS "Account" (
    "id" STRING NOT NULL DEFAULT gen_random_uuid(),
    "userId" STRING NOT NULL,
    "type" STRING NOT NULL,
    "provider" STRING NOT NULL,
    "providerAccountId" STRING NOT NULL,
    "refresh_token" STRING,
    "access_token" STRING,
    "expires_at" INT8,
    "token_type" STRING,
    "scope" STRING,
    "id_token" STRING,
    "session_state" STRING,
    CONSTRAINT "Account_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE
);

-- CreateUniqueIndex: Account.provider_providerAccountId_key
CREATE UNIQUE INDEX IF NOT EXISTS "Account.provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex: Account.userId_index
CREATE INDEX IF NOT EXISTS "Account.userId_index" ON "Account"("userId");

-- CreateTable: Session
CREATE TABLE IF NOT EXISTS "Session" (
    "id" STRING NOT NULL DEFAULT gen_random_uuid(),
    "sessionToken" STRING NOT NULL,
    "userId" STRING NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Session_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE
);

-- CreateUniqueIndex: Session.sessionToken_key
CREATE UNIQUE INDEX IF NOT EXISTS "Session.sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex: Session.userId_index
CREATE INDEX IF NOT EXISTS "Session.userId_index" ON "Session"("userId");

-- CreateTable: VerificationToken
CREATE TABLE IF NOT EXISTS "VerificationToken" (
    "identifier" STRING NOT NULL,
    "token" STRING NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateUniqueIndex: VerificationToken_identifier_token_key
CREATE UNIQUE INDEX IF NOT EXISTS "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateUniqueIndex: VerificationToken_token_key
CREATE UNIQUE INDEX IF NOT EXISTS "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex: VerificationToken.identifier_index
CREATE INDEX IF NOT EXISTS "VerificationToken.identifier_index" ON "VerificationToken"("identifier");