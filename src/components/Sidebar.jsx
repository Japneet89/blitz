import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import WrenchIcon from 'react-icons/lib/fa/wrench';
import ToolboxIcon from 'react-icons/lib/fa/briefcase';
import '../css/Sidebar.css';

const Sidebar = () => (
  <Menu>
    <a className="menu-item" href="/toolboxes"><ToolboxIcon className="icon"/>Toolboxes</a>
    <a className="menu-item" href="/tools"><WrenchIcon className="icon"/>Tools</a>
  </Menu>
)

export default Sidebar;