# QR Token System Documentation

## Overview

The QR token system provides one-time use protection for review links generated from QR codes. Each token can only be used once, preventing multiple reviews from the same QR code scan.

## User Roles

### 1. Business Users (BusinessUser)
- **Status**: Authenticated via NextAuth
- **Role**: Business owners, managers, or staff members
- **Capabilities**: 
  - Generate QR tokens for their business
  - View reviews and analytics
  - Manage business settings
- **Example**: A coffee shop owner who wants to collect customer feedback

### 2. Customers (Unauthenticated)
- **Status**: No authentication required
- **Role**: Customers who visit the business
- **Capabilities**:
  - Scan QR codes to access review form
  - Record and submit voice reviews
  - No account or login needed
- **Example**: A customer who just had coffee and wants to leave feedback

## Features

- **One-time use**: Each token is marked as used after first access
- **Expiration**: Tokens automatically expire after a configurable time (default: 60 minutes)
- **Secure**: Uses cryptographically secure tokens (cuid2)
- **User-friendly**: Shows clear validation states and error messages
- **No customer login**: Customers can leave reviews without authentication
- **Business control**: Only authorized business users can generate tokens

## Database Schema

```prisma
model QrToken {
  id        String   @id @default(cuid())
  clientId  String
  token     String   @unique
  used      Boolean  @default(false)
  expiresAt DateTime
  createdAt DateTime @default(now())

  @@index([token])
  @@index([clientId])
}
```

## API Endpoints

### 1. Generate Token

**POST** `/api/qr-tokens`

Generate a new one-time token for a business's QR code.

**Authentication Required**: ✅ Yes (Business User only)

**Request:**
```json
{
  "clientId": "starbucks-1177-bloor-street",
  "expiresMinutes": 60  // Optional, defaults to 60, max 1440 (24 hours)
}
```

**Response:**
```json
{
  "token": "abc123xyz",
  "expiresAt": "2026-05-29T12:00:00Z",
  "reviewUrl": "http://localhost:3000/b/starbucks-1177-bloor-street/review?t=abc123xyz",
  "clientId": "starbucks-1177-bloor-street"
}
```

**Requirements:**
- User must be authenticated (Business User)
- User must have access to the business (businessUser relationship)

**Who uses this**: Business owners/managers generating QR codes for their locations

**Error Responses:**
- `401 Unauthorized`: Not logged in (must be authenticated Business User)
- `403 Forbidden`: No access to this business
- `404 Not Found`: Business doesn't exist
- `400 Bad Request`: Invalid clientId or expiresMinutes

### 2. Validate and Consume Token

**POST** `/api/qr-tokens/[token]`

Validate a token and mark it as used (consumes the token).

**Authentication Required**: ❌ No (for unauthenticated customers)

**Response (Success):**
```json
{
  "valid": true,
  "clientId": "starbucks-1177-bloor-street",
  "business": {
    "clientId": "starbucks-1177-bloor-street",
    "businessName": "Starbucks",
    "businessAddress": "1177 Bloor Street"
  },
  "usedAt": "2026-05-29T11:30:00Z"
}
```

**Who uses this**: Unauthenticated customers scanning QR codes

**Error Responses:**
- `404 Not Found`: Token doesn't exist
- `410 Gone`: Token has expired (auto-deleted)
- `403 Forbidden`: Token has already been used
- `500 Internal Server Error`: Server error

### 3. Check Token (Without Consuming)

**GET** `/api/qr-tokens/[token]`

Check if a token is valid without marking it as used.

**Authentication Required**: ❌ No (for unauthenticated customers)

**Response (Valid):**
```json
{
  "valid": true,
  "clientId": "starbucks-1177-bloor-street",
  "expiresAt": "2026-05-29T12:00:00Z"
}
```

**Response (Invalid):**
```json
{
  "valid": false,
  "reason": "expired"  // or "not_found" or "already_used"
}
```

**Who uses this**: Unauthenticated customers checking if their link is still valid

## Usage Flow

### 1. Business Owner Generates QR Code

```typescript
// From authenticated business owner's dashboard
const response = await fetch('/api/qr-tokens', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    clientId: 'starbucks-1177-bloor-street',
    expiresMinutes: 60
  })
});

const { reviewUrl } = await response.json();
// reviewUrl = "http://localhost:3000/b/starbucks-1177-bloor-street/review?t=abc123xyz"

// Generate QR code from reviewUrl
generateQRCode(reviewUrl);
```

### 2. Customer Scans QR Code

```
QR Code → Opens: /b/starbucks-1177-bloor-street/review?t=abc123xyz
```

### 3. Review Page Validates Token

