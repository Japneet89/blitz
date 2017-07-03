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

  editTool = (tool) => {
    this.setState(state => {
      state.tools.forEach((item, index) => {
        if (Number(item.id) === Number(tool.id)) {
          state.tools[index] = tool
        }
      })
    })
  }
  
  render() {
    const { showModal } = this.state
    const tools = this.state.tools.filter(tool => Object.keys(tool).indexOf('client') === -1)

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
      <ToolTable 
        tools={tools} 
        data={this.state} 
        deleteTool={this.deleteTool}
        editTool={this.editTool}
      />
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