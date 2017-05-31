import React from 'react';
import axios from 'axios';
import ToolTable from './ToolTable';
import ToolModal from './ToolModal';
import ToolEditModal from './ToolEditModal';
import '../css/Tools.css';
import { PageHeader, Button } from 'react-bootstrap';
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
    axios.get("http://104.154.162.68:8080/api/tools").then(response => {
      this.setState({ tools: response.data.items });
    });
    axios.get("http://104.154.162.68:8080/api/toolboxes").then(response => {
      this.setState({ toolboxes: response.data.items });
    });
    axios.get("http://104.154.162.68:8080/api/drawers").then(response => {
      this.setState({ drawers: response.data.items });
    });
    axios.get("http://104.154.162.68:8080/api/containers").then(response => {
      this.setState({ containers: response.data.items });
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