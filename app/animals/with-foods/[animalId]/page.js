import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
  getAnimalById,
  getAnimalsWithFoods,
  getAnimalWithFoodsById,
} from '../../../../database/animals';
import { getAnimalWithFoods } from '../../../../util/dataStructure';

export const dynamic = 'force-dynamic';

export default async function AnimalPage({ params }) {
  const singleAnimal = await getAnimalById(Number(params.animalId));
  const animalsFoods = await getAnimalsWithFoods(Number(params.animalId));

  const animalWithFoodsJsonAgg = await getAnimalWithFoodsById(
    Number(params.animalId),
  );

  if (!singleAnimal) {
    notFound();
  }

  const animalWithFoods = getAnimalWithFoods(animalsFoods);

  return (
    <main>
      <h1>{animalWithFoods.firstName}</h1>
      <Image
        src={`/images/${animalWithFoods.firstName}.png`}
        width={200}
        height={200}
      />
      this is a {animalWithFoods.type} carrying a {animalWithFoods.accessory}{' '}
      who likes:
      <ul>
        {animalWithFoods.animalFoods.map((animalFood) => {
          return (
            <li key={` This-${animalFood.name}-${animalFood.id}`}>
              {animalFood.name} ({animalFood.type})
            </li>
          );
        })}
      </ul>
      <br />
      <br />
      <br />
      <h1>{animalWithFoodsJsonAgg.animalName}</h1>
      <Image
        src={`/images/${animalWithFoodsJsonAgg.animalName}.png`}
        width={200}
        height={200}
      />
      this is a {animalWithFoodsJsonAgg.animalType} carrying a{' '}
      {animalWithFoodsJsonAgg.animalAccessory} who likes:
      <ul>
        {animalWithFoodsJsonAgg.animalFoods.map((animalFood) => {
          return (
            <li key={` This-${animalFood.name}-${animalFood.id}`}>
              {animalFood.name} ({animalFood.type})
            </li>
          );
        })}
      </ul>
    </main>
  );
}
