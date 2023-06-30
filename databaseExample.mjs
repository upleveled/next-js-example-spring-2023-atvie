import postgres from 'postgres';
import { setEnvironmentVariables } from './ley.config.mjs';

// This loads all environment variables from a .env file
// for all code after this line
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
