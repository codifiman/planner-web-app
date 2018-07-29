// containers/ShoppingListItems
import React, { Children, Component, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  getShoppingListItems as selectShoppingListItems,
  getShoppingListItemsReady,
} from 'modules/shopping_list_items/selectors';

import { getShoppingListItems } from 'modules/shopping_list_items/actionCreators';

const withProps = (child, props) => (
  child && child.type && child.type.propTypes && child.type.propTypes.shoppingListItems
    ? cloneElement(child, props)
    : child
);

export class BaseShoppingListItemsContainer extends Component {
  componentDidMount() {
    const { fetchItems } = this.props;

    fetchItems();
  }

  render() {
    const { children, ready, shoppingListItems } = this.props;
    const newProps = { ready, shoppingListItems };
    const withItems = Children.map(children, (c) => withProps(c, newProps));

    return ready ? (withItems || null) : null;
  }
};

BaseShoppingListItemsContainer.propTypes = {
  shoppingListId: PropTypes.string,
};

const mapState = (state) => ({
  ready:             getShoppingListItemsReady(state),
  shoppingListItems: selectShoppingListItems(state),
});

const mapDispatch = (dispatch) => ({
  fetchItems: () => dispatch(getShoppingListItems()),
});

BaseShoppingListItemsContainer.displayName = 'ShoppingListItemsContainer';
export const ShoppingListItemsContainer = connect(mapState, mapDispatch)(BaseShoppingListItemsContainer);
