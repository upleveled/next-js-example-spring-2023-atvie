import './globals.scss';
import { Roboto_Mono } from 'next/font/google';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { ReactNode } from 'react';
import { getUserBySessionToken } from '../database/users';
import { logout } from './(auth)/logout/actions';
import { CookieBanner } from './CookieBanner';
import styles from './layout.module.scss';

export const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: { default: 'Next Example | UpLeveled', template: '%s | UpLeveled' },
  description: 'Generated by create next app',
};

type Props = {
  children: ReactNode;
};

export default async function RootLayout({ children }: Props) {
  // 1. get the session token from the cookie
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');

  const user = !sessionToken?.value
    ? undefined
    : await getUserBySessionToken(sessionToken.value);

  return (
    <html lang="en" className={robotoMono.className}>
      <body style={{ backgroundColor: 'rgb(0, 31, 57)' }}>
        <CookieBanner />
        <nav className={styles.navigator}>
          <div>
            <Link href="/">home</Link> <Link href="/animals">animals</Link>{' '}
            <Link href="/fruits">fruits</Link>
            <Link href="/animals-admin">admin</Link>
            <Link href="/animals/paginated">paginated</Link>
            {Math.floor(Math.random() * 10)}
          </div>
          <div>
            {user ? (
              <>
                <div>{user.username}</div>
                <form>
                  <button className={styles.logoutButton} formAction={logout}>
                    logout
                  </button>
                </form>
              </>
            ) : (
              <>
                <Link href="/register">register</Link>
                <Link href="/login">login</Link>
              </>
            )}
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
