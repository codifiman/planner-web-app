// components/ShoppingList
import React from 'react';
import PropTypes from 'prop-types';

import { View } from 'components/View';
import { ShoppingListContainer, ShoppingListItemsContainer } from 'containers';
import { ShoppingListItem } from 'components/ShoppingListItem';
import { NewShoppingListItem } from 'components/NewShoppingListItem';

const Cards = ({ shoppingListItems=[], ready }) => (
  <div>
    { shoppingListItems.map(({ id, name, shoppingListId }) => (
      <ShoppingListItem key={id} listItemId={id} listId={shoppingListId}>{name}</ShoppingListItem>
    )) }
  </div>
);

Cards.propTypes = {
  shoppingListItems: PropTypes.array,
  ready:             PropTypes.bool,
};

const Items = ({ children, shoppingList, ready }) => (
  !ready ? null : (
    <div>
      <NewShoppingListItem shoppingListId={shoppingList.id} />
      <ShoppingListItemsContainer shoppingListId={shoppingList.id}>
        { children }
      </ShoppingListItemsContainer>
    </div>
  )
);

Items.propTypes = {
  shoppingList: PropTypes.object,
  ready:        PropTypes.bool,
};

export const ShoppingList = () => (
  <View>
    <ShoppingListContainer>
      <Items>
        <Cards />
      </Items>
    </ShoppingListContainer>
  </View>
);
