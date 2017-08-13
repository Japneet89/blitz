import React from 'react';
import { Modal, Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import '../css/Modal.css';
import { listAll, create } from '../utils/backend-api';
import { getOwner } from '../utils/AuthService';
import Entities from '../entities/Entities';
import Dropdown from '../components/Dropdown';

class CreateDrawerModal extends React.Component {
  constructor(props) {
      super(props);
      this.state = { 
        name: '',
        chosenToolbox: {},
        toolboxes: []
      }
  }

  componentDidMount() {
    listAll(Entities.TOOLBOX).then((items) => {
      this.setState({toolboxes: items});
    });
  }

   handleNameChange = (e) => {
    this.setState({name: e.target.value})
   }

   handleToolboxSelect = (e) => {
    this.setState(
      {chosenToolbox: this.state.toolboxes.filter(toolbox => toolbox.id===e.target.value)[0]}
    );
   }

    handleCreateDrawer = () => {
      getOwner()
        .then(owner => {
          create(Entities.DRAWER, {name: this.state.name, owner: owner, toolbox: this.state.chosenToolbox})  
        })
      	.then(() => {
          this.props.hide();
          window.location.reload();
        });
    }

    render () {
        const { show, hide, title } = this.props;
        return (
            <Modal show={show} onHide={hide}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <form>
                    <FormGroup controlId='formBasicText'>
                      <ControlLabel>Enter Drawer Name</ControlLabel>
                      <FormControl 
                        type='text'
                        value={this.state.name}
                        placeholder='Drawer Name'
                        onChange={this.handleNameChange}
                      />
                    </FormGroup>
                    <Dropdown
                      label="Choose Toolbox"
                      data={this.state.toolboxes}
                      handler={this.handleToolboxSelect}
                    />
                  </form>
                </Modal.Body>
                <Modal.Footer>  
                    <Button bsStyle="success" onClick={this.handleCreateDrawer}>Create</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default CreateDrawerModal;