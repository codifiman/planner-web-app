import React from 'react';
import { connect } from 'react-redux';

import { logIn } from 'modules/account/actionCreators';

export const Btn = ({ submit, email }) => (
  <button onClick={() => submit(email)}>Log In</button>
);

const mapState = (state) => ({
  email: 'codi.noedel@gmail.com',
});

const mapDispatch = (dispatch) => ({
  submit: (email) => dispatch(logIn({ email }))
});


export const LogInButton = connect(mapState, mapDispatch)(Btn);
