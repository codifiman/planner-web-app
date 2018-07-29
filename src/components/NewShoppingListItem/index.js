// components/NewShoppingListItem
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Button } from 'components/Button';
import { TextInput } from 'components/TextInput';

import { createShoppingListItem } from 'modules/shopping_list_items/actionCreators';

import * as classes from './NewShoppingListItem.css';

export class BaseNewShoppingListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
    };

    this.updateName = this.updateName.bind(this);
    this.submit = this.submit.bind(this);
  }

  updateName(ev) {
    this.setState({ name: ev.target.value });
  }

  submit() {
    this.props.createItem(this.state.name);
    this.setState({ name: '' });
  }

  render() {
    const { createItem } = this.props;

    return (
      <div className={classes.newShoppingListItem}>
        <TextInput
          onChange={this.updateName}
          placeholder='What to buy...'
          type="text"
          value={this.state.name}
        />
        <Button
          disabled={!this.state.name}
          onClick={this.submit}
          variant='contained'>
          Add New Item
        </Button>
      </div>
    );
  }
};

const mapDispatch = (dispatch, { listId }) => ({
  createItem: (name) => {
    dispatch(createShoppingListItem({ listId, name }));
  },
});

export const NewShoppingListItem = connect(null, mapDispatch)(BaseNewShoppingListItem);
