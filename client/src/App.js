import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './containers/Login';
import Account from './containers/Account';
import Dashboard from './containers/Dashboard';

class App extends Component {
  render () {
    return (
      <Router>
        <div className='App'>
          <Route exact path='/' component={Login} />
          <Route path='/login' component={Login} />
          <Route path='/account' component={Account} />
          <Route path='/dashboard' component={Dashboard} />
        </div>
      </Router>
    )
  }
}

export default App
