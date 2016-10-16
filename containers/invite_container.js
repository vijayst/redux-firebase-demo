import { connect } from 'react-redux';
import { getInvite } from '../actions/get_invite';
import Invite from '../components/invite.jsx';

function mapStateToProps(state) {
  return {
    invite: state.invite
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onGetInvite: () => dispatch(getInvite())
  };
}

const inviteContainer = connect(mapStateToProps, mapDispatchToProps)(Invite);

export default inviteContainer;
