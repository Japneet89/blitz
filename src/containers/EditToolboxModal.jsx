import React from 'react';
import { Modal, Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import axios from 'axios';
import '../css/ToolModal.css';

class EditToolBoxModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
          toolBoxName: ''
        }
    }

   handleChange = (e) => {
    this.setState({toolBoxName: e.target.value});
   }

    handleEditToolbox = () => {
      this.props.hide();
      axios.put('http://104.154.162.68:8080/api/toolboxes/'+this.props.id, {
          name: this.state.toolBoxName,
          owner: this.props.userId
      })
      .then(function (response) {
          console.log(response);
      })
      .catch(function (error) {
          console.log(error);
      });
    }

    render () {
        const { show, hide, title, name } = this.props;
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
                      placeholder={name}
                      onChange={this.handleChange}
                    />
                  </form>
                </Modal.Body>
                <Modal.Footer>  
                    <Button bsStyle="success" onClick={this.handleEditToolbox}>Save changes</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}


export default EditToolBoxModal;