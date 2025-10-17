/**
 * Utils
 * - Utility functions used across the game.
 */

/**
 * Return data from session storage if present.
 * @param key - Session storage key
 * @returns Session storage data.
 */
export function loadFromSessionStorage(key: string): string {
  const item = window.sessionStorage.getItem(key);
  return item != null ? JSON.parse(item) : '';
}