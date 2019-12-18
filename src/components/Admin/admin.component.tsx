import React, { Suspense, useEffect } from 'react';
import styles from './admin.module.scss';
import { UserDetails } from '../../user';
import { NavLink } from 'redux-first-router-link';

const Dashboard = React.lazy(() => import('../Dashboard/dashboard.container'));
const Settings = React.lazy(() => import('../Settings/settings.component'));

type Props = {
  section: 'dashboard' | 'settings';
  getDetails: () => void;
  details: UserDetails;
};

function Admin(props: Props) {
  const { section, getDetails, details } = props;

  useEffect(() => {
    getDetails();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.links}>
          <NavLink
            to={{ type: 'dashboard' }}
            className={styles.link}
            activeClassName={styles.activeLink}
          >
            Dashboard
          </NavLink>
          <NavLink
            to={{ type: 'settings' }}
            className={styles.link}
            activeClassName={styles.activeLink}
          >
            Settings
          </NavLink>
        </div>
        {details && (
          <div className={styles.nameContainer}>
            <div
              className={styles.avatar}
              style={{ backgroundImage: `url(${details.avatar_url})` }}
            />
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={details.html_url}
              className={styles.name}
            >
              {details.name || details.login}
            </a>
          </div>
        )}
      </nav>
      <section className={styles.admin}>
        <Suspense fallback={null}>
          {section === 'dashboard' && <Dashboard />}
          {section === 'settings' && <Settings details={details} />}
        </Suspense>
      </section>
    </>
  );
}

export default Admin;
