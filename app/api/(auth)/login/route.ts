import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createSession } from '../../../../database/sessions';
import { getUserWithPasswordHashByUsername } from '../../../../database/users';
import { User } from '../../../../migrations/1686731462-createUsers';
import { secureCookieOptions } from '../../../../util/cookies';
import { createCsrfSecret } from '../../../../util/csrf';

type Error = {
  error: string;
};

export type LoginResponseBodyPost =
  | {
      user: User;
    }
  | Error;

const userSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export async function POST(
  request: NextRequest,
): Promise<NextResponse<LoginResponseBodyPost>> {
  const body = await request.json();

  // 1. get the credentials from the body
  const result = userSchema.safeParse(body);

  // 2. verify the user data and check that the name is not taken
  if (!result.success) {
    // zod send you details about the error
    // console.log(result.error);
    return NextResponse.json(
      {
        error: 'username or password missing',
      },
      { status: 400 },
    );
  }

  // 3. verify the user credentials
  const userWithPasswordHash = await getUserWithPasswordHashByUsername(
    result.data.username,
  );

  if (!userWithPasswordHash) {
    // zod send you details about the error
    // console.log(result.error);
    return NextResponse.json(
      {
        error: 'user or password not valid',
      },
      { status: 401 },
    );
  }

  // 3. hash the password
  const isPasswordValid = await bcrypt.compare(
    result.data.password,
    userWithPasswordHash.passwordHash,
  );

  if (!isPasswordValid) {
    return NextResponse.json(
      {
        error: 'user or password not valid',
      },
      { status: 401 },
    );
  }

  // We are sure the user is authenticated

  // 4. Create a token
  const token = crypto.randomBytes(100).toString('base64');

  // 5. create a csrf seed
  const csrfSecret = createCsrfSecret();
  // 6. Create the session record

  const session = await createSession(
    token,
    userWithPasswordHash.id,
    csrfSecret,
  );

  if (!session) {
    return NextResponse.json(
      {
        error: 'Error creating the new session',
      },
      { status: 500 },
    );
  }

  // 6. Send the new cookie in the headers
  cookies().set({
    name: 'sessionToken',
    value: session.token,
    ...secureCookieOptions,
  });

  return NextResponse.json(
    {
      user: {
        username: userWithPasswordHash.username,
        id: userWithPasswordHash.id,
      },
    },
    {
      status: 200,
    },
  );
}
