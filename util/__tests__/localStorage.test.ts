import { expect, test } from '@jest/globals';
import { getLocalStorage } from '../localStorage';

test('set, get and delete localStorage', () => {
  expect(getLocalStorage('cookiePolicy')).toBe(null);
  expect(getLocalStorage('cookiePolicy')).toBeNull();

  expect(() => localStorage.setItem('cookiePolicy', 'true')).not.toThrow();

  expect(getLocalStorage('cookiePolicy')).toStrictEqual('true');

  expect(getLocalStorage('cookiePolicy')).toBe('true');

  expect(() => localStorage.removeItem('cookiePolicy')).not.toThrow();
  expect(getLocalStorage('cookiePolicy')).toBe(null);
});
