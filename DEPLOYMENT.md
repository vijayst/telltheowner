# Migration Deployment Guide

## Overview

This project uses **Prisma Migrate** for database schema changes with **manual migration SQL generation**. All migrations are deployed using the standard Prisma `db:migrate:deploy` command.

## Migration Creation Process

### Step 1: Update Prisma Schema

First, update your schema in [prisma/schema.prisma](prisma/schema.prisma):

```prisma
// Add new models, update existing models, etc.
model YourModel {
  id    String @id @default(cuid())
  field String
}
```

### Step 2: Generate Migration SQL (Manual)

Create a new migration directory manually:

```bash
mkdir -p prisma/migrations/006_your_migration_name
```

Then create the migration SQL file:

```bash
touch prisma/migrations/006_your_migration_name/migration.sql
```

Write your SQL migration commands in the file. Example:

```sql
-- Create your migration SQL here
CREATE TABLE "YourModel" (
    "id" STRING NOT NULL,
    "field" STRING NOT NULL,
    CONSTRAINT "YourModel_pkey" PRIMARY KEY ("id")
);
```

**Important:** Always check existing migrations for syntax patterns and CockroachDB specifics.

### Step 3: Deploy the Migration

```bash
# Deploy the migration to your database
npm run db:migrate:deploy
```

This will:
- Apply your migration to the database
- Update the `_prisma_migrations` tracking table
- Mark the migration as successfully applied

### Step 4: Regenerate Prisma Client

After deploying the migration, regenerate the Prisma client to update TypeScript types:

```bash
npm run db:generate
```

## Deployment Process

### For Local Development

When creating a new migration manually:

1. Update `prisma/schema.prisma` with your schema changes
2. Create migration directory: `prisma/migrations/006_your_migration_name/`
3. Create `migration.sql` file with your SQL commands
4. Deploy: `npm run db:migrate:deploy`
5. Regenerate client: `npm run db:generate`

### For Production Deployment

When deploying to production:

```bash
# Deploy all pending migrations
npm run db:migrate:deploy
```

This command:
1. Reads all migration files from `prisma/migrations/`
2. Checks which migrations have already been applied (from `_prisma_migrations` table)
3. Applies only the pending migrations that haven't been deployed yet
4. Updates the `_prisma_migrations` table with the newly applied migrations

## Important Notes

### Manual Migration Benefits

✅ **Full control** - You write exact SQL commands
✅ **No database resets** - Avoids `db:migrate:dev` which can reset your database
✅ **Explicit changes** - You know exactly what SQL is being executed
✅ **Database safety** - Production database is never modified during development
✅ **Version control friendly** - SQL files are easy to review and diff

### Migration Numbering

Use sequential numbering with descriptive names:

```bash
006_add_user_preferences/
007_add_order_tracking/
008_update_review_indexes/
```

Check existing migrations to find the next number:

```bash
ls -la prisma/migrations/
```

## Deployment Workflow

### 1. Development Phase

```bash
# Developer updates schema
# Edit prisma/schema.prisma

# Developer creates migration directory
mkdir -p prisma/migrations/006_add_new_feature

# Developer writes migration SQL
# Edit prisma/migrations/006_add_new_feature/migration.sql

# Developer deploys locally
npm run db:migrate:deploy

# Developer regenerates client
npm run db:generate

# Developer tests the application
npm run dev
```

### 2. Code Review Phase

- Migration file is committed to Git
- Code is reviewed (both schema and SQL)
- Changes are merged to main branch

### 3. Deployment Phase

```bash
# Deploy application to production
git pull
npm install

# Apply database migrations
npm run db:migrate:deploy

# Regenerate Prisma client
npm run db:generate

# Start the application
npm run build
npm start
```

## Migration File Structure

```
prisma/migrations/
├── 001_init/
│   └── migration.sql
├── 002_add_auth_tables/
│   └── migration.sql
├── 003_add_business_user_table/
│   └── migration.sql
├── 004_add_review_table/
│   └── migration.sql
├── 005_update_review_cooldown_system/
│   ├── migration.sql
│   └── README.md
└── 006_your_migration_name/
    └── migration.sql
```

## SQL Migration Examples

### Adding a New Table

```sql
-- Create new table
CREATE TABLE "YourModel" (
    "id" STRING NOT NULL,
    "clientId" STRING NOT NULL,
    "name" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    CONSTRAINT "YourModel_pkey" PRIMARY KEY ("id", "clientId"),
    CONSTRAINT "YourModel_clientId_fkey" FOREIGN KEY ("clientId")
        REFERENCES "Business"("clientId")
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- Create index
CREATE INDEX "YourModel_clientId_idx" ON "YourModel"("clientId");
```

### Adding a Column to Existing Table

```sql
-- Add new column
ALTER TABLE "Review" ADD COLUMN IF NOT EXISTS "newField" STRING;

-- Create index on new column
CREATE INDEX IF NOT EXISTS "Review_newField_idx" ON "Review"("newField");
```

### Updating a Column

```sql
-- Drop old column
ALTER TABLE "Review" DROP COLUMN IF EXISTS "oldField";

-- Add new column
ALTER TABLE "Review" ADD COLUMN "newField" STRING;
```

### Creating Indexes

```sql
-- Single column index
CREATE INDEX IF NOT EXISTS "Review_customerId_idx" ON "Review"("clientId");

-- Composite index
CREATE INDEX IF NOT EXISTS "Review_status_created_idx" ON "Review"("status", "createdAt");

-- Unique index
CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"("email");
```

