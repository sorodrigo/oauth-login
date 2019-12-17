import React, { useEffect, useState } from 'react';
import styles from './home.module.scss';
import { ReactComponent as GithubIcon } from '../../icons/github.svg';
import qs from 'query-string';

const params = {
  client_id: process.env.REACT_APP_CLIENT_ID,
  scopes: 'read:user public_repo'
};

function useOAuthState(): string | null {
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

function Home() {
  const state = useOAuthState();
  const authorizeUrl = `https://github.com/login/oauth/authorize?${qs.stringify(params)}&state=${state}`;
  return (
    <section className={styles.home}>
      <div className={styles.loginBox}>
        <a href={authorizeUrl} className={styles.githubLink}>
          <span className={styles.iconContainer}>
            <GithubIcon className={styles.icon} />
          </span>
          Sign up with Github
        </a>
      </div>
    </section>
  );
}

export default Home;
