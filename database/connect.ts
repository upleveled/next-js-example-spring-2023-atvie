import 'server-only';
import { config } from 'dotenv-safe';
import { headers } from 'next/headers';
import postgres, { Sql } from 'postgres';

// This loads all environment variables from a .env file
// for all code after this line
if (!process.env.FLY_IO) config();

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
  let postgresSqlClient: Sql;
}

// Connect only once to the database
// https://github.com/vercel/next.js/issues/7811#issuecomment-715259370
function connectOneTimeToDatabase() {
  if (!('postgresSqlClient' in globalThis)) {
    globalThis.postgresSqlClient = postgres({
      transform: {
        ...postgres.camel,
        undefined: null,
      },
    });
  }

  // Wrap sql tagged template function to include the headers()function calls before each
  // database operation
  // This is necessary for Next.js to treat the page importing the database query
  // function as a dynamic function, rather than a static one, and allows the correct
  // handling of the pages during server - side rendering and subsequent dynamic
  // behavior by Next.js
  // https://github.com/vercel/next.js/discussions/50695
  return ((
    ...sqlParameters: Parameters<typeof globalThis.postgresSqlClient>
  ) => {
    headers();
    return globalThis.postgresSqlClient(...sqlParameters);
  }) as typeof globalThis.postgresSqlClient;
}

// Connect to PostgreSQL
export const sql = connectOneTimeToDatabase();
