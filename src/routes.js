import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/app';
import Welcome from './containers/Welcome';
import Account from './containers/Account';
import Toolboxes from './containers/Dashboard';
import Tools from './containers/Tools';
import Navigation from './components/Navbar';
import Sidebar from './components/Sidebar';
import Callback from './components/Callback';

import { requireAuth } from './utils/AuthService';

export default (
  <Route path="/" component={App}>
  	  <IndexRoute component={Welcome}/>	
      <Route path='welcome' component={Welcome}/>
      <Route path='account' component={Account} onEnter={requireAuth}/>
      <Route path='toolboxes' component={Toolboxes} onEnter={requireAuth}/>
      <Route path='tools' component={Tools} onEnter={requireAuth}/>
      <Route path='callback' component={Callback}/>
  </Route>
);