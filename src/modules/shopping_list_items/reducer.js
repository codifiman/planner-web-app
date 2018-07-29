// modules/shopping_list_items/reducer
import update from 'immutability-helper';
import { store } from 'redux';
import { keyBy, map } from 'lodash-es';

import { getShoppingListItem } from 'modules/shopping_list_items/selectors';

import {
  GET_SHOPPING_LIST_ITEMS_REQ, GET_SHOPPING_LIST_ITEMS_RES, GET_SHOPPING_LIST_ITEMS_ERR,
  CREATE_SHOPPING_LIST_ITEM_REQ, CREATE_SHOPPING_LIST_ITEM_RES, CREATE_SHOPPING_LIST_ITEM_ERR,
  TOGGLE_ITEM_COMPLETE_REQ, TOGGLE_ITEM_COMPLETE_RES, TOGGLE_ITEM_COMPLETE_ERR,
} from './actions';

const initialState = {
  collection: {},
  readyByShoppingList: {},
};

const handlers = {
  [ CREATE_SHOPPING_LIST_ITEM_RES ]: (state, { response: { body, ok } }) => (
    update(state, { $merge: {
      collection: update(state.collection, { $merge: {
        [ body.id ]: body,
      }})
    }})
  ),

  [ GET_SHOPPING_LIST_ITEMS_REQ ]: (state, { request: { listId } }) => (
    update(state, { $merge: {
      readyByShoppingList: update(state.readyByShoppingList, { $merge: {
        [ listId ]: false
      }}),
    }})
  ),

  [ GET_SHOPPING_LIST_ITEMS_RES ]: (state, { response: { body, ok }, request: { listId } }) => {
    const listItems = map(body.Items, (li) => update(state.collection[li.id] || {}, { $merge: li }));

    return update(state, { $merge: {
      collection: update(state.collection, { $merge: keyBy(listItems, 'id') }),
      readyByShoppingList: update(state.readyByShoppingList, { $merge: {
        [ listId ]: true,
      }})
    }})
  },

  [ TOGGLE_ITEM_COMPLETE_REQ ]: (state, { request: { listItemId } }) => {
    const item = state.collection[listItemId] || {};

    return update(state, { $merge: {
      collection: update(state.collection, { $merge: {
        [ listItemId ]: update(state.collection[listItemId] || {}, { $merge: {
          complete: !item.complete,
        }}),
      }}),
    }})
  },

  [ TOGGLE_ITEM_COMPLETE_RES ]: (state, { request: { listItemId }, response: { body } }) => {
    return update(state, { $merge: {
      collection: update(state.collection, { $merge: {
        [ listItemId ]: update(state.collection[listItemId] || {}, { $merge: body }),
      }})
    }});
  }
};

export const reducer = (state=initialState, action={}) => {
  return action.type && handlers[action.type]
  ? handlers[action.type](state, action)
  : state;
};
