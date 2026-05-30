# Database Migrations Guide

This project uses Prisma ORM for database migrations with CockroachDB using **manual migration SQL generation** for full control and database safety.

## Available Commands

```bash
# Deploy migrations (applies all pending migrations)
npm run db:migrate:deploy

# Push schema changes directly without creating a migration file
npm run db:push

# Regenerate Prisma Client after schema changes
npm run db:generate

# Reset database and reapply all migrations
npm run db:migrate:reset

# Open Prisma Studio to view/edit data
npm run db:studio
```

## Migration History

### Migration 001_init
- Created `Business` table with `clientId` as STRING type
- Allows any string value for client ID (e.g., starbucks-485-bloor-st)

### Migration 002_add_auth_tables
- Created authentication tables for Auth.js
- Added `User`, `Account`, `Session`, `VerificationToken` tables
- Configured foreign keys and indexes for auth relationships

### Migration 003_add_business_user_table
- Created `BusinessUser` table for linking users to businesses
- Supports multiple business owners and admins per business
- Includes role field (owner, admin, member)

### Migration 004_add_review_table
- Created `Review` table for customer reviews
- Links reviews to businesses via `clientId`
- Includes text content and visibility settings
- Created indexes for efficient queries

### Migration 005_update_review_cooldown_system
- Added `customerFingerprint` column to Review table
- Created `CustomerFingerprint` table for tracking customer submissions
- Implemented 24-hour cooldown system to prevent spam
- Added indexes for time-based queries
- Allows customers to submit one review per 24 hours per business

## When to Use Each Command

### `npm run db:migrate:deploy`
- **Use for all deployments** (development and production)
- Applies all pending migrations to the database
- Idempotent - safe to run multiple times
- Tracks migration history in `_prisma_migrations` table
- **Recommended for all scenarios** - safe and reliable

### `npm run db:push`
- **Use for prototyping** or when you don't need migration history
- Pushes schema directly to database without creating a migration file
- Faster than migrations
- **Not recommended for production** - no rollback capability
- **Use with caution** - bypasses migration tracking

### `npm run db:migrate:reset`
- **Use only in development** to reset the database
- Drops all tables and reapplies all migrations
- **Destructive** - deletes all data
- Never use in production

## Creating New Migrations

### Manual Migration Process (Recommended)

1. **Update the schema** in `prisma/schema.prisma`

2. **Create migration directory** with sequential number:
   ```bash
   mkdir -p prisma/migrations/006_your_migration_name
   ```

3. **Create migration SQL file**:
   ```bash
   touch prisma/migrations/006_your_migration_name/migration.sql
   ```

4. **Write your SQL** in the migration file:
   ```sql
   -- Use IF NOT EXISTS for idempotency
   CREATE TABLE IF NOT EXISTS "YourTable" (...);
   CREATE INDEX IF NOT EXISTS "idx_name" ON "YourTable"("column");
   ```

5. **Deploy the migration**:
   ```bash
   npm run db:migrate:deploy
   ```

6. **Regenerate Prisma Client**:
   ```bash
   npm run db:generate
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

## Idempotent Migrations

All migrations in this project are idempotent - they can be run multiple times safely without errors.

**Key patterns:**
- `CREATE TABLE IF NOT EXISTS`
- `CREATE UNIQUE INDEX IF NOT EXISTS`
- `CREATE OR REPLACE FUNCTION`
- `DROP TRIGGER IF EXISTS` before `CREATE TRIGGER`
- `ALTER TABLE ... ADD COLUMN IF NOT EXISTS`

## Troubleshooting

### Migration Drift Detected

If you see "drift detected" errors, it means your database doesn't match migration history:

**Option 1: Apply missing migrations**
```bash
npm run db:migrate:deploy
```

**Option 2: Reset database (development only)**
```bash
npm run db:migrate:reset
```

**Option 3: Use db:push to sync schema (use with caution)**
```bash
npm run db:push
```

### Migration Already Applied

If a migration fails because it's already applied, this is normal. `db:migrate:deploy` will skip it automatically.

### Prisma Client Outdated

If you see type errors after schema changes:
```bash
npm run db:generate
```

## Production Deployment Workflow

1. **Update schema** in `prisma/schema.prisma`
2. **Create migration directory**: `mkdir -p prisma/migrations/006_your_migration_name`
3. **Write migration SQL** in `prisma/migrations/006_your_migration_name/migration.sql`
4. **Test migration locally**: `npm run db:migrate:deploy`
5. **Regenerate Prisma Client**: `npm run db:generate`
6. **Test your changes**: `npm run dev`
7. **Commit migration files** to Git
8. **Deploy code** to production
9. **Apply migrations in production**: `npm run db:migrate:deploy`
10. **Generate Prisma Client in production**: `npm run db:generate`

## Example Workflow

```bash
# 1. Add a new field to User model in prisma/schema.prisma
#    phone String? @unique

