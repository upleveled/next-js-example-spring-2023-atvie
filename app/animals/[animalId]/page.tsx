import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getAnimalById } from '../../../database/animals';

type Props = {
  params: {
    animalId: string;
  };
};

export default async function AnimalPage(props: Props) {
  const singleAnimal = await getAnimalById(Number(props.params.animalId));

  if (!singleAnimal) {
    notFound();
  }

  return (
    <main>
      <h1>{singleAnimal.firstName}</h1>
      <Image
        src={`/images/${singleAnimal.firstName}.png`}
        alt={singleAnimal.firstName}
        width={200}
        height={200}
      />
      this is a {singleAnimal.type} carrying a {singleAnimal.accessory}
    </main>
  );
}
