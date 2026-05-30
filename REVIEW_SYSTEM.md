# Anonymous Review System Documentation

## Overview

The anonymous review system allows businesses to display QR codes that customers can scan to leave voice reviews. The system prevents individual customers from submitting multiple reviews within 24 hours while allowing unlimited different customers to use the same QR code.

## How It Works

### Business Owner Flow
1. Business owner logs in to dashboard
2. Generates a permanent QR code for their business: `/b/{clientId}/review`
3. Prints and displays the QR code in their cafe/store
4. The QR code can be used indefinitely by customers

### Customer Flow
1. Customer scans the QR code with their phone
2. Opens review page: `/b/{clientId}/review`
3. Browser generates a unique fingerprint (stored in localStorage)
4. Customer records and submits their voice review
5. Review is saved with the customer's fingerprint
6. Customer is redirected to thank you page
7. If the same customer tries again within 24 hours: "Please wait X hours before submitting another review"
8. After 24 hours, the customer can submit another review

### Prevention of Multiple Reviews
- Each customer gets a unique browser fingerprint
- Fingerprint is stored in localStorage and persists across page reloads
- Database tracks when each customer last submitted a review
- One customer can submit ONE review per 24-hour period per business
- Different customers can submit reviews at any time
- After 24 hours, the same customer can submit another review

## Database Schema

### Review Model
```prisma
model Review {
  id                   String   @id @default(cuid())
  clientId             String
  text                 String
  visibility           Boolean  @default(false)
  customerFingerprint  String   // Tracks which customer submitted this
  createdAt            DateTime @default(now())

  business Business @relation(fields: [clientId], references: [clientId], onDelete: Cascade)

  @@index([clientId])
  @@index([customerFingerprint])
  @@index([createdAt])
}
```

### CustomerFingerprint Model
```prisma
model CustomerFingerprint {
  id                    String   @id @default(cuid())
  clientId              String
  fingerprint           String
  lastSubmittedAt       DateTime? // When this customer last submitted a review
  reviewCount           Int      @default(0) // How many reviews this customer has submitted
  firstSeenAt           DateTime @default(now())

  @@unique([clientId, fingerprint]) // One record per customer per business
  @@index([fingerprint])
}
```

## Browser Fingerprint System

### How It Works
The fingerprint system identifies individual customers without requiring authentication:

1. **Generate Fingerprint**: Collects browser characteristics:
   - User agent
   - Screen resolution
   - Screen color depth
   - Timezone
   - Language
   - Platform
   - CPU cores (hardware concurrency)
   - Device memory (if available)

2. **Hash Characteristics**: Combines all characteristics and creates a hash

3. **Store in localStorage**: Persists across page reloads and sessions

4. **Send to API**: Submitted with each review

5. **Server-side Check**: Verifies if this fingerprint has already submitted for this business

### Fingerprint Functions

**[src/lib/fingerprint.ts](src/lib/fingerprint.ts)**

```typescript
// Generate a new fingerprint from browser characteristics
generateBrowserFingerprint(): string

// Get existing fingerprint or create new one
getOrCreateFingerprint(): string

// Clear stored fingerprint (for testing)
clearFingerprint(): void
```

## API Endpoints

### Submit Review

**POST** `/api/b/[clientId]/review`

Submit a voice review for a business.

**Authentication Required**: ❌ No (anonymous customers)

**Request Body (FormData)**:
```
audio: File (audio/webm)
fingerprint: string
```

**Response (Success)**:
```json
{
  "success": true,
  "review": {
    "id": "abc123",
    "text": "Great coffee and friendly staff!",
    "createdAt": "2026-05-29T11:30:00Z"
  }
}
```

**Error Responses**:
- `400 Bad Request`: Missing audio file or fingerprint
- `403 Forbidden`: "You have already submitted a review for this business"
- `404 Not Found`: Business not found
- `500 Internal Server Error`: Failed to process or transcribe audio

**Who uses this**: Anonymous customers scanning QR codes

### Business Verification (Optional)

**GET** `/api/b/[clientId]`

Verify a business exists and get its details.

**Authentication Required**: ❌ No

**Response (Success)**:
```json
{
  "clientId": "starbucks-1177-bloor-street",
  "businessName": "Starbucks",
  "businessAddress": "1177 Bloor Street"
}
```

**Error Responses**:
- `404 Not Found`: Business doesn't exist

## Security Features

### Browser Fingerprint Limitations
- **Not foolproof**: Users can clear localStorage, use incognito mode, or different browsers
- **Good enough**: Prevents casual abuse (same person refreshing page to spam reviews)
- **Not for high-stakes**: Don't use for sensitive applications

### Database Protection
- **Unique constraint**: Database prevents duplicate reviews from same fingerprint/business combo
- **Race condition safe**: Prisma handles concurrent requests safely

### No Authentication Required
- Customers don't need to log in or create accounts
- Reduces friction for submitting reviews
- Better customer experience

