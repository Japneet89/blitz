import React from 'react';
import { Modal, Button } from 'react-bootstrap';
// import '../css/ToolModal.css';

class DeleteToolboxModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
        };
    }

    render () {  
        return (
            <Modal show={this.props.show} onHide={this.props.hide} >
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure?</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button bsStyle='default' onClick={this.props.hide}>Cancel</Button>
                    <Button bsStyle='success'>OK</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}


export default DeleteToolboxModal;