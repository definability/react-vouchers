import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import promiseMiddleware from 'redux-promise-middleware';

import Application from './components';
import reducers from './reducers';

const store = applyMiddleware(promiseMiddleware())(createStore)(reducers);

render((
  <Provider store={store}>
    <Application />
  </Provider>
), document.getElementById('root'));
