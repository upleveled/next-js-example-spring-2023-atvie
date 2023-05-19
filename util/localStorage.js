export function getLocalStorage(key) {
  // Is testing if we are in the browser
  if (typeof window === 'undefined') return undefined;
  return window.localStorage.getItem(key);
}

export function setLocalStorage(key, value) {
  // Is testing if we are in the browser
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(key, value);
  }
}
