import React from 'react';
import { Modal, Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import '../css/Modal.css';
import { update, listAll } from '../utils/backend-api';
import Entities from '../entities/Entities';

class EditToolboxModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
          name: props.name
        }
    }

   handleChange = (e) => {
    this.setState({name: e.target.value});
   }

    handleEditToolbox = () => {
      const { id, owner } = this.props;
      let newToolbox = { id: id, name:this.state.name, owner:owner };
      update(Entities.TOOLBOX, newToolbox, id)
      .then(() => {
          return listAll(Entities.DRAWER);
      })
      .then((drawers) => {
          drawers.filter(drawer => drawer.toolbox.id === id)
              .forEach((d) => {
                d.toolbox = newToolbox;
                update(Entities.DRAWER, d, d.id);
                });
      })
      .then(() => {
          return listAll(Entities.CONTAINER);
      })
      .then((containers) => {
          containers.filter(container => container.drawer.toolbox.id === id)
              .forEach((c) => {
                  c.drawer.toolbox = newToolbox;
                  update(Entities.CONTAINER, c, c.id);
              });
      })
      .then(() => {
          return listAll(Entities.TOOL);
      })
      .then((tools) => {
          tools.filter(tool => tool.drawer !== null && tool.drawer.toolbox.id === id && tool.builtin === false)
              .forEach((t) => {
                  t.drawer.toolbox = newToolbox;
                  update(Entities.TOOL, t, t.id);
              });

          tools.filter(tool => tool.container !== null && tool.container.drawer.toolbox.id === id && tool.builtin === false)
              .forEach((t) => {
                  t.container.drawer.toolbox = newToolbox;
                  update(Entities.TOOL, t, t.id);
              });
      })
      .then(() => {
        this.props.hide();
        window.location.reload();
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
                    <FormGroup controlId='formBasicText'>
                    <ControlLabel>Enter Toolbox Name</ControlLabel>
                    <FormControl 
                      type='text'
                      value={this.state.name}
                      placeholder={name}
                      onChange={this.handleChange}
                    />
                    </FormGroup>
                  </form>
                </Modal.Body>
                <Modal.Footer>  
                    <Button bsStyle="success" onClick={this.handleEditToolbox}>Save changes</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}


export default EditToolboxModal;