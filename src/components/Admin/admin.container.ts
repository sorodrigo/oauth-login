import { connect } from 'react-redux';
import Admin from './admin.component';
import { getDetails } from '../../user'

const mapStateToProps = (state: any) => ({
  section: state.location.type,
  details: state.user.details
});

const mapDispatchToProps = {
  getDetails
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
