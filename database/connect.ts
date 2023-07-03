import { headers } from 'next/headers';
import postgres, { Sql } from 'postgres';
import { setEnvironmentVariables } from '../util/config.mjs';

// This loads all environment variables from a .env file
// for all code after this line
setEnvironmentVariables();

// Type needed for assigning `globalThis.postgresSqlClient` in `connectOneTimeToDatabase`
declare module globalThis {
  let postgresSqlClient: Sql;
}

// Connect only once to the database
// https://github.com/vercel/next.js/issues/7811#issuecomment-715259370
function connectOneTimeToDatabase() {
  if (!('postgresSqlClient' in globalThis)) {
    globalThis.postgresSqlClient = postgres({
      ssl: Boolean(process.env.POSTGRES_URL),
      transform: {
        ...postgres.camel,
        undefined: null,
      },
    });
  }
  return ((
    ...sqlParameters: Parameters<typeof globalThis.postgresSqlClient>
  ) => {
    headers();
    return globalThis.postgresSqlClient(...sqlParameters);
  }) as typeof globalThis.postgresSqlClient;
}

// Connect to PostgreSQL
export const sql = connectOneTimeToDatabase();
