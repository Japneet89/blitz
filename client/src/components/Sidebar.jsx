import React from 'react';
import { slide as Menu } from 'react-burger-menu';

const Sidebar = () => (
  <Menu>
    <a className="menu-item" href="/toolboxes">Toolboxes</a>
    <a className="menu-item" href="/tools">Tools</a>
  </Menu>
)

export default Sidebar;