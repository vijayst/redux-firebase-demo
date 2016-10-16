import ActionTypes from '../constants/action_types';
import database from './database';

export function addToInvite(name) {
  return dispatch => {
    dispatch(addToInviteRequestedAction());
    const guestsRef = database.ref('/guests');
    guestsRef.push({
      name
    })
    .then(() => {
      dispatch(addToInviteFulfilledAction({ name }));
    })
    .catch((error) => {
      dispatch(addToInviteRejectedAction());
    });
  }
}


function addToInviteRequestedAction() {
  return {
    type: ActionTypes.AddToInviteRequested
  };
}

function addToInviteRejectedAction() {
  return {
    type: ActionTypes.AddToInviteRejected
  }
}

function addToInviteFulfilledAction(guest) {
  return {
    type: ActionTypes.AddToInviteFulfilled,
    guest
  };
}
