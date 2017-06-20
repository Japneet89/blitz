import React from 'react';
import { Modal, Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import axios from 'axios';
import '../css/ToolModal.css';
import { postToolBox } from '../utils/backend-api';

class ToolBoxModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
          toolBoxName: ''
        }
    }


   handleChange = (e) => {
    this.setState({toolBoxName: e.target.value})
   }

    handleCreateTool = () => {
      this.props.hide()
      postToolBox(this.state.toolBoxName, '5667908084563968');
      setTimeout(function() {
          window.location.reload();
      }, 1000);
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
                    <FormGroup controlId='basic text'/>
                    <ControlLabel>Enter Toolbox Name</ControlLabel>
                    <FormControl 
                      type='text'
                      value={this.state.toolBoxName}
                      placeholder='toolbox name'
                      onChange={this.handleChange}
                    />
                  </form>
                </Modal.Body>
                <Modal.Footer>  
                    <Button bsStyle="success" onClick={this.handleCreateTool}>Save changes</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}


export default ToolBoxModal;