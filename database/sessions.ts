import { cache } from 'react';
import { Session } from '../migrations/1686909238-alterSessionsTable';
import { sql } from './connect';

export const deleteExpiredSessions = cache(async () => {
  await sql`
    DELETE FROM
      sessions
    WHERE
      expiry_timestamp < now()
  `;
});

export const createSession = cache(
  async (token: string, userId: number, csrfSecret: string) => {
    const [session] = await sql<Session[]>`
    INSERT INTO sessions
      (token, user_id, csrf_secret)
    VALUES
      (${token}, ${userId}, ${csrfSecret})
    RETURNING
      id,
      token,
      user_id,
      csrf_secret
  `;

    // delete all sessions that are expired
    await deleteExpiredSessions();

    return session;
  },
);

export const deleteSessionByToken = cache(async (token: string) => {
  const [session] = await sql<{ id: number; token: string }[]>`
    DELETE FROM
      sessions
    WHERE
      sessions.token = ${token}
    RETURNING
      id,
      token
  `;

  return session;
});

export const getValidSessionByToken = cache(async (token: string) => {
  // Get the session if match the token AND is not expired
  const [session] = await sql<
    { id: number; token: string; csrfSecret: string }[]
  >`
    SELECT
      sessions.id,
      sessions.token,
      sessions.csrf_secret
    FROM
      sessions
    WHERE
      sessions.token = ${token}
    AND
      sessions.expiry_timestamp > now()
  `;

  return session;
});
