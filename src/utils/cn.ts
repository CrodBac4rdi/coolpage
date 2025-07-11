/**
 * Utility function to safely combine class names
 * Handles undefined, null, and empty values, removes extra whitespace
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes
    .filter(Boolean)
    .join(' ')
    .trim()
    .replace(/\s+/g, ' ');
}