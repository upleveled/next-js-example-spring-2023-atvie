import 'server-only';
import { sql } from '@vercel/postgres';
import camelcaseKeys from 'camelcase-keys';

// This loads all environment variables from a .env file
// for all code after this line
// if (!process.env.FLY_IO) config();

// Making a simple connection to Postgres
// Next.js fast refresh increases database connection slot
// and causes connection slot error
// export const sql = postgres({
//   transform: {
//     ...postgres.camel,
//     undefined: null,
//   },
// });

declare module globalThis {
  let postgresSqlClient: typeof sql;
}

// Connect only once to the database
// https://github.com/vercel/next.js/issues/7811#issuecomment-715259370
function connectOneTimeToDatabase() {
  if (!globalThis.postgresSqlClient) {
    globalThis.postgresSqlClient = sql;
  }
  return async <PostgresType extends (Record<string, unknown> | undefined)[]>(
    ...sqlQuery: [TemplateStringsArray, ...any[]]
  ) => {
    const { rows } = await globalThis.postgresSqlClient!(...sqlQuery);
    return (rows as PostgresType[]).map((row) => camelcaseKeys(row));
  };
}

// Connect to PostgreSQL
export const sqlClient = connectOneTimeToDatabase();