## QR Code Structure

### Simple QR Code
```
https://yourdomain.com/b/{clientId}/review
```

**Example**:
```
https://telltheowner.com/b/starbucks-1177-bloor-street/review
```

**No token needed!** The QR code is permanent and can be reused indefinitely.

## Usage Flow

### 1. Business Owner Generates QR Code

```typescript
// Business owner's dashboard
const clientId = "starbucks-1177-bloor-street";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
const reviewUrl = `${baseUrl}/b/${clientId}/review`;

// Generate QR code from reviewUrl
const qrCode = generateQRCode(reviewUrl);

// Display QR code for printing
```

### 2. Customer Scans QR Code

```
QR Code → Opens: /b/starbucks-1177-bloor-street/review
```

### 3. Browser Generates Fingerprint

```typescript
// Automatically on page load
const fingerprint = getOrCreateFingerprint();
// Result: "abc123xyz" (stored in localStorage)
```

### 4. Customer Records and Submits

```typescript
// Customer clicks "Start Recording"
// Records voice message (30 seconds max)
// Clicks "Submit Review"

// Submit includes fingerprint
const formData = new FormData();
formData.append("audio", audioBlob);
formData.append("fingerprint", fingerprint);

await fetch(`/api/b/${clientId}/review`, {
  method: "POST",
  body: formData,
});
```

### 5. Server Checks and Saves

```typescript
// Check if fingerprint has submitted in the last 24 hours
const existing = await prisma.customerFingerprint.findUnique({
  where: { clientId_fingerprint: { clientId, fingerprint } }
});

if (existing?.lastSubmittedAt) {
  const hoursSinceLastSubmission = (Date.now() - existing.lastSubmittedAt.getTime()) / (1000 * 60 * 60);

  if (hoursSinceLastSubmission < 24) {
    const hoursRemaining = Math.ceil(24 - hoursSinceLastSubmission);
    return error(`Please wait ${hoursRemaining} hour${hoursRemaining !== 1 ? 's' : ''} before submitting another review`);
  }
}

// Save review with fingerprint
await prisma.review.create({
  data: {
    clientId,
    text: transcription.text,
    customerFingerprint: fingerprint
  }
});

// Update or create fingerprint record with submission tracking
if (existing) {
  await prisma.customerFingerprint.update({
    where: { id: existing.id },
    data: {
      lastSubmittedAt: new Date(),
      reviewCount: { increment: 1 }
    }
  });
} else {
  await prisma.customerFingerprint.create({
    data: {
      clientId,
      fingerprint,
      lastSubmittedAt: new Date(),
      reviewCount: 1
    }
  });
}
```

### 6. Subsequent Attempts (Same Day)

If the same customer tries again within 24 hours:
```
1. Browser loads page
2. Fingerprint retrieved from localStorage (same as before)
3. Customer submits review
4. Server finds existing fingerprint with lastSubmittedAt: 2 hours ago
5. Calculates: 24 - 2 = 22 hours remaining
6. Returns 429 Too Many Requests: "Please wait 22 hours before submitting another review"
7. Customer sees error message with countdown
```

If the same customer tries again after 24 hours:
```
1. Browser loads page
2. Fingerprint retrieved from localStorage (same as before)
3. Customer submits review
4. Server finds existing fingerprint with lastSubmittedAt: 25 hours ago
5. Calculates: 25 > 24, so submission is allowed
6. Review submitted successfully ✅
7. lastSubmittedAt updated to now
8. reviewCount incremented to 2
```

If a different customer tries:
```
1. Different browser → Different fingerprint
2. Server doesn't find existing record
3. Review submitted successfully
4. New fingerprint record created
```

## Testing

### Test Multiple Reviews (Different Customers)
1. Open review page in Chrome
2. Submit a review
3. Open review page in Firefox (different browser)
4. Submit another review ✅ Success

### Test 24-Hour Cooldown (Same Customer)
1. Open review page in Chrome
2. Submit a review ✅ Success
3. Refresh page in Chrome
4. Try to submit again ❌ Error: "Please wait X hours before submitting another review"
5. Note: X will be approximately 24 hours (countdown from first submission)

### Test Review After 24 Hours (Same Customer)
1. Open review page in Chrome
2. Submit a review ✅ Success
3. Wait 24 hours (or modify lastSubmittedAt in database for testing)
4. Open review page in Chrome again
5. Submit another review ✅ Success
6. Check database: reviewCount should be 2

### Test Incognito Mode
1. Open review page in incognito window
2. Submit a review ✅ Success
3. Close incognito, open new incognito
4. Try again ✅ Success (different fingerprint)
5. This is expected behavior (localStorage cleared)

### Test Multiple Visits (Same Customer)
Day 1:
1. Customer visits shop, scans QR code
2. Submits review ✅ Success

