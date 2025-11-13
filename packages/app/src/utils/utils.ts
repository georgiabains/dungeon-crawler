/**
 * Utils
 * - Utility functions used across the game.
 */

/**
 * Return data from session storage if present.
 * @param key - Session storage key
 * @returns Session storage data.
 */
export function loadFromSessionStorage(key: string): object | string {
  const item = window.sessionStorage.getItem(key);
  return Boolean(item) && item !== null ? JSON.parse(item) : '';
}

/**
 * Return random number up to the maximum.
 * @param {number} max - Maximum number.
 * @returns 
 */
export function getRandomInt(max: number): number {
  return Math.floor(Math.random() * max);
}