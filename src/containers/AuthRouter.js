// containers/AuthRouter
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { getIsAuthenticated } from 'modules/account/selectors';

const to = (pathname, location) => ({
  pathname,
  state: { from: location },
});

const toApp = (location) => to('/', location);

const toLogin = (location) => to('/login', location);

export const BaseAuthRouter = ({ isAuthenticated, location={}, children }) => {
  if (isAuthenticated && location.pathname === '/login') {
    return <Redirect to={toApp(location)} />
  }

  if (!isAuthenticated && location.pathname !== '/login') {
    return <Redirect to={toLogin(location)} />
  }

  return children;
};

BaseAuthRouter.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
};

const mapState = (state) => ({
  isAuthenticated: getIsAuthenticated(state),
});

export const AuthRouter = connect(mapState)(BaseAuthRouter);
