import React from 'react';
import { Modal, Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import '../css/Modal.css';
import { create } from '../utils/backend-api';
import { getOwner } from '../utils/AuthService';
import Entities from '../entities/Entities';

class CreateToolboxModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
          name: ''
        }
    }

   handleChange = (e) => {
    this.setState({name: e.target.value})
   }

    handleCreateToolbox = () => {
      getOwner()
        .then(owner => {
          create(Entities.TOOLBOX, {name: this.state.name, owner: owner});
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
                      <ControlLabel>Enter Toolbox Name</ControlLabel>
                      <FormControl 
                        type='text'
                        value={this.state.name}
                        placeholder='Toolbox Name'
                        onChange={this.handleChange}
                      />
                    </FormGroup>
                  </form>
                </Modal.Body>
                <Modal.Footer>  
                    <Button bsStyle="success" onClick={this.handleCreateToolbox}>Create</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}


export default CreateToolboxModal;