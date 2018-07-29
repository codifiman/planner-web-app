// components/Checkbox;
import React from 'react';
import PropTypes from 'prop-types';

import * as styles from './Checkbox.css';

export const Checkbox = ({ checked, id, onChange, children }) => (
  <div className={styles.Checkbox}>
    <input
      checked={checked}
      type='checkbox'
      id={id}
      onChange={onChange}
    />
    <label htmlFor={id}>{ children }</label>
  </div>
);

Checkbox.propTypes = {
  checked:  PropTypes.bool,
  id:       PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
  onChange: PropTypes.func,
};

Checkbox.defaultProps = {
  checked:  false,
  onChange: () => null,
};
