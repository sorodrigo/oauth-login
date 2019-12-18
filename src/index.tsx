import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import App from './App';
import router from './router';
import * as serviceWorker from './serviceWorker';
import user from './user';

import './styles/index.scss';

const reduxDevTools =
  // @ts-ignore
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
  // @ts-ignore
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({});

const composeEnhancers = (process.env.NODE_ENV === 'development' && reduxDevTools) || compose;
const reducers = combineReducers({
  user,
  location: router.reducer
});
const middleware = [thunk, router.middleware];
const store = createStore(reducers, undefined, composeEnhancers(router.enhancer, applyMiddleware(...middleware)));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
