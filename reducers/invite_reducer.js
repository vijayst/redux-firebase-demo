import ActionTypes from '../constants/action_types';

export function inviteReducer(state = {}, action) {
  switch(action.type) {
    case ActionTypes.GetInviteRequested: {
      return Object.assign({}, state, {
        inProgress: true,
        error: '',
        success: ''
      });
    }
    case ActionTypes.GetInviteRejected: {
      return Object.assign({}, state, {
        inProgress: false,
        error: 'Error in getting invite.',
      });
    }
    case ActionTypes.GetInviteFulfilled: {
      return Object.assign({}, state, {
        inProgress: false,
        success: 'Got invite.'
      }, action.invite);
    }
    default:
      return state;
  }
}
