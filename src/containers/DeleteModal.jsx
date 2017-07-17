import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

class DeleteModal extends React.Component {
    constructor(props) {
        super(props);
    }

    handleClick = () => {
        let deleteItem;
        if (this.props.url === '/tools/') {
            deleteItem = this.props.deleteTool;
        } else {
            deleteItem = this.props.deleteToolBox;
        }

        deleteItem(this.props.url, this.props.id)
        this.props.hide()
    }

    render () {  
        let deleteItem;
        if (this.props.url === '/tools/') {
            deleteItem = this.props.deleteTool
        } else {
            deleteItem = this.props.deleteToolBox
        }

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
                    <Button bsStyle='success' onClick={this.handleClick}>OK</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}


export default DeleteModal;