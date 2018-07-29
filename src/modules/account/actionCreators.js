// account/actionCreators

import { LOG_IN_REQ, LOG_IN_RES } from './actions';
import { post } from 'lib/fetch';

export const logIn = (request) => (dispatch, getState) => {
  const state = getState();

  if (!state.account.ready) {
    dispatch({ type: LOG_IN_REQ, request });
    post('/login', request).then((response) => {
      dispatch({ type: LOG_IN_RES, response });
    })
  }
};
