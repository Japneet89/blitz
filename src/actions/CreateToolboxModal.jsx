import React from 'react';
import { Modal, Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import '../css/Modal.css';
import { create } from '../utils/backend-api';
import Entities from '../entities/Entities';

class CreateToolboxModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
          name: '',
          createButtonDisabled: true
        }
    }

   handleChange = (e) => {
    let newVal = e.target.value;
    if(newVal.length > 0)
      this.setState({name: newVal, createButtonDisabled: false});
    else
      this.setState({name: newVal});
   }

    handleCreateToolbox = () => {
      create(Entities.TOOLBOX, {name: this.state.name})
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
                    <Button 
                      bsStyle="success" 
                      onClick={this.handleCreateToolbox}
                      disabled={this.state.createButtonDisabled}
                      >
                        Create
                      </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}


export default CreateToolboxModal;