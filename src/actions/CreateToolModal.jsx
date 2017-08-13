import React from 'react';
import { Modal, Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import '../css/Modal.css';
import { listAll, create } from '../utils/backend-api';
import { getOwner } from '../utils/AuthService';
import Entities from '../entities/Entities';
import Dropdown from '../components/Dropdown';
import KeyValuePairs from '../components/KeyValuePairs';

class CreateToolModal extends React.Component {
  constructor(props) {
      super(props);
      this.state = { 
        name: '',
        quantity: 0,
        attributes: [],
        attributeCounter: 0,
        chosenToolbox: {},
        chosenDrawer: {},
        chosenContainer: {},  
        toolboxes: [],
        drawers: [],
        filteredDrawers: [],
        containers: [],
        filteredContainers: [],
        tools: []
      }
  }

  componentDidMount() {
    //Here, we need all the data because user can pick any toolbox,container,drawer and client provided tools
    Object.keys(Entities).forEach((entity) => {
      listAll(Entities[entity])
        .then((items) => {
          this.setState({ [Entities[entity]]: items });
        });
    });
  }

   handleNameChange = (e) => {
    this.setState({name: e.target.value})
   }

   handleQuantityChange = (e) => {
    this.setState({quantity: e.target.value})
   }
  
   handleToolboxSelect = (e) => {
    //record chosen toolbox
    let toolboxChoice = this.state.toolboxes.filter(toolbox => toolbox.id===e.target.value)[0];
    this.setState(
      {chosenToolbox: toolboxChoice}
    );

    //change drawers to be filtered by toolbox and delete any stored values of container or drawer
    this.setState(
      {filteredDrawers: this.state.drawers.filter(drawer => drawer.toolbox.id === toolboxChoice.id)}
    )
    this.setState(
      {chosenDrawer: null}
    );
    this.setState(
      {chosenContainer: null}
    );
   }

   handleDrawerSelect = (e) => {
   //record chosen drawer
   let drawerChoice = this.state.filteredDrawers.filter(drawer => drawer.id===e.target.value)[0]; 
    this.setState(
      {chosenDrawer: drawerChoice }
    );

    //change containers to be filtered by drawer
    this.setState(
      {filteredContainers: this.state.containers.filter(container => container.drawer.id === drawerChoice.id)}
    );
    this.setState(
      {chosenContainer: null}
    );
   }

   handleContainerSelect = (e) => {
   //record chosen container, but its optional
   if(e.target.value === "select")
    this.setState({ chosenContainer: null });
   else
    this.setState({ chosenContainer: this.state.filteredContainers.filter(container => container.id===e.target.value)[0]}
    );
   }

   handleExistingToolSelect = (e) => {
      //basically, we set the name and attributes
      let chosenTool = this.state.tools.filter(tool => tool.id === e.target.value)[0];
      this.setState({name: chosenTool.name});
      this.setState({attributes: chosenTool.attributes});
      this.setState({attributeCounter: this.state.attributes.length});
   }

   addMoreAttributes = () => {
    let newAttributes = this.state.attributes;
    let blankAttribute = {key: 'key'+this.state.attributeCounter, value: 'value'};
    newAttributes.push(blankAttribute);
    this.setState({ attributes: newAttributes});
    this.setState({attributeCounter: this.state.attributeCounter + 1});
   }

  handleAttributeKeyChange = (e) => {
    let originalKey = e.target.id;
    let newKey = e.target.value;
    console.log(`old key: ${originalKey} changed to: ${newKey}`);
    let newAttributes = this.state.attributes
    newAttributes.forEach((attr) => {
      if(attr.key === originalKey) {
        attr.key = newKey;
        e.target.id=newKey;
      }
    });
    this.setState({attributes: newAttributes});
  }

  handleAttributeValChange = (e) => {
    let key = e.target.id;
    let val = e.target.value;
    console.log(`changin key ${key} value to: ${val}`);
    let newAttributes = this.state.attributes;
    newAttributes.forEach((attr) => {
      if(attr.key === key)
        attr.value = val;
    });
    this.setState({attributes: newAttributes});
  }

  handleCreateTool = () => {
      let toolObj = {
        name: this.state.name,
        quantity: Number(this.state.quantity),
        attributes: this.state.attributes,
        toolbox: this.state.chosenToolbox, 
      };

      if(this.state.chosenContainer === null)
          toolObj.drawer = this.state.chosenDrawer;
      else
          toolObj.container = this.state.chosenContainer;
      getOwner()
        .then(owner => {
          toolObj['owner'] = owner;
          create(Entities.TOOL, toolObj);
        })
      	.then(() => {
          this.props.hide();
          window.location.reload();
        });
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
                    <Dropdown
                      label="Choose Toolbox"
                      data={this.state.toolboxes}
                      handler={this.handleToolboxSelect}
                    />
                    <Dropdown
                      label="Choose Drawer"
                      data={this.state.filteredDrawers}
                      handler={this.handleDrawerSelect}
                    />
                    <Dropdown
                      label="Choose Container"
                      data={this.state.filteredContainers}
                      handler={this.handleContainerSelect}
                    />
                    <Dropdown
                      label="Choose existing Tool Type (optional)"
                      data={this.state.tools.filter(tool => tool.builtin === true)}
                      handler={this.handleExistingToolSelect}
                    />
                    <FormGroup controlId='formBasicText'>
                      <ControlLabel>Tool Name</ControlLabel>
                      <FormControl 
                        type='text'
                        value={this.state.name}
                        placeholder='Custom Tool Name'
                        onChange={this.handleNameChange}
                      />
                    </FormGroup>
                    <FormGroup controlId='formBasicText'>
                      <ControlLabel>Tool Quantity</ControlLabel>
                      <FormControl 
                        type='text'
                        value={this.state.quantity}
                        placeholder='Enter #'
                        onChange={this.handleQuantityChange}
                      />
                    </FormGroup>
                    </form>
                    <KeyValuePairs
                      data={this.state.attributes}
                      onKeyChange={this.handleAttributeKeyChange}
                      onValChange={this.handleAttributeValChange}
                    />
                    <Button
                      className="addMoreButton"
                      onClick={this.addMoreAttributes}
                    >Add More
                    </Button>
                </Modal.Body>
                <Modal.Footer>  
                    <Button bsStyle="success" onClick={this.handleCreateTool}>Create</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default CreateToolModal;