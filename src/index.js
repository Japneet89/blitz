/* import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, browserHistory } from 'react-router';

//import reducers from './reducers';
//import routes from './routes';
import promise from 'redux-promise';

import App from './containers/App';
import 'bootstrap/dist/css/bootstrap.css';
import './css/index.css';

//const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <App />,
  document.getElementById('.root')
)*/
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';

import App from './containers/App';
import routes from './routes';

import 'bootstrap/dist/css/bootstrap.css';
import './css/index.css';

ReactDOM.render(
    <Router history={browserHistory} routes={routes} />
  , document.querySelector('.root'));