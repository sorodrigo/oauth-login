import React from 'react';
import styles from './settings.module.scss';
import { UserDetails } from '../../user';

type Props = {
  details: UserDetails;
};

function Settings(props: Props) {
  const { details } = props;
  return (
    <article className={styles.settings}>
      <figure className={styles.profile}>
        <img alt="github user avatar" className={styles.avatar} src={details.avatar_url} />
        <figcaption className={styles.description}>
          <span className={styles.name}>{details.name}</span>
          <span className={styles.login}>{details.login}</span>
          <p className={styles.bio}>{details.bio}</p>
        </figcaption>
      </figure>
    </article>
  );
}

export default Settings;
