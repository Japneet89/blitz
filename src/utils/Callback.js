import { Component } from 'react';
import { setIdToken, setAccessToken, setOwner } from './AuthService';

class Callback extends Component {

  componentDidMount() {
    setAccessToken();
    setIdToken();
    setOwner().then(() => window.location.href = "/dashboard")
  }

  render() {
    return null;
  }
}

export default Callback;