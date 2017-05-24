import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

const Navigation = () => (
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="/">4-dat</a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav pullRight>
        <NavItem className="nav-item" href="/account">Account</NavItem>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Navigation;

