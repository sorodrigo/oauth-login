import { connect } from 'react-redux';
import Admin from './admin.component';
import { getDetails } from '../../user';
import { AppState } from '../../index';

const mapStateToProps = (state: AppState) => ({
  section: state.location.type,
  details: state.user.details
});

const mapDispatchToProps = {
  getDetails
};

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(Admin);
