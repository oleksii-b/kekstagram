import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import 'styles/normalize.css';
import 'styles/style.css';
import {rootReducer} from './store/reducers';
import App from './App';


const composeEnhancers =
  typeof window === 'object'
  &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ?
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      })
    :
      compose;

const store = createStore(
  rootReducer,
  // composeEnhancers(
    applyMiddleware(thunk)
  // )
);

ReactDOM.render(
  <Provider
    store={store}
  >
    <App />
  </Provider>,
  document.getElementById('root')
);
