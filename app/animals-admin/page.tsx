import { getAnimals } from '../../database/animals';
import AnimalsForm from './AnimalsForm';

// Use 'force-dynamic' on pages using database queries in the server component to prevent your deployment to fail.
export const dynamic = 'force-dynamic';

export default async function AnimalsAdminPage() {
  const animals = await getAnimals();
  return <AnimalsForm animals={animals} />;
}
