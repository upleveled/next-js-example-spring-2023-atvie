'use client';
// import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Animal } from '../../../migrations/1684915044-createTableAnimals';
import styles from './Dashboard.module.scss';

type Props = {
  animals: Animal[];
};

export default function Dashboard(props: Props) {
  const [animals, setAnimals] = useState<Animal[]>(props.animals);

  return (
    <div>
      <div>
        {animals.map((animal) => (
          <div key={`animal-${animal.id}`}>
            {animal.firstName}
            {animal.type}
            {animal.accessory}
          </div>
        ))}
      </div>
      <button
        className={styles.button}
        onClick={async () => {
          // how many animals are in the screen right now
          const animalCount = animals.length;

          const response = await fetch(
            `/api/animals?limit=3&offset=${animalCount}`,
          );

          const data = await response.json();

          setAnimals([...animals, ...data.animals]);
          // get 3 new animals
        }}
      >
        show 3 more
      </button>
    </div>
  );
}
