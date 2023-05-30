import { AnimalFoods } from '../migrations/1684924097-createTableAnimalFoods';

export function getAnimalWithFoods(animalsFoods: AnimalFoods[]) {
  if (typeof animalsFoods[0] === 'undefined') {
    throw new Error('No animal found');
  }
  const animalWithFoods = {
    id: animalsFoods[0].animalId,
    firstName: animalsFoods[0].animalFirstName,
    type: animalsFoods[0].animalType,
    accessory: animalsFoods[0].animalAccessory,
    animalFoods: animalsFoods.map((animalFood) => {
      return {
        id: animalFood.foodId,
        name: animalFood.foodName,
        type: animalFood.foodType,
      };
    }),
  };
  return animalWithFoods;
}
