'use client';

import { useRouter } from 'next/navigation';
import styles from './LogoutButton.module.scss';

type Props = {
  logout: () => void;
};

export function LogoutButton(props: Props) {
  const router = useRouter();
  return (
    <form>
      <button
        className={styles.button}
        formAction={async () => {
          await props.logout();
          router.refresh();
        }}
      >
        logout
      </button>
    </form>
  );
}
