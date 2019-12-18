import { connect } from 'react-redux';
import Dashboard from './dashboard.component';
import { getRepos } from '../../user';

const mapStateToProps = (state: any) => ({
  repos: state.user.repos
});

const mapDispatchToProps = {
  getRepos
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
