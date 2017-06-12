import React from 'react';
import axios from 'axios';
import ToolTable from './ToolTable';
import ToolModal from './ToolModal';
import '../css/Tools.css';
import { PageHeader, Button } from 'react-bootstrap';
import {getTools, getToolboxes, getDrawers, getContainers} from '../utils/backend-api';

class Tools extends React.Component {

  constructor() {
    super();
    this.state = { 
      tools:[],
      toolboxes:[],
      drawers:[],
      containers:[],
      showModal: false
    };
  }

  close = () => this.setState({ showModal: false });
  open = () => this.setState({ showModal: true });

  componentDidMount() {
    getToolboxes().then((toolboxes) => {
      this.setState({ toolboxes} );
    });

    getDrawers().then((drawers) => {
      this.setState( {drawers} );
    });

    getContainers().then((containers) => {
      this.setState( {containers} );
    });

    getTools().then((tools) => {
      this.setState( {tools} );
    });

  }
  
  render() {
    const { tools, showModal } = this.state
    return(
    <div>
      <PageHeader>Tools
        <Button
          bsSize="small"
          className="toolButton"
          onClick={this.open}
          bsStyle="success">Create Tool
        </Button>
      </PageHeader>
      <ToolTable tools={tools} data={this.state} />
      <ToolModal 
        show={showModal} 
        hide={this.close} 
        title="Create Tool" 
        data={this.state}
      />
    </div>
    )
  }
}

export default Tools;