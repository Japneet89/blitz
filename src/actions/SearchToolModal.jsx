import React from 'react';
import { Modal, Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import '../css/Modal.css';
import { listAll, update } from '../utils/backend-api';

class SearchToolModal extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
      	something: {} 
      }
  }

  render () {
  		const { show, hide, title, tool } = this.props;
	  return (
		  <Modal show={show} onHide={hide}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            </Modal.Body>
            <Modal.Footer>  
            </Modal.Footer>
        </Modal>
	  );
  }
};

export default SearchToolModal;