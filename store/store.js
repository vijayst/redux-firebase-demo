import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from "redux-logger";
import rootReducer from '../reducers/root_reducer';

const logger = createLogger();

const store = createStore(rootReducer,
  {},
  applyMiddleware(thunk, logger)
);

export default store;
