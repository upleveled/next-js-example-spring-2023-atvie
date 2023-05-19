import { cookies } from 'next/headers';

export function getCookie(name) {
  return cookies().get(name)?.value;
}
