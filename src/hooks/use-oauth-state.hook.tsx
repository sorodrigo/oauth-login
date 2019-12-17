import { useEffect, useState } from 'react';

export function useOAuthState(): string | null {
  const key = 'oAUTH_LOGIN_STATE_SORODRIGO';
  let [state, setState] = useState(localStorage.getItem(key));
  useEffect(() => {
    const LOST_TV_SHOW_NUMBERS = 4815162342;
    const hasExpired = state && Number(atob(state).split('_')[0]) < Date.now() - 120000;

    // if it doesnt exist or it has expired we create a new state
    if (!state || hasExpired) {
      const timestamp = Date.now();
      const text = btoa(`${timestamp}_${timestamp + LOST_TV_SHOW_NUMBERS}`);
      localStorage.setItem(key, text);
      setState(text);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return state;
}
