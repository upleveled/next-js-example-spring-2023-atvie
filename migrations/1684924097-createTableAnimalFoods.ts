import { Sql } from 'postgres';

export type Food = {
  id: number;
  name: string;
  type: string;
};

export type AnimalFoods = {
  animalId: number;
  animalFirstName: string;
  animalType: string;
  animalAccessory: string | null;
  foodId: number;
  foodName: string;
  foodType: string;
};

type JsonAgg = {
  id: number;
};

export type AnimalWithFoodsInJsonAgg = {
  animalId: number;
  animalName: string;
  animalType: string;
  animalAccessory: string | null;
  animalFoods: JsonAgg;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE animal_foods (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      animal_id integer NOT NULL REFERENCES animals (id) ON DELETE CASCADE,
      food_id integer NOT NULL REFERENCES foods (id)
    )
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE animal_foods
  `;
}
