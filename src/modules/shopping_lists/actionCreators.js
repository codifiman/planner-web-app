// shopping_lists/actionCreators
import { get } from 'lib/fetch';
import {
  GET_SHOPPING_LIST_REQ, GET_SHOPPING_LIST_RES, GET_SHOPPING_LIST_ERR,
} from './actions';

import { getDefaultShoppingListId } from 'modules/account/selectors';

export const getShoppingList = (props={}) => (dispatch, getState) => {
  const state = getState();

  const id = props.id || getDefaultShoppingListId(state);

  get(`/shopping_list/${id}`).then((response) => {
    dispatch({ type: GET_SHOPPING_LIST_RES, response, request: { id } });
  });
};
