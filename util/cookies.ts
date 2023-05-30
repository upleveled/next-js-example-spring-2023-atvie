import { cookies } from 'next/headers';

export function getCookie(name: string) {
  return cookies().get(name)?.value;
}
