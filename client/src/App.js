import React, { Component } from 'react';
//import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './containers/Login';
import Account from './containers/Account';
import Toolboxes from './containers/Dashboard';
import Tools from './containers/Tools';
import Navigation from './components/Navbar';
import Sidebar from './components/Sidebar';
import './css/App.css';

class App extends Component {
  render () {
    return (
      <Router>
        <div className='App'>
          <Navigation />
          <Sidebar />
          <Route exact path='/' component={Login} />
          <Route path='/login' component={Login} />
          <Route path='/account' component={Account} />
          <Route path='/toolboxes' component={Toolboxes} />
          <Route path='/tools' component={Tools} />
        </div>
      </Router>
    )
  }
}



export default App
