import Image from 'next/image';
import Link from 'next/link';
import { animals } from '../../database/animals';

export const metadata = {
  title: 'Animals page',
  description: 'My favorite animals',
};

export default function AnimalsPage() {
  return (
    <main>
      This are my animals
      {animals.map((animal) => {
        return (
          <div key={`animal-div-${animal.id}`}>
            <Link href={`/animals/${animal.id}`}>{animal.firstName}</Link>
            <br />
            <Image
              src={`/images/${animal.firstName}.png`}
              width={100}
              height={100}
            />
          </div>
        );
      })}
    </main>
  );
}
