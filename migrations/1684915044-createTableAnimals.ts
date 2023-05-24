import { Sql } from 'postgres';

export type Animal = {
  id: number;
  firstName: string;
  type: string;
  accessory: string | null;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE animals (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      first_name varchar(30) NOT NULL,
      type varchar(30) NOT NULL,
      accessory varchar(40)
    )
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE animals
  `;
}
