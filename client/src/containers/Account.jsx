import React from 'react';
import AccountForm from '../components/AccountForm.js';
import  { Button, Tabs, Tab, PageHeader }  from 'react-bootstrap';

const Account = () => (
  <div>
    <PageHeader>Account Management</PageHeader>
      <Tabs defaultActiveKey={2} id="uncontrolled-tab-example">
        <Tab eventKey={1} title="Profile">
          <AccountForm placeholder='name'/>
          <AccountForm placeholder='email'/>
          <Button 
            bsSize="large"
            bsStyle="info"
          > Update Profile </Button>
        </Tab>
        <Tab eventKey={2} title="Group">
          <AccountForm placeholder='email'/>
          <Button 
            bsSize="large"
            bsStyle="info"
          > Invite </Button>
        </Tab>
      </Tabs>
  </div>
);

export default Account;