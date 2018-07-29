import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import classnames from 'classnames';

import { getIsAuthenticated } from 'modules/account/selectors';

import * as styles from './App.css';

import { Header } from 'components/Header';
import { AuthRouter } from 'containers/AuthRouter';
import { ShoppingList } from 'components/ShoppingList';

export const BaseApp = ({ isAuthenticated, location, theme }) => {
  const redirectTo = {
    pathname: '/login',
    state:    { from: location },
  };

  return (
    <AuthRouter location={location}>
      <div className={classnames(styles.App, styles[theme])}>
        <header>
        </header>
        <div className={styles.AppBody}>
          <ShoppingList />
        </div>
      </div>
    </AuthRouter>
  );
};

const mapState = (state) => ({
  theme:           'blossom',
  isAuthenticated: getIsAuthenticated(state),
});

export const App = connect(mapState)(BaseApp);
