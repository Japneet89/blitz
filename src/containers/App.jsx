/*import React, { Component } from 'react';
import Navigation from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import '../css/App.css';


export default class App extends Component {
  	constructor() {
    	super();
		    this.state = { 
		      tools:[],
		      toolboxes:[],
		      drawers:[],
		      containers:[],
		      showModal: false
		    };
  	}
  	render() {
		return (
			<div>
				<Navigation />
	          	<Sidebar />
         			<main className="application">{this.props.children}</main>
	        </div>
    	);
  	}
}*/

import React, { Component } from 'react';
//import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './Login';
import Account from './Account';
import Toolboxes from './Dashboard';
import Tools from './Tools';
import Navigation from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import '../css/App.css';

class App extends Component {
  render () {
    return (
      <div className='App'>
        <Navigation />
        <Sidebar />
          <main className="application">{this.props.children}</main>
      </div>
      );
  }
}

export default App