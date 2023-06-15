import { cache } from 'react';
import { sql } from './connect';
import { User } from '../migrations/1686731462-createUsers'

type UserWithPasswordHash = User & {
  passwordHash: string;
};

export const getUserWithPasswordHashByUsername = cache(
  async (username: string) => {
    const [user] = await sql<UserWithPasswordHash[]>`
    SELECT * FROM
      users
    WHERE
      users.username = ${username.toLowerCase()}
 `;

    return user;
  },
);

export const getUserByUsername = cache(async (username: string) => {
  const [user] = await sql<User[]>`
    SELECT
      id,
      username
    FROM
      users
    WHERE
      users.username = ${username.toLowerCase()}
 `;

  return user;
});

export const createUser = cache(
  async (username: string, passwordHash: string) => {
    console.log(passwordHash);
    const [user] = await sql<User[]>`
    INSERT INTO users
      (username, password_hash)
    VALUES
      (${username.toLowerCase()}, ${passwordHash})
    RETURNING
      id,
      username
 `;

    return user;
  },
);
