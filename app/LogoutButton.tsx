import { logout } from './(auth)/logout/actions';
import styles from './LogoutButton.module.scss';

export function LogoutButton() {
  return (
    <form>
      <button className={styles.button} formAction={logout}>
        logout
      </button>
    </form>
  );
}
