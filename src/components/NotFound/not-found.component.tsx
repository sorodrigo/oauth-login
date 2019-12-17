import React from 'react';
import styles from './not-found.module.scss';

function NotFound() {
  return (
    <section className={styles.notFound}>
      <div className={styles.container}>
        <p className={styles.notice}>
          <span className={styles.code}>
            404
          </span>
          page not found.
        </p>
      </div>
    </section>
  );
}

export default NotFound;
