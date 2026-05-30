import { randomBytes } from "crypto";

/**
 * Generate a cryptographically secure random token for QR codes
 * @returns A secure random token string
 */
export function generateSecureToken(): string {
  // Generate 32 random bytes and convert to hex string
  const token = randomBytes(32).toString("hex");
  return token;
}

/**
 * Generate a token expiration date
 * @param minutesFromNow How many minutes from now the token should expire (default: 60 minutes)
 * @returns Date object representing the expiration time
 */
export function generateTokenExpiration(minutesFromNow: number = 60): Date {
  const now = new Date();
  now.setMinutes(now.getMinutes() + minutesFromNow);
  return now;
}