// createStore

import { applyMiddleware, compose, createStore } from 'redux';

// Middleware
import thunk from 'redux-thunk';

// Reducers
import { rootReducer } from 'modules';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(
  applyMiddleware(thunk),
);

export const configureStore = (initialState) => {
  const store = createStore(rootReducer, initialState, enhancer);

  // Hot reload reducers
  if (module.hot) {
    module.hot.accept('modules', () =>
      store.replaceReducer(require('modules').rootReducer)
    );
  }

  return store;
};
