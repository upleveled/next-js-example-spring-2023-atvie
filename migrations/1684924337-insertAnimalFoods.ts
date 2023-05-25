import { Sql } from 'postgres';

const animalFoods = [
  { id: 1, animalId: 1, foodId: 2 },
  { id: 2, animalId: 2, foodId: 1 },
  { id: 3, animalId: 1, foodId: 3 },
  { id: 4, animalId: 3, foodId: 4 },
];

export async function up(sql: Sql) {
  for (const animalFood of animalFoods) {
    await sql`
    INSERT INTO animal_foods
      (animal_id, food_id)
    VALUES
      (${animalFood.animalId}, ${animalFood.foodId})
  `;
  }
}

export async function down(sql: Sql) {
  for (const animalFood of animalFoods) {
    await sql`
      DELETE FROM animal_foods WHERE id = ${animalFood.id}
  `;
  }
}
