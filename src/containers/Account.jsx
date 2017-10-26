import React from 'react';
import  { PageHeader, Button, FormGroup, FormControl, ControlLabel }  from 'react-bootstrap';
import '../css/Account.css';
import { getSub } from '../utils/AuthService';
import { getGroup, create, updateGroupName } from '../utils/backend-api';
var voucher_codes = require('voucher-code-generator');

class Account extends React.Component {
  constructor(props) {
  	super(props);
  	this.state = {
  		group: null,
  		subId: null,
  		inviteCode: null,
  		enteredInviteCode: '',
  		newGroup: null
  	};

  	this.createInviteCode = this.createInviteCode.bind(this);
  	this.handleGroupJoin = this.handleGroupJoin.bind(this);
  }

  componentWillMount() {
  	let subId = getSub();
  	getGroup().then((group) => this.setState({group, subId}));
  }

  createInviteCode() {
  	let code = voucher_codes.generate({
  		length: 16,
  		count: 1,
  		charset: voucher_codes.charset('alphanumeric'),
  		prefix: '4dat-'
  	})[0];

  	create('codes', {code: code}).then((entity) => this.setState({inviteCode: `Code generated: ${entity.code}` }));
  }

  handleCodeChange = (event) => {
  	this.setState({enteredInviteCode: event.target.value, newGroup: null});
  }

  handleGroupJoin() {
  	updateGroupName(this.state.enteredInviteCode)
  		.then((response) => {
  			this.setState({newGroup: response});
  		})
  		.catch((error) => {
  			console.log(error);
  			this.setState({newGroup: `Error: ${error}`});
  		});
  }

  render() {
  	console.log(this.state);
  	let { group, subId } = this.state;
  	//Group owner view for multiple member group
  	if(group !== null && group.hasOwnProperty("owner") && group.owner === subId) {
      return (
      <div>
      	<div>
        	<PageHeader>Account Management</PageHeader>
        	<p>Click the button to generate an invite code. Copy and give this code to desired members securely.</p>
        	<Button 
              bsStyle="success" 
              onClick={this.createInviteCode}
              >
                Create
            </Button>
            <p> {this.state.inviteCode}</p>
      	</div>
      		{group.members === 1 ?
      		   <div>
      		   <br />
      		   <br />
      			<p> You may also join another group via an invite code since you are alone in this group</p>
      			<form>
                  <FormGroup controlId='formBasicText'>
                  <ControlLabel>Enter Invite Code</ControlLabel>
                  <FormControl 
                    type='text'
                    value={this.state.enteredInviteCode}
                    placeholder='Invite Code'
                    onChange={this.handleCodeChange}
                  />
                </FormGroup>
                <p> {this.state.newGroup}</p>
                <Button 
	              bsStyle="success" 
	              onClick={this.handleGroupJoin}
	              >
	                Join
	            </Button>
	            </form>
	      	</div>
	      	: null
      		}
      	</div>
      );
    //Group Member view
  	} else if (group !== null && group.hasOwnProperty("owner") && group.owner !== subId) {
  		return (
  		<div>
        	<PageHeader>Account Management</PageHeader>
        	<p>You are part of {subId}'s group.</p>
      	</div>
  		);
  	//No group/member which is either an error or a slow response
  	} else {
  		return null;
  	}
  };
}

export default Account;