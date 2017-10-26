import { Component } from 'react';
import { setIdToken, setAccessToken, setOwner, setGroupId } from './AuthService';

class Callback extends Component {

  componentDidMount() {
    setAccessToken();
    setIdToken();
    setGroupId();
    setOwner().then(() => window.location.href = "/dashboard")
  }

  render() {
    return null;
  }
}

export default Callback;