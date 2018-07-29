// components/View
import React from 'react';

import * as styles from './View.css';
export const View = ({ children }) => (
  <div className={styles.View}>
    { children }
  </div>
);
