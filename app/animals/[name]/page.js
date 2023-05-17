import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getAnimalByName } from '../../../database/animals';

export const dynamic = 'force-dynamic';

export default function FarmPage({ params }) {
  const singleAnimal = getAnimalByName(params.name);

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
