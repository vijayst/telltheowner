/**
 * Generate a browser fingerprint to identify customers
 * This allows us to prevent the same customer from submitting multiple reviews
 * while allowing different customers to use the same QR code.
 */

/**
 * Generate a fingerprint from browser characteristics
 * Note: This is client-side only, returns a string that can be stored in localStorage
 */
export function generateBrowserFingerprint(): string {
  const fingerprintParts: string[] = [];

  // User agent
  fingerprintParts.push(navigator.userAgent);

  // Screen resolution
  fingerprintParts.push(`${window.screen.width}x${window.screen.height}`);

  // Screen color depth
  fingerprintParts.push(window.screen.colorDepth.toString());

  // Timezone
  fingerprintParts.push(Intl.DateTimeFormat().resolvedOptions().timeZone);

  // Language
  fingerprintParts.push(navigator.language);

  // Platform
  fingerprintParts.push(navigator.platform);

  // Hardware concurrency (number of CPU cores)
  if (navigator.hardwareConcurrency) {
    fingerprintParts.push(navigator.hardwareConcurrency.toString());
  }

  // Device memory (if available)
  if ((navigator as any).deviceMemory) {
    fingerprintParts.push((navigator as any).deviceMemory.toString());
  }

  // Combine all parts and hash
  const combined = fingerprintParts.join('|');

  // Simple hash function
  let hash = 0;
  for (let i = 0; i < combined.length; i++) {
    const char = combined.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }

  return Math.abs(hash).toString(36);
}

/**
 * Get or create a stored fingerprint for this customer
 * This persists across page reloads using localStorage
 */
export function getOrCreateFingerprint(): string {
  const storageKey = 'telltheowner_fingerprint';

  // Check if we already have a fingerprint stored
  let fingerprint = localStorage.getItem(storageKey);

  if (!fingerprint) {
    // Generate new fingerprint
    fingerprint = generateBrowserFingerprint();
    localStorage.setItem(storageKey, fingerprint);
  }

  return fingerprint;
}

/**
 * Clear the stored fingerprint (for testing/debugging)
 */
export function clearFingerprint(): void {
  localStorage.removeItem('telltheowner_fingerprint');
}