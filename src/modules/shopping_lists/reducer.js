// modules/shopping_list/reducer
import update from 'immutability-helper';

import {
  GET_SHOPPING_LIST_REQ, GET_SHOPPING_LIST_RES, GET_SHOPPING_LIST_ERR,
} from './actions';

const initialState = {
  ready: false,
  collection: {},
};

const handlers = {
  [ GET_SHOPPING_LIST_REQ ]: (state, { id }) => update(state, { $merge: {
    collection: update(state.collection, { $merge: {
      [ id ]: update(state.collection[id] || {}, { $merge: { ready: false } })
    }})
  }}),

  [ GET_SHOPPING_LIST_RES ]: (state, { response: { body, ok }, request: { id } }) => (
    update(state, { $merge: {
      collection: update(state.collection, { $merge: {
        [ id ]: update(state.collection[id] || {}, { $merge: { ready: ok, ...body } }),
      }})
    }})
  ),
};

export const reducer = (state=initialState, action={}) => {
  return action.type && handlers[action.type]
  ? handlers[action.type](state, action)
  : state;
};
