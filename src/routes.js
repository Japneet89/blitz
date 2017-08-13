import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App';
import Welcome from './containers/Welcome';
import Account from './containers/Account';
import Dashboard from './containers/Dashboard';
import Callback from './utils/Callback';

import { requireAuth } from './utils/AuthService';

export default (
  <Route path="/" component={App}>
  	  <IndexRoute component={Welcome}/>	
      <Route path='welcome' component={Welcome}/>
      <Route path='account' component={Account} onEnter={requireAuth}/>
      <Route path='dashboard' component={Dashboard} onEnter={requireAuth}/>
      <Route path='callback' component={Callback}/>
  </Route>
);