# Magic Link Authentication Setup Guide

## Installation Complete ✅

Magic link authentication with Auth.js and Mailgun has been set up successfully!

## Configuration Steps

### 1. Generate AUTH_SECRET
Run this command to generate a secure auth secret:
```bash
openssl rand -base64 32
```

Update your `.env` file with the generated value:
```
AUTH_SECRET=your-generated-secret-here
```

### 2. Configure Mailgun

1. Sign up for a Mailgun account at https://www.mailgun.com/
2. Get your domain and API key from the Mailgun dashboard
3. Update your `.env` file:
```
MAILGUN_DOMAIN=your-mailgun-domain
MAILGUN_API_KEY=your-mailgun-api-key
```

### 3. Create Mailgun Email Template

1. Go to your Mailgun dashboard
2. Navigate to Sending → Templates
3. Create a new template named `magic-link-email`
4. Use the following template variables:
   - `%recipient%` - User's email address
   - `{{magiclink}}` - Magic link URL (this is the main variable)

### Example Mailgun Template

Subject: Sign in to Tell the Owner

HTML Template:
```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <h2 style="color: #2563eb;">Sign in to Tell the Owner</h2>
  <p>Hello,</p>
  <p>Click the button below to sign in to your account:</p>
  <p>
    <a href="{{magiclink}}" style="display: inline-block; padding: 12px 24px; background-color: #2563eb; color: white; text-decoration: none; border-radius: 8px;">
      Sign In
    </a>
  </p>
  <p>Or copy and paste this link into your browser:</p>
  <p style="word-break: break-all; color: #6b7280;">{{magiclink}}</p>
  <p style="color: #9ca3af; font-size: 12px;">This link will expire in 24 hours.</p>
</div>
```

### 4. Update NEXTAUTH_URL

For production, update the NEXTAUTH_URL in your `.env` file:
```
NEXTAUTH_URL=https://your-domain.com
```

For local development:
```
NEXTAUTH_URL=http://localhost:3000
```

## Database Setup

Run this command to apply all migrations to your CockroachDB:

```bash
npm run db:migrate:deploy
```

This will apply the following migrations:
- `001_init` - Creates the Business table
- `002_add_auth_tables` - Creates User, Account, Session, and VerificationToken tables

Alternatively, you can use Prisma's built-in commands:

```bash
npm run db:push    # Push schema changes directly to database
npm run db:generate # Regenerate Prisma Client
npm run db:studio   # Open Prisma Studio to view data
```

This will create the following tables:
- `User` - User accounts
- `Account` - OAuth accounts
- `Session` - User sessions
- `VerificationToken` - Email verification tokens

## Test the Setup

1. Start your development server:
```bash
npm run dev
```

2. Navigate to http://localhost:3000
3. Click "Sign In" or "Start Free Trial"
4. Enter your email address
5. Check your email for the magic link
6. Click the link to sign in

## Features Implemented

✅ Magic link authentication
✅ Mailgun email integration with template support
✅ Protected dashboard page
✅ Sign in/sign out functionality
✅ Middleware for route protection
✅ Auth error page
✅ JWT session strategy
✅ Prisma adapter for CockroachDB

## Protected Routes

- `/dashboard` - Only accessible to authenticated users
- `/auth/signin` - Redirects authenticated users to dashboard
- `/auth/error` - Authentication error page

## API Routes

- `/api/auth/[...nextauth]` - Auth.js API routes (GET, POST)

## Files Created/Modified

- `src/auth.ts` - Auth.js configuration
- `src/lib/auth/config.ts` - Auth configuration with Mailgun
- `src/app/api/auth/[...nextauth]/route.ts` - Auth API handler
- `src/app/auth/signin/page.tsx` - Sign in page
- `src/app/auth/error/page.tsx` - Error page
- `src/app/dashboard/page.tsx` - Protected dashboard
- `src/middleware.ts` - Auth middleware
- `prisma/schema.prisma` - Updated with auth models
- `.env` - Added auth and mailgun environment variables

## Environment Variables Required

```
DATABASE_URL=postgresql://...
AUTH_SECRET=your-generated-secret
NEXTAUTH_URL=http://localhost:3000
MAILGUN_DOMAIN=your-domain
MAILGUN_API_KEY=your-api-key
```

## Troubleshooting

### Email not sending
- Verify Mailgun API key and domain are correct
- Check Mailgun dashboard for email logs
- Ensure your template name is exactly `magic-link-email`
- Verify the variable `{{magiclink}}` is used in your template

### Magic link not working
- Check that NEXTAUTH_URL matches your current URL
- Verify AUTH_SECRET is set correctly
- Check browser console for errors

### Database errors
- Run `npx prisma db push` to ensure tables exist
- Verify DATABASE_URL is correct
- Check CockroachDB connection

## Next Steps

1. Configure Mailgun template
2. Test magic link flow
3. Customize the dashboard page
4. Add user profile management
5. Implement role-based access control if needed