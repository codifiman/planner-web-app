// components/ShoppingListItem
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Checkbox } from 'components/Checkbox';

import { toggleListItemComplete } from 'modules/shopping_list_items/actionCreators';
import { getIsListItemComplete } from 'modules/shopping_list_items/selectors';

import * as styles from './ShoppingListItem.css';

export const BaseShoppingListItem = ({ checked, children, listItemId, toggleComplete }) => (
  <div className={styles.ShoppingListItem}>
    <Checkbox id={listItemId} checked={checked} onChange={toggleComplete}>
      { children }
    </Checkbox>
  </div>
);

BaseShoppingListItem.propTypes = {
  listId:     PropTypes.string.isRequired,
  listItemId: PropTypes.string.isRequired,
};

const mapState = (state, { listItemId }) => ({
  checked: getIsListItemComplete(state, { listItemId }),
});

const mapDispatch = (dispatch, { listId, listItemId }) => ({
  toggleComplete: () => dispatch(toggleListItemComplete({ listId, listItemId })),
});

export const ShoppingListItem = connect(mapState, mapDispatch)(BaseShoppingListItem);
