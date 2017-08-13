import React from 'react';
import  { PageHeader }  from 'react-bootstrap';
import '../css/Account.css';
import { getGroupId } from '../utils/AuthService';

class Account extends React.Component {
//TODO: Change all this
  render() {
  	//let group = getGroupId();
    return (
      <div>
        <PageHeader>Account Management</PageHeader>
        <p></p>
      </div>
    );
  };
}

export default Account;