# 2. Create migration directory
mkdir -p prisma/migrations/006_add_user_phone

# 3. Create migration SQL file with CockroachDB syntax
#    prisma/migrations/006_add_user_phone/migration.sql:
#    ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "phone" STRING;
#    CREATE UNIQUE INDEX IF NOT EXISTS "User_phone_key" ON "User"("phone");

# 4. Deploy migration
npm run db:migrate:deploy

# 5. Regenerate Prisma Client
npm run db:generate

# 6. Test your changes
npm run dev

# 7. Commit changes
git add prisma/
git commit -m "Add phone field to User model"

# 8. Deploy to production
# After deployment:
npm run db:migrate:deploy
npm run db:generate
```

## CockroachDB SQL Tips

### Data Types
- Use `STRING` instead of `VARCHAR`
- Use `BOOL` instead of `BOOLEAN`
- Use `INT8` instead of `BIGINT`
- Use `TIMESTAMP(3)` for timestamps with milliseconds

### Primary Keys
- Use composite primary keys with `clientId` for multi-tenant apps
- Example: `PRIMARY KEY ("id", "clientId")`

### Foreign Keys
- Always use `ON DELETE CASCADE` for clean deletions
- Include `ON UPDATE CASCADE` for consistency

## Why Manual Migrations?

✅ **Full control** - You write exact SQL commands
✅ **Database safety** - No risk of accidental database resets
✅ **Explicit changes** - You know exactly what SQL is being executed
✅ **Version control friendly** - SQL files are easy to review and diff
✅ **Production safe** - Same command for development and production
✅ **No schema drift** - Migrations are predictable and reproducible
- Applies all pending migrations without creating new ones
- Requires migration files to exist in `prisma/migrations/`
- Does not generate Prisma Client (use `db:generate` after)

### `npm run db:migrate:apply`
- **Use to apply existing idempotent migration files**
- Runs migrations created manually in `prisma/migrations/`
- Useful for initial database setup or troubleshooting
- Can be run multiple times safely (migrations are idempotent)

### `npm run db:migrate:reset`
- **Use to reset database** in development
- Drops all tables and reapplies all migrations
- **Never use in production** - will delete all data

## Migration Files

Migrations are stored in `prisma/migrations/` with the following structure:

```
prisma/
├── migrations/
│   ├── 001_init/
│   │   └── migration.sql    # Business table
│   └── 002_add_auth_tables/
│       └── migration.sql    # Auth tables (User, Account, Session, VerificationToken)
└── schema.prisma
```

## Creating New Migrations

### Manual Migration Process

1. **Update the schema** in `prisma/schema.prisma`

2. **Create migration directory** with sequential number:
   ```bash
   mkdir -p prisma/migrations/006_your_migration_name
   ```

3. **Create migration SQL file**:
   ```bash
   touch prisma/migrations/006_your_migration_name/migration.sql
   ```

4. **Write your SQL** in the migration file:
   ```sql
   -- Use IF NOT EXISTS for idempotency
   CREATE TABLE IF NOT EXISTS "YourTable" (...);
   CREATE INDEX IF NOT EXISTS "idx_name" ON "YourTable"("column");
   ```

5. **Deploy the migration**:
   ```bash
   npm run db:migrate:deploy
   ```

6. **Regenerate Prisma Client**:
   ```bash
   npm run db:generate
   ```

## Idempotent Migrations

All migrations in this project are idempotent - they can be run multiple times safely without errors.

**Key patterns:**
- `CREATE TABLE IF NOT EXISTS`
- `CREATE UNIQUE INDEX IF NOT EXISTS`
- `CREATE OR REPLACE FUNCTION`
- `DROP TRIGGER IF EXISTS` before `CREATE TRIGGER`

## Troubleshooting

### Migration Drift Detected

If you see "drift detected" errors, it means your database doesn't match migration history:

**Option 1: Apply missing migrations**
```bash
npm run db:migrate:deploy
```

**Option 2: Reset database (development only)**
```bash
npm run db:migrate:reset
```

**Option 3: Use db:push to sync schema (use with caution)**
```bash
npm run db:push
```

### Migration Already Applied

If a migration fails because it's already applied, this is normal. `db:migrate:deploy` will skip it automatically.
1. Check `prisma/migrations/_prisma_migrations` table
2. Or use the manual apply command: `npm run db:migrate:apply`

### Prisma Client Outdated

If you see type errors after schema changes:
```bash
npm run db:generate
```

## Production Deployment Workflow

1. **Update schema** in `prisma/schema.prisma`
2. **Create migration directory**: `mkdir -p prisma/migrations/006_your_migration_name`
3. **Write migration SQL** in `prisma/migrations/006_your_migration_name/migration.sql`
4. **Test migration locally**: `npm run db:migrate:deploy`
5. **Regenerate Prisma Client**: `npm run db:generate`
6. **Test your changes**: `npm run dev`
7. **Commit migration files** to Git
8. **Deploy code** to production
9. **Apply migrations in production**: `npm run db:migrate:deploy`
10. **Generate Prisma Client in production**: `npm run db:generate`

## Example Workflow

```bash
# 1. Add a new field to User model in prisma/schema.prisma
#    phone String? @unique

