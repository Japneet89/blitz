import React from 'react';
import AccountForm from '../components/AccountForm.js';
import  { Button, Tabs, Tab, PageHeader }  from 'react-bootstrap';
import '../css/Account.css';

const Account = () => (
  <div>
    <PageHeader>Account Management</PageHeader>
      <Tabs defaultActiveKey={2} className="accountContianer">
        <Tab eventKey={1} title="Profile" className="tab">
          <AccountForm placeholder='name'/>
          <AccountForm placeholder='email'/>
          <Button 
            bsSize="medium"
            className='button'
            bsStyle="primary"
          > Update Profile </Button>
        </Tab>
        <Tab eventKey={2} title="Group" className="tab">
          <AccountForm placeholder='email'/>
          <Button 
            bsSize="medium"
            className='button'
            bsStyle="primary"
          > Invite </Button>
        </Tab>
      </Tabs>
  </div>
);

export default Account;