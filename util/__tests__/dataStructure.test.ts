import { expect, test } from '@jest/globals';
import { getAnimalWithFoods } from '../dataStructure';

test('reduces animal favorite food', () => {
  const animalWithFoods = [
    {
      animalId: 1,
      animalFirstName: 'gigi',
      animalType: 'cat',
      animalAccessory: 'rat',
      foodId: 2,
      foodName: 'Potato',
      foodType: 'Vegetable',
    },
    {
      animalId: 1,
      animalFirstName: 'gigi',
      animalType: 'cat',
      animalAccessory: 'rat',
      foodId: 3,
      foodName: 'Rice',
      foodType: 'Grain',
    },
  ];

  expect(getAnimalWithFoods(animalWithFoods)).toStrictEqual({
    id: 1,
    firstName: 'gigi',
    type: 'cat',
    accessory: 'rat',
    animalFoods: [
      { id: 2, name: 'Potato', type: 'Vegetable' },
      { id: 3, name: 'Rice', type: 'Grain' },
    ],
  });
});