On page load, the review page:
1. Extracts token from URL parameter `?t=abc123xyz`
2. Calls `/api/qr-tokens/abc123xyz` with POST to validate and consume
3. Shows loading state while validating
4. If valid: shows recording interface
5. If invalid: shows error message

### 4. Customer Leaves Review

- Records voice message
- Submits review
- Redirected to `/thank-you`

### 5. Subsequent Access Attempts

If someone tries to use the same token again:
- Token already marked as `used: true`
- API returns `403 Forbidden` with "Token has already been used"
- Review page shows error: "This link has expired or has already been used"

## Token States

| State | Description | User Experience |
|-------|-------------|-----------------|
| **Valid** | Token exists, not used, not expired | Shows recording interface |
| **Used** | Token already consumed | Error: "Already been used" |
| **Expired** | Token past expiration date | Error: "Link has expired" (token deleted) |
| **Not Found** | Token never existed | Error: "Invalid token" |

## Security Features

1. **Cryptographically Secure Tokens**: Uses cuid2 for collision-resistant tokens
2. **Automatic Expiration**: Tokens expire automatically (configurable)
3. **One-time Use**: Token marked as used on first access
4. **Authorization**: Only business owners can generate tokens for their businesses
5. **Auto-cleanup**: Expired tokens are automatically deleted on first access attempt
6. **Indexing**: Token field indexed for fast lookups

## Configuration

### Token Expiration

Default: 60 minutes
Maximum: 1440 minutes (24 hours)

Set when generating token:
```typescript
const response = await fetch('/api/qr-tokens', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    clientId: 'business-id',
    expiresMinutes: 120  // 2 hours
  })
});
```

### Environment Variables

```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000
# Used to generate full review URLs
```

## UI States

### Validating Token
Shows loading spinner with "Validating token..." message.

### Invalid Token
Shows error message with:
- Warning icon
- "Invalid Token" heading
- Specific error message (expired, already used, etc.)

### Valid Token
Shows full recording interface with all buttons enabled.

## Testing

### Generate a Token
```bash
curl -X POST http://localhost:3000/api/qr-tokens \
  -H "Content-Type: application/json" \
  -H "Cookie: next-auth.session-token=YOUR_SESSION_TOKEN" \
  -d '{"clientId":"starbucks-1177-bloor-street","expiresMinutes":60}'
```

### Validate a Token
```bash
curl -X POST http://localhost:3000/api/qr-tokens/abc123xyz
```

### Check a Token
```bash
curl http://localhost:3000/api/qr-tokens/abc123xyz
```

## Migration

To apply the database migration:

```bash
npm run db:migrate:deploy
```

Note: This documentation describes the QR Token system which was replaced by the Browser Fingerprint system. See [REVIEW_SYSTEM.md](REVIEW_SYSTEM.md) for the current implementation.

## Example QR Code Workflow

1. **Business logs in** → Dashboard
2. **Clicks "Generate QR Code"** → Calls `/api/qr-tokens`
3. **Receives review URL** → `/b/{clientId}/review?t={token}`
4. **Generates QR code** → From review URL
5. **Prints QR code** → For display in store
6. **Customer scans** → Opens review page with token
7. **Token validated** → Consumed, marked as used
8. **Customer records review** → Submits
9. **Redirected to thank you** → Done
10. **Another scan** → Error: "Already been used"

## Cleanup

Expired tokens are automatically deleted when accessed. To manually clean up old tokens:

```typescript
// Delete all expired tokens (optional)
await prisma.qrToken.deleteMany({
  where: {
    expiresAt: {
      lt: new Date()
    }
  }
});

// Delete all used tokens older than 30 days (optional)
await prisma.qrToken.deleteMany({
  where: {
    used: true,
    createdAt: {
      lt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    }
  }
});
```

## Notes

- Tokens are case-sensitive
- Tokens are URL-safe (no special characters)
- Multiple tokens can exist for the same business
- Review pages work without tokens for backward compatibility
- Token validation happens on page load, not on submit
- **Business Users** (authenticated) generate tokens for their businesses
- **Customers** (unauthenticated) scan QR codes and leave reviews without logging in
- Each token can only be used once by a single customer
- Token expiration prevents old QR codes from being abused indefinitely

## API Authentication Summary

| Endpoint | Authentication Required | User Type |
|----------|------------------------|-----------|
| `POST /api/qr-tokens` | ✅ Yes | Business User |
| `POST /api/qr-tokens/[token]` | ❌ No | Customer |
| `GET /api/qr-tokens/[token]` | ❌ No | Customer |
| `POST /api/b/[clientId]/review` | ❌ No | Customer |
});
```

## Notes

- Tokens are case-sensitive
- Tokens are URL-safe (no special characters)
- Multiple tokens can exist for the same business
- Review pages work without tokens for backward compatibility
- Token validation happens on page load, not on submit