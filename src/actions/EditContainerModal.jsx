import React from 'react';
import { Modal, Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import '../css/Modal.css';
import { listAll, update } from '../utils/backend-api';
import Entities from '../entities/Entities';
import Dropdown from '../components/Dropdown';

class EditContainerModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
          name: props.name,
          chosenDrawer: props.drawer,
          drawers: []
        }
    }

  componentDidMount() {
    listAll(Entities.DRAWER).then((items) => {
      this.setState({drawers: items});
    });
  }

   handleChange = (e) => {
    this.setState({name: e.target.value});
   }

  handleDrawerSelect = (e) => {
    this.setState(
      {chosenDrawer: this.state.drawers.filter(drawer => drawer.id===e.target.value)[0]}
    );
   }

    handleEditContainer = () => {
      const { id, owner } = this.props;
      let newContainer = { id: id, name:this.state.name, owner:owner, drawer:this.state.chosenDrawer };
      update(Entities.CONTAINER, newContainer, id)
      .then(() => {
          return listAll(Entities.TOOL);
      })
      .then((tools) => {
          tools.filter(tool => tool.container !== null && tool.container.id === id && tool.builtin === false)
            .forEach((t) => {
                t.container = newContainer;
                update(Entities.TOOL, t, t.id);
            });
      })
      .then(() => {
              this.props.hide();
              window.location.reload();
      });
    }

    render () {
        const { show, hide, title, name, drawer } = this.props;
        return (
            <Modal show={show} onHide={hide}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <form>
                    <FormGroup controlId='formBasicText'>
                    <ControlLabel>Enter Container Name</ControlLabel>
                    <FormControl 
                      type='text'
                      value={this.state.name}
                      placeholder={name}
                      onChange={this.handleChange}
                    />
                    </FormGroup>
                    <Dropdown
                      label="Drawer"
                      data={this.state.drawers}
                      handler={this.handleDrawerSelect}
                      placeholder={drawer.id}
                    />
                  </form>
                </Modal.Body>
                <Modal.Footer>  
                    <Button bsStyle="success" onClick={this.handleEditContainer}>Save changes</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}


export default EditContainerModal;