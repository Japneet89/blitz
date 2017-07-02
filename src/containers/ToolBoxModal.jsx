import React from 'react';
import { Modal, Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import axios from 'axios';
import '../css/ToolModal.css';
import { postToolBox, postDrawer, postContainer } from '../utils/backend-api';

class ToolBoxModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
          toolBoxName: '',
          drawerName: '',
          containerName: ''
        }
    }


    handleToolBoxChange = (e) => {
      this.setState({toolBoxName: e.target.value})
     }

    handleDrawerChange = (e) => {
      this.setState({drawerName: e.target.value})
     }

    handleContainerChange = (e) => {
      this.setState({containerName: e.target.value})
     }

    handleCreateTool = () => {
      this.props.hide()
      postToolBox(this.state.toolBoxName, '5667908084563968')
        .then(response => {
          console.log(response.data.item.id)
        })

      //postDrawer(this.state.drawerName, '5647591547076608', ['5757715179634688', '5632763172487168'])
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
                      onChange={this.handleToolBoxChange}
                    />
                    <ControlLabel>Enter Drawer Name</ControlLabel>
                    <FormControl 
                      type='text'
                      value={this.state.drawerName}
                      placeholder='drawer name'
                      onChange={this.handleDrawerChange}
                    />
                    <ControlLabel>Enter Container Name</ControlLabel>
                    <FormControl 
                      type='text'
                      value={this.state.containerName}
                      placeholder='container name'
                      onChange={this.handleContainerChange}
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