import { cache } from 'react';
import { Animal } from '../migrations/1684915044-createTableAnimals';
import {
  AnimalFoods,
  AnimalWithFoodsInJsonAgg,
} from '../migrations/1684924097-createTableAnimalFoods';
import { sql } from './connect';

export const getAnimals = cache(async () => {
  const animals = await sql<Animal[]>`
    SELECT * FROM animals
 `;

  return animals;
});

export const getAnimalsWithLimitAndOffset = cache(
  async (limit: number, offset: number) => {
    const animals = await sql<Animal[]>`
      SELECT
        *
      FROM
        animals
      LIMIT ${limit}
      OFFSET ${offset}
    `;

    return animals;
  },
);

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

export const createAnimal = cache(
  async (firstName: string, type: string, accessory?: string) => {
    const [animal] = await sql<Animal[]>`
      INSERT INTO animals
        (first_name, type, accessory)
      VALUES
        (${firstName}, ${type}, ${accessory || null})
      RETURNING *
    `;

    return animal;
  },
);

export const updateAnimalById = cache(
  async (id: number, firstName: string, type: string, accessory?: string) => {
    const [animal] = await sql<Animal[]>`
      UPDATE animals
      SET
        first_name = ${firstName},
        type = ${type},
        accessory = ${accessory || null}
      WHERE
        id = ${id}
        RETURNING *
    `;

    return animal;
  },
);

export const deleteAnimalById = cache(async (id: number) => {
  const [animal] = await sql<Animal[]>`
    DELETE FROM
      animals
    WHERE
      id = ${id}
    RETURNING *
  `;
  return animal;
});

export const getAnimalsWithFoods = cache(async (id: number) => {
  const animalFoods = await sql<AnimalFoods[]>`
   SELECT
     animals.id AS animal_id,
     animals.first_name AS animal_first_name,
     animals.type AS animal_type,
     animals.accessory AS animal_accessory,
     foods.id AS food_id,
     foods.name AS food_name,
     foods.type AS food_type
    FROM
     animals
    INNER JOIN
      animal_foods ON animals.id = animal_foods.animal_id
    INNER JOIN
      foods ON foods.id = animal_foods.food_id
    WHERE animals.id = ${id}
  `;
  return animalFoods;
});

// Join query for getting a single animal with related foods using json_agg
export const getAnimalWithFoodsById = cache(async (id: number) => {
  const [animal] = await sql<AnimalWithFoodsInJsonAgg[]>`
SELECT
  animals.id AS animal_id,
  animals.first_name AS animal_name,
  animals.type AS animal_type,
  animals.accessory AS animal_accessory,
  (
    SELECT
      json_agg(foods.*)
    FROM
      animal_foods
    INNER JOIN
      foods ON animal_foods.food_id = foods.id
    WHERE
      animal_foods.animal_id = animals.id

  ) AS animal_foods
FROM
  animals
WHERE
  animals.id = ${id}
GROUP BY
  animals.first_name, animals.type, animals.accessory, animals.id;
  `;

  return animal;
});
