import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from './configureStore';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { App } from 'components/App';
import { Login } from 'components/Login';

import './index.css';

const Index = ({ isLoggedIn }) => {
  const store = configureStore();

  return (
    <Provider store={store}>
      <div>
        <Router>
          <div>
            <Route exact path='/' component={App} />
            <Route path='/login' component={Login} />
          </div>
        </Router>
      </div>
    </Provider>
  );
}

ReactDOM.render(<Index />, document.getElementById('app-root'));
