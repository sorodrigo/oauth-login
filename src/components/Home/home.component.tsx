import React from 'react';
import styles from './home.module.scss';
import { ReactComponent as GithubIcon } from '../../icons/github.svg';
import qs from 'query-string';

type Props = {
  oAuthState: string | null
};

const params = {
  client_id: process.env.REACT_APP_CLIENT_ID,
  scopes: 'read:user public_repo'
};

function Home(props: Props) {
  const { oAuthState } = props;
  const authorizeUrl = `https://github.com/login/oauth/authorize?${qs.stringify(params)}&state=${oAuthState}`;
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
