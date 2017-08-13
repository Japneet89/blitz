import React from 'react';
import { Modal, Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import '../css/Modal.css';
import { listAll, update } from '../utils/backend-api';
import Entities from '../entities/Entities';
import Dropdown from '../components/Dropdown';

class EditDrawerModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
          name: props.name,
          chosenToolbox: props.toolbox,
          toolboxes: []
        }
    }

  componentDidMount() {
    listAll(Entities.TOOLBOX).then((items) => {
      this.setState({toolboxes: items});
    });
  }

   handleChange = (e) => {
    this.setState({name: e.target.value});
   }

  handleToolboxSelect = (e) => {
    this.setState(
      {chosenToolbox: this.state.toolboxes.filter(toolbox => toolbox.id===e.target.value)[0]}
    );
   }

    handleEditDrawer = () => {
      const { id, owner } = this.props;
      let newDrawer = { id: id, name:this.state.name, owner:owner, toolbox:this.state.chosenToolbox }
      update(Entities.DRAWER, newDrawer, id)
      .then(() => {
          return listAll(Entities.CONTAINER);
      })
      .then((containers) => {
          containers.filter(container => container.drawer.id === id)
            .forEach((c) => {
              update(Entities.CONTAINER, {id: c.id, name: c.name, owner: c.owner, drawer: newDrawer}, c.id);
            });
      })
      .then(() => {
          return listAll(Entities.TOOL);
      })
      .then((tools) => {
          tools.filter(tool => tool.drawer !== null && tool.drawer.id === id && tool.builtin === false)
            .forEach((t) => {
                t.drawer = newDrawer;
                update(Entities.TOOL, t, t.id);
            });

          tools.filter(tool => tool.container !== null && tool.container.drawer.id === id && tool.builtin === false)
              .forEach((t) => {
                  t.container.drawer = newDrawer;
                  update(Entities.TOOL, t, t.id);
              })
      })
      .then(() => {
              this.props.hide();
              window.location.reload();
      });
    }

    render () {
        const { show, hide, title, name, toolbox } = this.props;
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
                      placeholder={name}
                      onChange={this.handleChange}
                    />
                    </FormGroup>
                    <Dropdown
                      label="Toolbox"
                      data={this.state.toolboxes}
                      handler={this.handleToolboxSelect}
                      placeholder={toolbox.id}
                    />
                  </form>
                </Modal.Body>
                <Modal.Footer>  
                    <Button bsStyle="success" onClick={this.handleEditDrawer}>Save changes</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}


export default EditDrawerModal;