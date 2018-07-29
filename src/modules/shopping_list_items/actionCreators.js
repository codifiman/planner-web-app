// shopping_list_items/actionCreators
import { get, post } from 'lib/fetch';
import {
  GET_SHOPPING_LIST_ITEMS_REQ, GET_SHOPPING_LIST_ITEMS_RES, GET_SHOPPING_LIST_ITEMS_ERR,
  CREATE_SHOPPING_LIST_ITEM_REQ, CREATE_SHOPPING_LIST_ITEM_RES, CREATE_SHOPPING_LIST_ITEM_ERR,
  TOGGLE_ITEM_COMPLETE_REQ, TOGGLE_ITEM_COMPLETE_RES, TOGGLE_ITEM_COMPLETE_ERR,
} from './actions';

import { getDefaultShoppingListId, getAccountId } from 'modules/account/selectors';

export const getShoppingListItems = (props={}) => (dispatch, getState) => {
  const state = getState();

  const listId = props.listId || getDefaultShoppingListId(state);
  const request = { listId };

  dispatch({ type: GET_SHOPPING_LIST_ITEMS_REQ, request });

  get(`/shopping_list/${listId}/items`).then((response) => {
    dispatch({ type: GET_SHOPPING_LIST_ITEMS_RES, request, response });
  });
};

export const createShoppingListItem = ({ listId, name }) => (dispatch, getState) => {
  const state = getState();

  const shoppingListId = listId || getDefaultShoppingListId(state);
  const accountId = getAccountId(state);

  const request = { accountId, name };

  dispatch({ type: CREATE_SHOPPING_LIST_ITEM_REQ, request: request });

  post(`/shopping_list/${shoppingListId}/items`, request).then((response) => {
    dispatch({ type: CREATE_SHOPPING_LIST_ITEM_RES, request, response });
  });
}

export const toggleListItemComplete = ({ listId, listItemId }) => (dispatch, getState) => {
  const state = getState();

  const id = listId || getDefaultShoppingListId(state);
  const request = { listId: id, listItemId };

  dispatch({ type: TOGGLE_ITEM_COMPLETE_REQ, request });

  post(`/shopping_list/${id}/items/${listItemId}/toggleComplete`).then((response) => {
    dispatch({ type: TOGGLE_ITEM_COMPLETE_RES, request, response });
  });
}
