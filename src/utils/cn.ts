import classNames from 'classnames'

/**
 * Utility function to safely combine class names
 * Handles undefined, null, and empty values, removes extra whitespace
 */
export function cn(...inputs: classNames.ArgumentArray): string {
  // Use the battle-tested classnames library
  return classNames(...inputs)
}

// Legacy function for backward compatibility
export function cnLegacy(...classes: (string | undefined | null | false)[]): string {
  return classes
    .filter(Boolean)
    .join(' ')
    .trim()
    .replace(/\s+/g, ' ');
}