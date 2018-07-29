import { getDefaultShoppingListId } from 'modules/account/selectors';

export const getShoppingListReady = (state, props={}) => {
  const id = props.id || getDefaultShoppingListId(state);

  return state.shopping_lists.collection[id] && state.shopping_lists.collection[id].ready
};

export const getShoppingList = (state, props={}) => {
  const id = props.id || getDefaultShoppingListId(state);

  return state.shopping_lists.collection[id];
};
