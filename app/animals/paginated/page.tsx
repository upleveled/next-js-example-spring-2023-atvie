import { getAnimalsWithLimitAndOffset } from '../../../database/animals';
import Dashboard from './Dashboard';

// Use 'force-dynamic' on pages using database queries in the server component to prevent your deployment to fail.
export const dynamic = 'force-dynamic';

export default async function AnimalAdminPage() {
  const animals = await getAnimalsWithLimitAndOffset(2, 0);

  return <Dashboard animals={animals} />;
}
