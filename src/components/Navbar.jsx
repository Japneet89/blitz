import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { login, logout, isLoggedIn } from '../utils/AuthService';


const Navigation = () => (
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="/dashboard">Tool4Dat</a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav pullRight>
        <NavItem className="nav-item" href="/account">Account</NavItem>
        <NavItem className="nav-item">
          { 
            (isLoggedIn()) ? ( <button className="btn btn-danger log" onClick={() => logout()}>Log out </button> ) : ( <button className="btn btn-info log" onClick={() => login()}>Log In</button> )
          }
         </NavItem>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Navigation;

