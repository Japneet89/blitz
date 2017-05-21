import React from 'react';
import axios from 'axios';
import Countbox from '../components/Countbox';
import Toolbox from '../components/Toolbox';
import '../css/Dashboard.css';
import { Button } from 'react-bootstrap';


class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = { 
      toolboxes: [],
      drawers:'',
      containers:'',
      tools:''
    };
  }

  componentDidMount() {
    // API calls 
    axios.get("http://104.154.162.68:8080/api/toolboxes").then(response => {
      console.log('toolboxes', response.data.items)
      this.setState({ toolboxes: response.data.items });
    });
    axios.get("http://104.154.162.68:8080/api/drawers").then(response => {
      this.setState({ drawers: response.data.items });
    });
    axios.get("http://104.154.162.68:8080/api/containers").then(response => {
      this.setState({ containers: response.data.items });
    });
    axios.get("http://104.154.162.68:8080/api/tools").then(response => {
      this.setState({ tools: response.data.items });
    });
  }

  render() {
    return (
      <div>
        <div className='counts'>
          <Countbox itemColor='blue' itemName={'Toolboxes'} itemCount={this.state.toolboxes.length} />
          <Countbox itemColor='red' itemName={'Drawers'} itemCount={this.state.drawers.length} />
          <Countbox itemColor='orange' itemName={'Containers'} itemCount={this.state.containers.length} />
          <Countbox itemColor='green' itemName={'Tools'} itemCount={this.state.tools.length} />
        </div>

        <div className='header'>
          <Button
            bsSize="small"
            className="toolboxButton"
            bsStyle="success">Create
          </Button>
          <p className='headerTitle'>Toolboxes</p>
        </div>
        <div className='toolboxes'>
          {
            this.state.toolboxes
              .map(toolbox => (
                <Toolbox name={toolbox.name} owner={toolbox.owner.name} id={toolbox.id}/>
              ))
          }
        </div>
      </div>
    );
  }
}

export default Dashboard;


