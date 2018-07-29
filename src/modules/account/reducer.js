import update from 'immutability-helper';

import {
  LOG_IN_REQ,
  LOG_IN_RES,
  LOG_IN_ERR,
} from './actions';

const initialState = {
  email: '',
  ready: false,
};

const handlers = {
  [ LOG_IN_REQ ]: (state, { request: { email } }) => update(state, { $merge: {
    ready: false,
    email
  }}),

  [ LOG_IN_RES ]: (state, { response: { body, ok } }) => update(state, { $merge: {
    ...body,
    ready: ok,
  }}),

  [ LOG_IN_ERR ]: (state, response) => state,
};

export const reducer = (state=initialState, action={}) => {
  return action.type && handlers[action.type]
  ? handlers[action.type](state, action)
  : state;
};
