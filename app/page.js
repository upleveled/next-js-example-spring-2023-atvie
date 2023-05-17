import Image from 'next/image';
import cat from '../public/images/cat.jpeg';
import GenerateButton from './GenerateButton';

export default function HomePage() {
  return (
    <main>
      <GenerateButton />
      Hello UpLeveled
      <br />
      {/* This is not optimized please don't use it */}
      <img src="/images/cat.jpeg" alt="cat sleeping" width="500" />
      {/* This is a way to do it with next/image its ok */}
      <Image
        src="/images/cat.jpeg"
        alt="cat sleeping"
        width="600"
        height="301"
      />
      {/* This is an alternative way to do it with next/image its ok */}
      <Image src={cat} alt="cat sleeping" />
    </main>
  );
}
