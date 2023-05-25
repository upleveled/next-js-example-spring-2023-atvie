import { expect, test } from '@jest/globals';
import { parseJson } from '../json';

test('parseJson should return the expected result', () => {
  expect(parseJson('{"name": "John", "age": 30}')).toStrictEqual({
    name: 'John',
    age: 30,
  });

  expect(parseJson('')).toBe(undefined);

  expect(parseJson('not a valid json')).toBe(undefined);
});
