import React from 'react';
import { UserRepo } from '../../user';

import styles from './repo.module.scss';

function Repo(props: UserRepo) {
  return (
    <a href={props.html_url} target="_blank" rel="noopener noreferrer" className={styles.repo}>
      <div className={styles.heading}>
        <span className={styles.stars}>⭐️ x {props.stargazers_count}</span>
        <span className={styles.name}>{props.full_name}</span>
      </div>
      <p className={styles.description}>{props.description}</p>
    </a>
  );
}

export default Repo;
