import { Component } from 'react';
import { setIdToken, setAccessToken, setOwner } from './AuthService';

class Callback extends Component {

  componentDidMount() {
    setAccessToken();
    setIdToken();
    setOwner().then(() => window.location.href = "/dashboard")
    //TODO: wait until group creation/join process is okay from server
  }

  render() {
    return null;
  }
}

export default Callback;