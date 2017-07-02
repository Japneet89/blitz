import React from 'react';
import ToolTable from './ToolTable';
import ToolModal from './ToolModal';
import '../css/Tools.css';
import { PageHeader, Button } from 'react-bootstrap';
import {getTools, getToolboxes, getDrawers, getContainers, deleteItem} from '../utils/backend-api';

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

  deleteTool = (url, toolId) => {
    this.setState(state => ({
      tools: state.tools.filter(item => item.id !== toolId)
    }))
    deleteItem(url, toolId);
  }

  createTool = (tool) => {
    this.setState(state => state.tools.push(tool))
  }
  
  render() {
    const { tools, showModal } = this.state
    console.log('tools state', tools)
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
      <ToolTable tools={tools} data={this.state} deleteTool={this.deleteTool}/>
      <ToolModal 
        show={showModal} 
        hide={this.close} 
        title="Create Tool"
        createTool={this.createTool}
      />
    </div>
    )
  }
}

export default Tools;