### Creating Foreign Keys

```sql
-- Add foreign key constraint
ALTER TABLE "Review" ADD CONSTRAINT "Review_clientId_fkey"
    FOREIGN KEY ("clientId")
    REFERENCES "Business"("clientId")
    ON DELETE CASCADE ON UPDATE CASCADE;
```

## Best Practices

### 1. Use IF NOT EXISTS

Make your migrations idempotent:

```sql
-- Good
CREATE TABLE IF NOT EXISTS "YourModel" (...);
CREATE INDEX IF NOT EXISTS "idx_name" ON "YourModel"("field");

-- Avoid
CREATE TABLE "YourModel" (...);  -- Will fail if table exists
CREATE INDEX "idx_name" ON "YourModel"("field");  -- Will fail if index exists
```

### 2. Check Existing Migrations

Always review existing migrations for syntax patterns:

```bash
# Check similar migrations
cat prisma/migrations/004_add_review_table/migration.sql
cat prisma/migrations/005_update_review_cooldown_system/migration.sql
```

### 3. Test SQL Locally

Before committing, test your SQL:

```bash
# Connect to your database and run the SQL manually
psql $DATABASE_URL

# Or use a database GUI tool to test
npm run db:studio
```

### 4. Document Complex Migrations

For complex migrations, add a README.md file:

```
prisma/migrations/006_update_review_system/
├── migration.sql
└── README.md  (Documents what this migration does and why)
```

### 5. Keep Migrations Focused

Each migration should do one thing:
- ✅ Good: `006_add_user_preferences`
- ❌ Bad: `006_add_users_and_reviews_and_orders`

### 6. Backwards Compatibility

When possible, maintain backwards compatibility:
- Add new columns with default values
- Don't drop columns used by existing code
- Use feature flags when making breaking changes

## CockroachDB Specifics

### Data Types

```sql
-- Use STRING instead of VARCHAR
"email" STRING NOT NULL

-- Use BOOL instead of BOOLEAN
"isActive" BOOL NOT NULL DEFAULT TRUE

-- Use INT8 instead of BIGINT
"count" INT8 NOT NULL DEFAULT 0

-- Use TIMESTAMP(3) for timestamps
"createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP()
```

### Primary Keys

CockroachDB requires composite primary keys with `clientId`:

```sql
-- Good (composite with clientId)
CONSTRAINT "YourModel_pkey" PRIMARY KEY ("id", "clientId")

-- Bad (single column)
CONSTRAINT "YourModel_pkey" PRIMARY KEY ("id")
```

### Transactions

CockroachDB requires schema changes in transactions. Always use:

```sql
BEGIN;
-- Your SQL commands
COMMIT;
```

However, `db:migrate:deploy` handles this automatically for migration files.

## Troubleshooting

### Migration Fails

If `npm run db:migrate:deploy` fails:

1. Check the error message for specific SQL syntax issues
2. Verify CockroachDB-specific syntax
3. Check if the migration has already been applied:
   ```sql
   SELECT * FROM _prisma_migrations;
   ```
4. Test the SQL manually in a database client
5. Fix the SQL in the migration file
6. Run `npm run db:migrate:deploy` again

### Migration Already Applied

If you see "migration already applied" errors, this is normal. `db:migrate:deploy` will skip migrations that have already been applied.

### Schema Drift

If `prisma/schema.prisma` and database are out of sync:

1. Check which migrations have been applied:
   ```sql
   SELECT * FROM _prisma_migrations ORDER BY migration_name;
   ```
2. Ensure schema matches applied migrations
3. Apply any missing migrations with `npm run db:migrate:deploy`
4. Regenerate Prisma client: `npm run db:generate`

### SQL Syntax Errors

Common CockroachDB SQL issues:

- Use `STRING` not `VARCHAR`
- Use `BOOL` not `BOOLEAN`
- Use `INT8` not `BIGINT`
- Use `CURRENT_TIMESTAMP()` with parentheses
- Composite primary keys with `clientId`

## Related Commands

| Command | Purpose |
|---------|---------|
| `npm run db:migrate:deploy` | Deploy migrations (production & local) |
| `npm run db:migrate:reset` | Reset database and reapply all migrations (destructive) |
| `npm run db:push` | Push schema changes without creating migration (use with caution) |
| `npm run db:generate` | Generate Prisma client from schema |
| `npm run db:studio` | Open Prisma Studio to view database |

## Quick Reference

### Create a New Migration

```bash
# 1. Update schema.prisma
# Edit prisma/schema.prisma

# 2. Create migration directory
mkdir -p prisma/migrations/006_your_migration_name

# 3. Create migration SQL file
touch prisma/migrations/006_your_migration_name/migration.sql

# 4. Write SQL in migration.sql
# Edit prisma/migrations/006_your_migration_name/migration.sql

# 5. Deploy migration
npm run db:migrate:deploy

# 6. Regenerate Prisma client
npm run db:generate
```

### Deploy to Production

```bash
# Deploy all pending migrations
npm run db:migrate:deploy

# Regenerate Prisma client
npm run db:generate

# Start application
npm run build
npm start
```

## Summary

- **Manual migrations** - Write SQL yourself for full control
- **No database resets** - Avoid `db:migrate:dev` to protect your data
- **One deployment command** - Use `npm run db:migrate:deploy` everywhere
- **Version control** - Commit migration files to Git
- **Test locally** - Always test migrations before deploying to production
- **Idempotent SQL** - Use `IF NOT EXISTS` for safety

This approach gives you complete control over your database schema evolution while keeping your data safe.