Day 2:
3. Customer visits shop again, scans same QR code
4. Submits review ✅ Success (24+ hours have passed)

Day 2 (Same Day):
5. Customer visits shop again later that day
6. Tries to submit review ❌ Error: "Please wait X hours"

### Clear Fingerprint (For Testing)
```typescript
// In browser console
localStorage.removeItem('telltheowner_fingerprint');
// Or use the helper function
clearFingerprint();
```

## Migration

To apply the database changes:

```bash
# Deploy the migration
npm run db:migrate:deploy
```

Then regenerate Prisma client:

```bash
npx prisma generate
```

## Advantages of This Approach

### ✅ Pros
- **Simple**: No token management needed
- **Permanent**: QR codes work indefinitely
- **Easy for customers**: No login required
- **Prevents abuse**: Stops same person from spamming reviews
- **Scalable**: Unlimited customers can use same QR code
- **No database cleanup**: Fingerprints persist forever

### ⚠️ Cons
- **Not perfect**: Can be bypassed (clearing localStorage, different browsers)
- **Privacy**: Collects browser characteristics (stored locally only)
- **Testing**: Need to clear localStorage to test multiple submissions

## Comparison With Token System

| Feature | Token System | Fingerprint System |
|---------|--------------|-------------------|
| QR Code Duration | Temporary (expires) | Permanent |
| Total Reviews Allowed | 1 per QR code | Unlimited |
| Reviews Per Customer | 1 | 1 per 24 hours |
| Customer Auth Required | No | No |
| Complexity | High (token management) | Low (simple fingerprint) |
| Abuse Prevention | High | Medium |
| Customer Experience | Good (one-time link) | Better (same link forever, daily reviews) |

## Best Practices

### For Business Owners
1. **Print QR codes on durable material** (laminated cards, stickers)
2. **Display prominently** near checkout or entrance
3. **Test QR code** before printing large quantities
4. **Monitor reviews** regularly in dashboard
5. **Update QR code** only if you change clientId
6. **Inform regular customers** they can leave reviews daily

### For Customers
1. **Allow microphone access** when prompted
2. **Record in quiet environment** for best transcription
3. **Speak clearly** and close to microphone
4. **Keep it brief** (30 seconds max)
5. **Visit daily** - you can leave one review every 24 hours per business

### For Developers
1. **Handle fingerprint errors gracefully**
2. **Provide clear error messages** showing hours remaining
3. **Test on multiple browsers** and devices
4. **Monitor fingerprint collision rates** (should be very low)
5. **Consider adding CAPTCHA** for high-abuse environments
6. **Test 24-hour cooldown logic** thoroughly

## Example Business Workflow

```
1. Coffee shop owner signs up on platform
2. Adds business: "Starbucks" with clientId: "starbucks-1177-bloor-street"
3. Dashboard generates QR code URL: https://telltheowner.com/b/starbucks-1177-bloor-street/review
4. Owner prints QR code and places on tables
5. Customer A (iPhone) scans → Leaves review ✅ (Day 1, 10:00 AM)
6. Customer B (Android) scans → Leaves review ✅ (Day 1, 11:00 AM)
7. Customer C (iPad) scans → Leaves review ✅ (Day 1, 12:00 PM)
8. Customer A scans again → Error: "Please wait 22 hours" ❌ (Day 1, 2:00 PM)
9. Customer A visits again next day → Leaves review ✅ (Day 2, 10:00 AM)
10. Owner sees 4 reviews in dashboard (3 from Day 1, 1 from Day 2)
11. QR code continues working for new customers indefinitely
12. Regular customers can leave reviews every 24 hours
```

## Notes

- Fingerprints are stored in localStorage, not cookies
- Clearing browser data resets fingerprint (allows new submission)
- Incognito mode generates new fingerprint each session
- Different browsers on same device = different fingerprints
- Each customer can submit ONE review per 24-hour period per business
- After 24 hours, the same customer can submit another review
- No authentication required for customers
- QR codes are permanent and don't expire
- Business owners can regenerate QR codes if needed
- Review count tracked per customer per business
- Server calculates exact hours remaining for cooldown message

## Future Enhancements

### Optional: Enhanced Fingerprinting
- Canvas fingerprinting (more unique but privacy concerns)
- WebGL fingerprinting
- Font detection
- Audio fingerprinting

### Optional: Rate Limiting
- Add IP-based rate limiting (prevents same network abuse)
- Add CAPTCHA after multiple failed attempts
- Time-based cooldown between submissions

### Optional: Account System
- Allow customers to optionally create accounts
- Link fingerprints to accounts for better tracking
- Allow customers to edit/delete their reviews

### Optional: Configurable Cooldown Period
- Make 24-hour cooldown configurable per business
- Some businesses may want daily reviews, others weekly
- Allow business owners to set their own review frequency

### Optional: Review Moderation
- Flag suspicious review patterns
- Auto-moderate with AI content filtering
- Business owner approval workflow