'use client';

import { useEffect, useState } from 'react';
import { parseJson } from '../util/json';
import { getLocalStorage, setLocalStorage } from '../util/localStorage';
import style from './CookieBanner.module.scss';

export function CookieBanner() {
  const [areCookiesTermsAccepted, setAreCookiesTermsAccepted] = useState(false);

  useEffect(() => {
    const localStorageValue = getLocalStorage('cookiePolicy');
    if (localStorageValue) {
      setAreCookiesTermsAccepted(parseJson(localStorageValue));
    }
  }, []);

  return (
    <div
      className={`${style.cookieBanner} ${
        areCookiesTermsAccepted ? style.closed : style.open
      }`}
    >
      <div>This is the cookie Police. Please accept terms and conditions</div>
      <button
        onClick={() => {
          setLocalStorage('cookiePolicy', JSON.stringify(true));
          setAreCookiesTermsAccepted(true);
        }}
      >
        accept
      </button>
    </div>
  );
}
