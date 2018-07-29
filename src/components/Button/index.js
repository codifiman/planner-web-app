// components/Button
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import * as styles from './Button.css';

const getClassName = ({ fluidWidth, size, variant }) => classnames(
  styles.Button,
  styles[size],
  styles[variant],
  { [ styles.fluidWidth ]: fluidWidth },
);

export const Button = ({ disabled, children, onClick, type, ...rest }) => (
  <button
    disabled={disabled}
    onClick={onClick}
    type={type}
    className={getClassName(rest)}
  >
    {children}
  </button>
);

Button.propTypes = {
  disabled:   PropTypes.bool,
  fluidWidth: PropTypes.bool,
  onClick:    PropTypes.func,
  size:       PropTypes.oneOf([ 'medium' ]),
  type:       PropTypes.oneOf([ 'button' ]),
  variant:    PropTypes.oneOf([
    'contained',
    'floating-action',
    'outlined',
    'text',
    'toggle'
  ]),
};

Button.defaultProps = {
  disabled:   false,
  fluidWidth: false,
  onClick:    () => null,
  size:       'medium',
  type:       'button',
  variant:    'text',
};
