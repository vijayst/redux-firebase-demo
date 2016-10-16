import { connect } from 'react-redux';
import { getInvite } from '../actions/get_invite';
import { addToInvite } from '../actions/add_invite';
import { watchGuestAddedEvent } from '../actions/guest_added_event';
import Invite from '../components/invite.jsx';

function mapStateToProps(state) {
  return {
    invite: state.invite
  };
}

function mapDispatchToProps(dispatch) {
  watchGuestAddedEvent(dispatch);
  return {
    onGetInvite: () => dispatch(getInvite()),
    onAddToInvite: (name) => dispatch(addToInvite(name))
  };
}

const inviteContainer = connect(mapStateToProps, mapDispatchToProps)(Invite);

export default inviteContainer;
