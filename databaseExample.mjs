import postgres from 'postgres';
import { setEnvironmentVariables } from './util/config.mjs';

setEnvironmentVariables();

const sql = postgres();

console.log(
  await sql`
    SELECT * FROM animals;
  `,
);

// This is only for the example, in your code you will want
// a persistent connection to the database
await sql.end();
