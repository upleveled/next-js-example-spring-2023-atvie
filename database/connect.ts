import 'server-only';
import { config } from 'dotenv-safe';
import { headers } from 'next/headers';
import postgres, { ParameterOrFragment } from 'postgres';

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
  let postgresSqlClient: ReturnType<typeof postgres>;
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

  return <PostgresType extends (Record<string, unknown> | undefined)[]>(
    ...sqlQuery: [TemplateStringsArray, ...ParameterOrFragment<never>[]]
  ) => {
    headers();
    return globalThis.postgresSqlClient<PostgresType>(...sqlQuery);
  };
}

// Connect to PostgreSQL
export const sql = connectOneTimeToDatabase();
