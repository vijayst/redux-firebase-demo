import ActionTypes from '../constants/action_types';
import database from './database';

export function getInvite() {
  return dispatch => {
    dispatch(getInviteRequestedAction());
    return database.ref('/').once('value', snap => {
      const invite = snap.val();
      dispatch(getInviteFulfilledAction(invite))
    })
    .catch((error) => {
      console.log(error);
      dispatch(getInviteRejectedAction());
    });
  }
}


function getInviteRequestedAction() {
  return {
    type: ActionTypes.GetInviteRequested
  };
}

function getInviteRejectedAction() {
  return {
    type: ActionTypes.GetInviteRejected
  }
}

function getInviteFulfilledAction(invite) {
  return {
    type: ActionTypes.GetInviteFulfilled,
    invite
  };
}
