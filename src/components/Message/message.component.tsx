import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { redirect } from 'redux-first-router';
import styles from './message.module.scss';

type Props = {
  code: number;
  text: string;
  redirectTo: string;
};

function Message(props: Props) {
  const { code, text, redirectTo } = props;
  const dispatch = useDispatch();
  useEffect(() => {
    const timeout = redirectTo && setTimeout(() => dispatch(redirect({ type: redirectTo })), 1000);
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [redirectTo, dispatch]);
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
