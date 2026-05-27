# Database Migrations Guide

This project uses Prisma ORM for database migrations with CockroachDB.

## Available Commands

### Development

```bash
# Create a new migration and apply it
npm run db:migrate:dev

# Push schema changes directly without creating a migration file
npm run db:push

# Regenerate Prisma Client after schema changes
npm run db:generate

# Reset database and reapply all migrations
npm run db:migrate:reset

# Open Prisma Studio to view/edit data
npm run db:studio
```

### Production

```bash
# Apply all pending migrations in production
npm run db:migrate:deploy
```

## When to Use Each Command

### `npm run db:migrate:dev`
- **Use in development** when making schema changes
- Creates a new migration file based on schema changes
- Applies the migration to the database
- Generates Prisma Client
- **Best for team development** - tracks migration history

### `npm run db:push`
- **Use for prototyping** or when you don't need migration history
- Pushes schema directly to database without creating a migration file
- Faster than `migrate dev`
- **Not recommended for production** - no rollback capability

### `npm run db:migrate:deploy`
- **Use in production** to apply migrations
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

### Automatic (Recommended)

1. Make changes to `prisma/schema.prisma`
2. Run: `npm run db:migrate:dev`
3. Prisma will generate a migration file automatically
4. Review and edit the migration if needed

### Manual

1. Create a new directory in `prisma/migrations/` with a descriptive name
2. Create a `migration.sql` file with your SQL
3. Make it idempotent using `IF NOT EXISTS`
4. Run: `npm run db:migrate:apply`

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

**Option 1: Reset database (development only)**
```bash
npm run db:migrate:reset
```

**Option 2: Create a baseline migration**
```bash
npm run db:migrate:dev --name baseline
```

**Option 3: Use db:push to sync schema**
```bash
npm run db:push
```

### Migration Already Applied

If a migration fails because it's already applied:
1. Check `prisma/migrations/_prisma_migrations` table
2. Or use the manual apply command: `npm run db:migrate:apply`

### Prisma Client Outdated

If you see type errors after schema changes:
```bash
npm run db:generate
```

## Production Deployment Workflow

1. Make schema changes locally
2. Create migration: `npm run db:migrate:dev --name describe_change`
3. Test migration locally
4. Commit migration files
5. Deploy code
6. Apply migrations in production: `npm run db:migrate:deploy`
7. Generate Prisma Client: `npm run db:generate`

## Example Workflow

```bash
# 1. Add a new field to User model in prisma/schema.prisma
#    phone String? @unique

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