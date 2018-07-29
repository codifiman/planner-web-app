// components/TextInput
import React from 'react';
import PropTypes from 'prop-types';

import * as classes from './TextInput.css';

export const TextInput = ({ type, onChange, placeholder, value }) => (
  <input
    className={classes.textinput}
    onChange={onChange}
    placeholder={placeholder}
    type={type}
    value={value}
  />
);

TextInput.propTypes = {
  type:        PropTypes.oneOf([ 'text', 'email' ]),
  onChange:    PropTypes.func,
  placeholder: PropTypes.string,
  value:       PropTypes.string,
};

TextInput.defaultProps = {
  onChange: () => null,
  type:     'text',
  value:    '',
};
