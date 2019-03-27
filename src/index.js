import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import createSagaMiddleware from 'redux-saga'

import {rootReducer} from 'store/reducers';
import getPictures from 'store/sagas/getPictures';
import postPicture from 'store/sagas/postPicture';
import App from 'App';
import 'styles/normalize.css';
import 'styles/style.css';


const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(getPictures);
sagaMiddleware.run(postPicture);

ReactDOM.render(
  <Provider
    store={store}
  >
    <App />
  </Provider>,
  document.getElementById('root')
);
