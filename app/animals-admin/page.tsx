import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getAnimals } from '../../database/animals';
import { getValidSessionByToken } from '../../database/sessions';
import { createTokenFromSecret } from '../../util/csrf';
import AnimalsForm from './AnimalsForm';

export default async function AnimalsAdminPage() {
  // 1. Check if the sessionToken cookie exit
  const sessionTokenCookie = cookies().get('sessionToken');

  // 2. check if the sessionToken has a valid session

  const session =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));

  // 3. Either redirect or render the login form
  if (!session) redirect('/login?returnTo=/animals-admin');

  console.log('from animals admin', session);
  const csrfToken = createTokenFromSecret(session.csrfSecret);

  const animals = await getAnimals();

  return <AnimalsForm animals={animals} csrfToken={csrfToken} />;
}
