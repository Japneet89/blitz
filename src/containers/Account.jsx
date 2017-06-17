import React from 'react';
import AccountForm from '../components/AccountForm';
import  { Button, Tabs, Tab, PageHeader }  from 'react-bootstrap';
import '../css/Account.css';

class Account extends React.Component {
  render() {
    return (
      <div>
        <PageHeader>Account Management</PageHeader>
          <Tabs id="account" defaultActiveKey={2} className="accountContianer">
            <Tab eventKey={2} title="Group" className="tab">
              <AccountForm placeholder='email'/>
              <Button 
                bsSize="large"
                className='button'
                bsStyle="primary"
              > Invite </Button>
            </Tab>
          </Tabs>
      </div>
    );
  };
}

export default Account;