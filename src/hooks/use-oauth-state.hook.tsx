import { useEffect, useState } from 'react';

export function useOAuthState(): string | null {
  const key = 'oAUTH_LOGIN_STATE_SORODRIGO';
  let [state, setState] = useState<string | null>(localStorage.getItem(key));
  useEffect(() => {
    const LOST_TV_SHOW_NUMBERS = 4815162342;
    const TIMEOUT = 599999; // 10 min matching github's code expiry time
    const hasExpired = state && Number(atob(state).split('_')[0]) < Date.now() - TIMEOUT;

    // if it doesnt exist or it has expired we create a new state
    if (!state || hasExpired) {
      const timestamp = Date.now();
      const text = btoa(`${timestamp}_${timestamp + LOST_TV_SHOW_NUMBERS}`);
      localStorage.setItem(key, text);
      setState(text);
    }
    // we just want to do it once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return state;
}