# 2. Create migration directory
mkdir -p prisma/migrations/006_add_user_phone

# 3. Create migration SQL file with CockroachDB syntax
#    prisma/migrations/006_add_user_phone/migration.sql:
#    ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "phone" STRING;
#    CREATE UNIQUE INDEX IF NOT EXISTS "User_phone_key" ON "User"("phone");

# 4. Deploy migration
npm run db:migrate:deploy

# 5. Regenerate Prisma Client
npm run db:generate

# 6. Test your changes
npm run dev

# 7. Commit changes
git add prisma/
git commit -m "Add phone field to User model"

# 8. Deploy to production
# After deployment:
npm run db:migrate:deploy
npm run db:generate
```

# 2. Create and apply migration
npm run db:migrate:dev --name add_user_phone

# 3. Test your changes
npm run dev

# 4. Commit changes
git add prisma/
git commit -m "Add phone field to User model"

# 5. Deploy to production
# After deployment:
npm run db:migrate:deploy
npm run db:generate
```

## Current Migrations

- **001_init**: Creates Business table
- **002_add_auth_tables**: Creates authentication tables (User, Account, Session, VerificationToken) with indexes

## CockroachDB Specific Notes

### ⚠️ Triggers NOT Supported

**CockroachDB does not support SQL triggers at all.** The `CREATE TRIGGER` statement is only available through CockroachDB's declarative schema changer, which is a different system not accessible via standard SQL.

### How Timestamp Updates Work

Since CockroachDB doesn't support triggers, all timestamp updates must be handled in the application code:

**Required: Application-level updates**
```typescript
import { prisma } from '@/lib/prisma';

// ALWAYS include updatedAt when updating records
await prisma.business.update({
  where: { clientId },
  data: {
    businessName: "New Name",
    updatedAt: new Date() // Required - timestamp must be updated manually
  }
});

// Same for User model
await prisma.user.update({
  where: { id: userId },
  data: {
    name: "New Name",
    updatedAt: new Date() // Required
  }
});
```

### Schema Differences

The Prisma schema uses `@updatedAt` directive, but this doesn't work in CockroachDB. Instead:

1. **Schema**: Uses `@default(now())` for `updatedAt` (sets on creation only)
2. **Application**: Must manually update `updatedAt` on every update operation

### Best Practices

1. **Always update timestamps in application code**
   - Never rely on automatic timestamp updates
   - Always include `updatedAt: new Date()` in update operations

2. **Use a helper function** (Recommended)
   ```typescript
   // Create a helper to ensure timestamps are always updated
   export function withTimestamp<T extends Record<string, any>>(data: T) {
     return {
       ...data,
       updatedAt: new Date()
     };
   }

   // Usage
   await prisma.business.update({
     where: { clientId },
     data: withTimestamp({ businessName: "New Name" })
   });
   ```

3. **Consider using Prisma middleware** (Advanced)
   ```typescript
   // Automatically update updatedAt for all models
   prisma.$use(async (params, next) => {
     if (params.action === 'update' || params.action === 'updateMany') {
       params.args.data = params.args.data || {};
       if ('updatedAt' in params.args.model.fields) {
         params.args.data.updatedAt = new Date();
       }
     }
     return next(params);
   });
   ```

### Transaction Handling

When applying migrations to CockroachDB:
- Each schema statement should be in its own transaction
- The migration script handles this automatically
- All migrations are idempotent and can be run multiple times

## Database Provider

This project uses **CockroachDB** via PostgreSQL protocol. All PostgreSQL features used are compatible with CockroachDB.

**Important limitations:**
- ❌ `@db.Text` - Not supported, use regular `String`
- ❌ `CREATE TRIGGER` - Not supported at all (requires declarative schema changer)
- ❌ Triggers for automatic timestamp updates - Not supported
- ✅ Functions and procedures - Supported
- ✅ `CREATE OR REPLACE FUNCTION` - Supported
- ✅ Indexes - Supported