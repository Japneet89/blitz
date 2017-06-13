import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import { deleteItem } from '../utils/backend-api';
// import '../css/ToolModal.css';

class DeleteModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
        };
    }

    delete = () => {
        window.location.reload();
        this.props.hide();
        deleteItem(this.props.url, this.props.id);
    }

    render () {  
        return (
            <Modal show={this.props.show} onHide={this.props.hide} >
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure?</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button 
                        bsStyle='default' 
                        onClick={this.props.hide}
                    >Cancel
                    </Button>
                    <Button bsStyle='success' onClick={this.delete}>OK</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}


export default DeleteModal;