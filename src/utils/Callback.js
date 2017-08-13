import { Component } from 'react';
import { setIdToken, setAccessToken } from './AuthService';

class Callback extends Component {

  componentDidMount() {
    setAccessToken();
    setIdToken();
    //TODO: wait until group creation/join process is okay from server
    window.location.href = "/dashboard";
  }

  render() {
    return null;
  }
}

export default Callback;