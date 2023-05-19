import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getAnimalById } from '../../../database/animals';

export const dynamic = 'force-dynamic';

export default function AnimalPage({ params }) {
  const singleAnimal = getAnimalById(Number(params.animalId)); // Convert the string into a number

  console.log(singleAnimal);

  if (!singleAnimal) {
    notFound();
  }

  return (
    <main>
      <h1>{singleAnimal.name}</h1>
      <Image
        src={`/images/${singleAnimal.name}.png`}
        width={200}
        height={200}
      />
      this is a {singleAnimal.type} carrying a {singleAnimal.object}
    </main>
  );
}
