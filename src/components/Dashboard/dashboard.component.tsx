import React from 'react';
import styles from './dashboard.module.scss';
import { UserDetails } from '../../user';

type Props = {
  details: UserDetails;
};

function Dashboard(props: Props) {
  return <section className={styles.dashboard} />;
}

export default Dashboard;
