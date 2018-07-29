// shopping_list_items/selectors
import { filter, values } from 'lodash-es';
import { createSelector } from 'reselect';

import { getDefaultShoppingListId } from 'modules/account/selectors';

export const getShoppingListItemsReady = (state, props={}) => {
  const listId = props.id || getDefaultShoppingListId(state);

  return state.shopping_list_items.readyByShoppingList[listId] === true;
};

export const getShoppingListItems = (state, props={}) => {
  const shoppingListId = props.id || getDefaultShoppingListId(state);
  const allItems = values(state.shopping_list_items.collection);

  return filter(allItems, { shoppingListId });
};

export const getShoppingListItem = (state, { listItemId }) => {
  return state.shopping_list_items.collection[listItemId] || {};
};

export const getIsListItemComplete = createSelector(
  getShoppingListItem,
  (shoppingListItem) => shoppingListItem.complete || false,
);
