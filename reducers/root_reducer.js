import { combineReducers } from 'redux';
import { inviteReducer } from './invite_reducer';

const rootReducer = combineReducers({
  invite: inviteReducer
});

export default rootReducer;
