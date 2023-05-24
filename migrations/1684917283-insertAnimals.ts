import { Sql } from 'postgres';

export const animals = [
  { id: 1, firstName: 'gigi', type: 'cat', accessory: 'rat' },
  { id: 2, firstName: 'freddy', type: 'dog', accessory: 'biscuit' },
  { id: 3, firstName: 'bob', type: 'trashpanda', accessory: 'candy' },
  { id: 4, firstName: 'nagini', type: 'snake', accessory: 'band' },
  { id: 5, firstName: 'kunfu', type: 'panda', accessory: 'food' },
];

export async function up(sql: Sql) {
  for (const animal of animals) {
    await sql`
    INSERT INTO animals
      (first_name, type, accessory)
    VALUES
      (${animal.firstName}, ${animal.type}, ${animal.accessory})
  `;
  }
}

export async function down(sql: Sql) {
  for (const animal of animals) {
    await sql`
      DELETE FROM animals WHERE id = ${animal.id}
  `;
  }
}
