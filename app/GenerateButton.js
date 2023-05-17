'use client';
import randomColor from 'randomcolor';
import { useState } from 'react';
import styles from './GenerateButton.module.scss';

export default function GenerateButton() {
  const [color, setColor] = useState(randomColor());
  return (
    <button
      className={styles.generateButton}
      style={{ backgroundColor: color }}
      onClick={() => setColor(randomColor())}
    >
      Generate
    </button>
  );
}
