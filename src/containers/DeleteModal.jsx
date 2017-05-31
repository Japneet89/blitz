import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
// import '../css/ToolModal.css';

class DeleteModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
        };
    }

    delete = () => {
        axios.delete('http://104.154.162.68:8080/api'+ this.props.url + this.props.id).then(response => {
            console.log('deleted');
        });
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