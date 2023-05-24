import { Sql } from 'postgres';

export const foods = [
  { id: 1, name: 'Tomato', type: 'Vegetable' },
  { id: 2, name: 'Potato', type: 'Vegetable' },
  { id: 3, name: 'Rice', type: 'Grain' },
  { id: 4, name: 'Mango', type: 'Fruit' },
];

export async function up(sql: Sql) {
  for (const food of foods) {
    await sql`
    INSERT INTO foods
      (name, type)
    VALUES
      (${food.name}, ${food.type})
  `;
  }
}

export async function down(sql: Sql) {
  for (const food of foods) {
    await sql`
      DELETE FROM foods WHERE id = ${food.id}
  `;
  }
}
