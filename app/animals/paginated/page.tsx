import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getAnimalsWithLimitAndOffset } from '../../../database/animals';
import { getValidSessionByToken } from '../../../database/sessions';
import Dashboard from './Dashboard';

export default async function AnimalAdminPage() {
  // 1. Check if the sessionToken cookie exit
  const sessionTokenCookie = cookies().get('sessionToken');

  // 2. check if the sessionToken has a valid session

  const session =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));

  // 3. Either redirect or render the login form
  if (!session) redirect('/login?returnTo=/animals/paginated');

  // get the user by session

  const animals = await getAnimalsWithLimitAndOffset(2, 0);

  return <Dashboard animals={animals} />;
}
