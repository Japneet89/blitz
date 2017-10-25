import React from 'react';
import { Modal, Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import '../css/Modal.css';
import { listAll, create } from '../utils/backend-api';
import Entities from '../entities/Entities';
import Dropdown from '../components/Dropdown';

class CreateDrawerModal extends React.Component {
  constructor(props) {
      super(props);
      this.state = { 
        name: '',
        chosenToolbox: {},
        toolboxes: [],
        createButtonDisabled: true
      }

      this.handleCreateButtonState = this.handleCreateButtonState.bind(this);
  }

  componentDidMount() {
    listAll(Entities.TOOLBOX).then((items) => {
      this.setState({toolboxes: items});
    });
  }

   handleNameChange = (e) => {
    this.setState({name: e.target.value})
    this.handleCreateButtonState(e.target.value, this.state.chosenToolbox);
   }

   handleToolboxSelect = (e) => {
    let chosenToolbox = this.state.toolboxes.filter(toolbox => toolbox.id===e.target.value)[0];
    this.setState(
      {chosenToolbox}
    );
    this.handleCreateButtonState(this.state.name, chosenToolbox);
   }

    handleCreateDrawer = () => {
      create(Entities.DRAWER, {name: this.state.name, toolbox: this.state.chosenToolbox})  
      	.then(() => {
          this.props.hide();
          window.location.reload();
        });
    }

    handleCreateButtonState = (name, chosenToolbox) => {
      console.log(chosenToolbox);
      if(name.length > 0 && chosenToolbox !== null && chosenToolbox !== undefined && chosenToolbox.hasOwnProperty("id"))
        this.setState({createButtonDisabled: false});
      else
        this.setState({createButtonDisabled: true});
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
                      <ControlLabel>Enter Drawer Name</ControlLabel>
                      <FormControl 
                        type='text'
                        value={this.state.name}
                        placeholder='Drawer Name'
                        onChange={this.handleNameChange}
                      />
                    </FormGroup>
                    <Dropdown
                      label="Choose Toolbox"
                      data={this.state.toolboxes}
                      handler={this.handleToolboxSelect}
                    />
                  </form>
                </Modal.Body>
                <Modal.Footer>  
                    <Button 
                      bsStyle="success" 
                      onClick={this.handleCreateDrawer}
                      disabled={this.state.createButtonDisabled}
                      >
                        Create
                      </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default CreateDrawerModal;