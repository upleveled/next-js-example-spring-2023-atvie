import { getAnimals } from '../../database/animals';
import AnimalsForm from './AnimalsForm';

export default async function AnimalsAdminPage() {
  const animals = await getAnimals();
  return <AnimalsForm animals={animals} />;
}
