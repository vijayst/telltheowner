# Migration 008: Add Online Business Field

## Description
This migration adds the `isOnlineBusiness` field to the Business table to support online-only businesses that don't require a physical address.

## Changes
- **Database Schema**: Added `isOnlineBusiness` boolean column with default value `false`
- **Frontend**: Added toggle switch in onboarding and edit-business pages
- **Backend**: Updated API endpoints to handle the new field

## Files Modified

### Database
- `prisma/migrations/008_add_online_business_field/migration.sql` - Manual migration script
- `prisma/schema.prisma` - Schema already contains the field definition

### Frontend Components
- `src/components/OnboardingClient.tsx` - Added online business toggle and conditional validation
- `src/app/dashboard/edit-business/page.tsx` - Added online business toggle and conditional validation

### API Endpoints
- `src/app/api/onboarding/route.ts` - Updated to handle isOnlineBusiness field
- `src/app/api/business/me/route.ts` - Updated to return and store isOnlineBusiness field

## Manual Migration Instructions

### Option 1: Run the SQL script directly
```bash
# Connect to your CockroachDB database and run:
psql $DATABASE_URL -f migrate.sql
```

### Option 2: Run the Node.js migration script
```bash
# Set up your DATABASE_URL environment variable first
export DATABASE_URL="your-cockroachdb-connection-string"

# Run the migration
node run_migration.js
```

### Option 3: Use CockroachDB Console
1. Log into your CockroachDB Cloud Console
2. Navigate to your database
3. Run the following SQL:
```sql
ALTER TABLE "Business" ADD COLUMN IF NOT EXISTS "isOnlineBusiness" BOOLEAN NOT NULL DEFAULT false;
```

## How the Feature Works

### Onboarding Flow
1. User fills in business name (required)
2. User can toggle "Online Business" switch (default: off)
3. If "Online Business" is OFF: address field is required
4. If "Online Business" is ON: address field is optional and disabled
5. Client ID is generated regardless of business type

### Edit Business Flow
1. User can toggle between physical and online business
2. Switching to online business clears the address field
3. Switching to physical business makes address required again
4. Changes are saved to the database

### Database Behavior
- All existing businesses default to `isOnlineBusiness = false`
- Online businesses have empty `businessAddress` field
- Physical businesses require a `businessAddress` value

## Validation Rules
- Business name: always required
- Business address: required only for physical businesses
- Client ID: always required (for URL generation)
- Address validation is skipped when `isOnlineBusiness = true`

## Testing Recommendations
1. Test onboarding as physical business (toggle off) - should require address
2. Test onboarding as online business (toggle on) - should allow empty address
3. Test editing existing business - should correctly toggle between types
4. Verify database stores correct boolean values
5. Test form validation for both business types