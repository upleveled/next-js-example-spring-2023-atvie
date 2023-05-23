import { cache } from 'react';
import { sql } from './connect';

// This data is now coming from the database
// export const animals = [
//   { id: 1, firstName: 'gigi', type: 'cat', accessory: 'rat' },
//   { id: 2, firstName: 'freddy', type: 'dog', accessory: 'biscuit' },
//   { id: 3, firstName: 'bob', type: 'trashpanda', accessory: 'candy' },
//   { id: 4, firstName: 'nagini', type: 'snake', accessory: 'band' },
//   { id: 5, firstName: 'kunfu', type: 'panda', accessory: 'food' },
// ];

// export function getAnimalById(id: number) {
//   return animals.find((animal) => animal.id === id);
// }

type Animal = {
  id: number;
  firstName: string;
  type: string;
  accessory: string | null;
};

export const getAnimals = cache(async () => {
  const animals = await sql<Animal[]>`
    SELECT * FROM animals
 `;
  return animals;
});

export const getAnimalById = cache(async (id: number) => {
  const [animal] = await sql<Animal[]>`
    SELECT
      *
    FROM
      animals
    WHERE
      id = ${id}
  `;
  return animal;
});
