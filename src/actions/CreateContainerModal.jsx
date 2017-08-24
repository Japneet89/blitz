import React from 'react';
import { Modal, Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import '../css/Modal.css';
import { listAll, create } from '../utils/backend-api';
import Entities from '../entities/Entities';
import Dropdown from '../components/Dropdown';

class CreateContainerModal extends React.Component {
  constructor(props) {
      super(props);
      this.state = { 
        name: '',
        chosenDrawer: {},
        drawers: []
      }
  }

  componentDidMount() {
    listAll(Entities.DRAWER).then((items) => {
      this.setState({drawers: items});
    });
  }

   handleNameChange = (e) => {
    this.setState({name: e.target.value})
   }

   handleDrawerSelect = (e) => {
    this.setState(
      {chosenDrawer: this.state.drawers.filter(drawer => drawer.id===e.target.value)[0]}
    );
   }

    handleCreateContainer = () => {
      create(Entities.CONTAINER, {name: this.state.name, drawer: this.state.chosenDrawer})
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
                      <ControlLabel>Enter Container Name</ControlLabel>
                      <FormControl 
                        type='text'
                        value={this.state.name}
                        placeholder='Container Name'
                        onChange={this.handleNameChange}
                      />
                    </FormGroup>
                    <Dropdown
                      label="Choose Drawer"
                      data={this.state.drawers}
                      handler={this.handleDrawerSelect}
                    />
                  </form>
                </Modal.Body>
                <Modal.Footer>  
                    <Button bsStyle="success" onClick={this.handleCreateContainer}>Create</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default CreateContainerModal;