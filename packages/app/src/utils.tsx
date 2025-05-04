export function loadFromSessionStorage(key: string) {
  const item = window.sessionStorage.getItem(key);
  return item != null ? JSON.parse(item) : '';
}