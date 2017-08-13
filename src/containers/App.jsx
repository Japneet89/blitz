import React, { Component } from 'react';
import Navigation from '../components/Navbar';
import '../css/App.css';

class App extends Component {
  render () {
    return (
      <div className='App'>
        <Navigation />
          <main className="application">{this.props.children}</main>
      </div>
      );
  }
}

export default App