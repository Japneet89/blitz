import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { deleteById } from '../utils/backend-api';

class DeleteModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
        };
    }

    delete = () => {
        
        deleteById(this.props.resource, this.props.id)
            .then(() => {
                    this.props.hide();
                    window.location.reload();
                });
    }

    render () { 
        const { show, hide } = this.props;
        return (
            <Modal show={show} onHide={hide} >
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure?</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button 
                        bsStyle='default' 
                        onClick={hide}
                    >Cancel
                    </Button>
                    <Button bsStyle='success' onClick={this.delete}>OK</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default DeleteModal;