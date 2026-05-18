/**
 * Extracts the last 5-digit ZIP code from an address string.
 * e.g. "123 Main St, New York, NY 10001" → "10001"
 * Returns empty string if no ZIP is found.
 */
export function extractZip(address: string): string {
  const match = address.match(/(\d{5})(?:-\d{4})?(?!\d)/g);
  return match?.at(-1) ?? "";
}
