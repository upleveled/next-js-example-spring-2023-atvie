import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
  getAnimalsWithFoods,
  getAnimalWithFoodsById,
} from '../../../../database/animals';
import { getAnimalWithFoods } from '../../../../util/dataStructures';

type Props = {
  params: {
    animalId: string;
  };
};

export default async function AnimalPage(props: Props) {
  const animalsFoods = await getAnimalsWithFoods(Number(props.params.animalId));

  const animalWithFoodsJsonAgg = await getAnimalWithFoodsById(
    Number(props.params.animalId),
  );

  if (!animalWithFoodsJsonAgg) {
    notFound();
  }

  const animalWithFoods = getAnimalWithFoods(animalsFoods);

  return (
    <main>
      <h1>
        {animalWithFoods.firstName} (using data transformation in TypeScript)
      </h1>
      <Image
        src={`/images/${animalWithFoods.firstName}.png`}
        alt={`A picture of ${animalWithFoods.firstName}`}
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
      <h1>
        {animalWithFoodsJsonAgg.animalName} (using data transformation in SQL
        using json_agg)
      </h1>
      <Image
        src={`/images/${animalWithFoodsJsonAgg.animalName}.png`}
        alt={`A picture of ${animalWithFoodsJsonAgg.animalName}`}
        width={200}
        height={200}
      />
      this is a {animalWithFoodsJsonAgg.animalType} carrying a{' '}
      {animalWithFoodsJsonAgg.animalAccessory} who likes:
      <ul>
        {animalWithFoodsJsonAgg.animalFoods?.map((animalFood) => {
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
