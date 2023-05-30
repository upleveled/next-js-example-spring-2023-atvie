import { expect, test } from '@jest/globals';
import { getLocalStorage } from '../localStorage';

test('set, get and delete localStorage', () => {
  // Make sure that the return value of the localStorage is null
  // When accessing a key in the localStorage that does not exist, the returned value is null
  expect(getLocalStorage('cookiePolicy')).toBe(null);
  expect(getLocalStorage('cookiePolicy')).toBeNull();
  // Set the localStorage key to true
  expect(() => localStorage.setItem('cookiePolicy', 'true')).not.toThrow();
  // Make sure that the localStorage key is set to true
  expect(getLocalStorage('cookiePolicy')).toBe('true');
  // Best practice: clear state after test to bring the system back to the initial state
  expect(() => localStorage.removeItem('cookiePolicy')).not.toThrow();
  expect(getLocalStorage('cookiePolicy')).toBe(null);
});
