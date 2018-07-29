// containers/ShoppingList
import React, { Children, Component, cloneElement } from 'react';
import { connect } from 'react-redux';

import {
  getShoppingList as selectShoppingList,
  getShoppingListReady,
} from 'modules/shopping_lists/selectors';

import { getShoppingList } from 'modules/shopping_lists/actionCreators';

const withProps = (child, props) => (
  child && child.type && child.type.propTypes && child.type.propTypes.shoppingList
    ? cloneElement(child, props)
    : child
);

export class BaseShoppingListContainer extends Component {
  componentDidMount() {
    const { fetchLists } = this.props;

    fetchLists();
  }

  render() {
    const { children, ready, shoppingList } = this.props;
    const newProps = { ready, shoppingList };
    const withList = Children.map(children, (c) => withProps(c, newProps));

    return ready ? (withList || null) : null;
  }
};

const mapState = (state) => ({
  ready:        getShoppingListReady(state),
  shoppingList: selectShoppingList(state),
});

const mapDispatch = (dispatch) => ({
  fetchLists: () => dispatch(getShoppingList()),
});

BaseShoppingListContainer.displayName = 'ShoppingListContainer';
export const ShoppingListContainer = connect(mapState, mapDispatch)(BaseShoppingListContainer);
