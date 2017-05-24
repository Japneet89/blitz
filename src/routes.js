import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/app';
import Login from './containers/Login';
import Account from './containers/Account';
import Toolboxes from './containers/Dashboard';
import Tools from './containers/Tools';
import Navigation from './components/Navbar';
import Sidebar from './components/Sidebar';

export default (
  <Route path="/" component={App}>
      <Route exact path='/' component={Login}/>
      <Route path='login' component={Login}/>
      <Route path='account' component={Account}/>
      <Route path='toolboxes' component={Toolboxes}/>
      <Route path='tools' component={Tools}/>
  </Route>
);