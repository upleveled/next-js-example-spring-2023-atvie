import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getAnimalById } from '../../../../database/animals';

export default async function AnimalPage({ params }) {
  const singleAnimal = await getAnimalById(Number(params.animalId));

  if (!singleAnimal) {
    notFound();
  }

  return (
    <main>
      <h1>{singleAnimal.firstName}</h1>
      <Image
        src={`/images/${singleAnimal.firstName}.png`}
        width={200}
        height={200}
      />
      this is a {singleAnimal.type} carrying a {singleAnimal.accessory}
    </main>
  );
}
