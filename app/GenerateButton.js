'use client';

import { useRouter } from 'next/navigation';
import randomColor from 'randomcolor';
import { useEffect, useState } from 'react';
import styles from './GenerateButton.module.scss';

export default function GenerateButton() {
  const [color, setColor] = useState();
  const router = useRouter();

  useEffect(() => {
    // We DON'T USE document.cookie this is not a nice API
    // DON'T COPY THIS!!!!
    const allCookies = document.cookie;
    const buttonColor = allCookies
      .split('; ')
      .find((row) => row.startsWith('buttonColor='))
      ?.split('=')[1];
    // -------------------------

    setColor(buttonColor || randomColor());
  }, []);

  return (
    <button
      className={styles.generateButton}
      style={{ backgroundColor: color }}
      onClick={() => {
        const newColor = randomColor();

        // We DON'T USE document.cookie this is not a nice API
        // DON'T COPY THIS!!!!
        document.cookie = `buttonColor=${newColor}`;
        // -------------------------

        setColor(newColor);

        router.refresh(); // revalidate the Client Cache and trigger a server request
      }}
    >
      Generate
    </button>
  );
}
