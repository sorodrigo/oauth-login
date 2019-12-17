import React from 'react';
import styles from './message.module.scss';

type Props = {
  code: number,
  text: string
};

function Message(props: Props) {
  const { code, text } = props;
  return (
    <section className={styles.message}>
      <div className={styles.container}>
        <p className={styles.notice}>
          {code && <span className={styles.code}>{code}</span>}
          {text}
        </p>
      </div>
    </section>
  );
}

export default Message;
