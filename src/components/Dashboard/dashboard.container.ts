import { connect } from 'react-redux';
import Dashboard from './dashboard.component';
import { getRepos } from '../../user';
import { AppState } from '../../index';

const mapStateToProps = (state: AppState) => ({
  repos: state.user.repos
});

const mapDispatchToProps = {
  getRepos
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
