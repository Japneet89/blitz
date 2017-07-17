import React from 'react';
import Countbox from '../components/Countbox';
import Toolbox from '../components/Toolbox';
import '../css/Dashboard.css';
import { Button } from 'react-bootstrap';
import ToolBoxModal from '../containers/ToolBoxModal';
import {getTools, getToolboxes, getDrawers, getContainers, deleteItem} from '../utils/backend-api';


class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = { 
      toolboxes: [],
      drawers:'',
      containers:'',
      tools:'',
      showToolBoxModal: false,
    };
  }


  closeToolBoxModal = () => this.setState({ showToolBoxModal: false });
  openToolBoxModal = () => this.setState({ showToolBoxModal: true });


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

  deleteToolBox = (url, toolboxId) => {
    this.setState(state => ({
      toolboxes: state.toolboxes.filter(item => item.id !== toolboxId)
    }))
    deleteItem(url, toolboxId);
  }

  createToolBox = (toolbox) => {
    this.setState(state => state.toolboxes.push(toolbox))
  }

  editToolBox = (toolbox) => {
    this.setState(state => {
      state.toolboxes.forEach((item, index) => {
        if (Number(item.id) === Number(toolbox.id)) {
          state.toolboxes[index] = toolbox
        }
      })
    })
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
            bsStyle="success"
            onClick={this.openToolBoxModal}>Create
          </Button>
          <p className='headerTitle'>Toolboxes</p>
        </div>
        <div className='toolboxes'>
          {
            this.state.toolboxes
              .map(toolbox => (
                <Toolbox 
                  name={toolbox.name} 
                  owner={toolbox.owner.name} 
                  id={toolbox.id} 
                  userId={toolbox.owner.id} 
                  deleteToolBox={this.deleteToolBox}
                  editToolBox = {this.editToolBox}
                />
              ))
          }
        </div>
        <ToolBoxModal 
          show={this.state.showToolBoxModal}
          hide={this.closeToolBoxModal}
          title='Create a Toolbox'
          createToolBox = {this.createToolBox}
        />
      </div>
    );
  }
}

export default Dashboard;


