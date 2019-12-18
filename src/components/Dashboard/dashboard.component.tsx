import React, { useEffect } from 'react';
import styles from './dashboard.module.scss';
import { UserRepo } from '../../user';
import Repo from '../../components/Repo/repo.component';

type Props = {
  repos: Array<UserRepo>;
  getRepos: () => void;
};

function Dashboard(props: Props) {
  const { repos, getRepos } = props;

  useEffect(() => {
    getRepos();
    // eslint-disable-next-line
  }, []);
  return (
    <div className={styles.dashboard}>
      <ul className="row -equal-height">
        {repos.map(repo => (
          <li key={repo.id} className="column small-12 medium-4">
            <Repo {...repo} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
