import { expect, test } from '@jest/globals';
import { getFruitById } from '../../database/fruits';

test('getFruitById should return the expected result', () => {
  expect(getFruitById(2)).toStrictEqual({ id: 2, name: 'mango', icon: '🥭' });

  expect(getFruitById(10)).toBeUndefined();
  // @ts-expect-error testing incorrect arguments type
  expect(getFruitById('1')).toBeUndefined();
});
