import React from 'react';

import { AuthRouter } from 'containers/AuthRouter';
import { LogInButton } from './LogInButton';

export const Login = ({ location }) => (
  <AuthRouter location={location}>
    <div>
      <LogInButton />
    </div>
  </AuthRouter>
);
