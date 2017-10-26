import React from 'react';
import { Modal, Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import '../css/Modal.css';
import { listAll, update } from '../utils/backend-api';
import Entities from '../entities/Entities';
import Dropdown from '../components/Dropdown';
import KeyValuePairs from '../components/KeyValuePairs';

class EditToolModal extends React.Component {
  constructor(props) {
      super(props);
      let tool = this.props.tool;
      let toolbox, container, drawer = {};
        if(tool.container !== null && tool.container !== undefined) {
          toolbox = tool.container.drawer.toolbox;
          drawer = tool.container.drawer;
          container = tool.container;
        } else {
          toolbox = tool.drawer.toolbox;
          drawer = tool.drawer;
          container = {id: "select"};
      }
      this.state = { 
        name: props.tool.name,
        quantity: props.tool.quantity,
        attributes: props.tool.attributes,
        attributeCounter: props.tool.attributes.length,
        chosenToolbox: toolbox,
        chosenDrawer: drawer,
        chosenContainer: container,  
        toolboxes: props.toolboxes,
        drawers: props.drawers.filter(drawer => drawer.toolbox.id === toolbox.id),
        filteredDrawers: [],
        containers: props.containers.filter(container => container.drawer.toolbox.id === toolbox.id),
        filteredContainers: [],
        tools: [],
      }
  }

  componentDidMount() {
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
    this.setState({
      chosenToolbox: toolboxChoice
    });

    //change drawers to be filtered by toolbox and containers to empty
    listAll(Entities.DRAWER)
      .then(items => this.setState({ drawers: items.filter(drawer => drawer.toolbox.id === toolboxChoice.id)}))
      .then(() => { 
          if(this.state.drawers.length !== 0)
            this.setState({chosenDrawer: this.state.drawers[0]})
          else
            this.setState({chosenDrawer: {id: "select"}});
      })
      .then(() => { return listAll(Entities.CONTAINER) })
      .then(items => this.setState({containers: items.filter(container => container.drawer.id === this.state.chosenDrawer.id)}))
      .then(() => {
          if(this.state.containers.length !== 0)
            this.setState({chosenContainer: this.state.containers[0]})
          else
            this.setState({chosenContainer: {id: "select"}});
      });
    }

   handleDrawerSelect = (e) => {
   //record chosen drawer
   if(e.target.value === "select") {
      this.setState({chosenDrawer: {id: "select"}});
   } else {
      let drawerChoice = this.state.drawers.filter(drawer => drawer.id===e.target.value)[0]; 
      this.setState({chosenDrawer: drawerChoice });
      listAll(Entities.CONTAINER)
        .then(items => this.setState({ containers: items.filter(container => container.drawer.id === drawerChoice.id) }));
   }
    
    this.setState(
      {chosenContainer: {id: "select"}}
    );
   }

   handleContainerSelect = (e) => {
   //record chosen container, but its optional
   if(e.target.value === "select")
    this.setState({ chosenContainer: {id: "select"} });
   else
    this.setState({ chosenContainer: this.state.containers.filter(container => container.id===e.target.value)[0]}
    );
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
    let newAttributes = this.state.attributes;
    newAttributes.forEach((attr) => {
      if(attr.key === key)
        attr.value = val;
    });
    this.setState({attributes: newAttributes});
  }

  handleEditTool = () => {
      let toolObj = this.props.tool;
      toolObj.name = this.state.name;
      toolObj.quantity = Number(this.state.quantity);
      toolObj.attributes = this.state.attributes;

      let currentContainer = this.state.chosenContainer.id === "select" ? null : this.state.chosenContainer;
      let currentDrawer = this.state.chosenDrawer.id === "select" ? null : this.state.chosenDrawer;

      if(currentContainer === null && currentDrawer === null) {
          //Do nothing
      } else if (currentContainer !== null) {
          toolObj.drawer = null;
          toolObj.container = this.state.chosenContainer;
      } else if (currentDrawer !== null) {
          toolObj.drawer = this.state.chosenDrawer;
          toolObj.container = null;
      }

      update(Entities.TOOL, toolObj, toolObj.id)
        .then(() => {
          this.props.hide(toolObj);
        });
    }

    render () {
        const { show, hide, title, tool } = this.props;
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
                      placeholder={this.state.chosenToolbox.id}
                    />
                    <Dropdown
                      label="Choose Drawer"
                      data={this.state.drawers}
                      handler={this.handleDrawerSelect}
                      placeholder={this.state.chosenDrawer.id}
                    />
                    <Dropdown
                      label="Choose Container"
                      data={this.state.containers}
                      handler={this.handleContainerSelect}
                      placeholder={this.state.chosenContainer.id}
                    />
                    <FormGroup controlId='formBasicText'>
                      <ControlLabel>Tool Name</ControlLabel>
                      <FormControl 
                        type='text'
                        value={this.state.name}
                        placeholder={tool.name}
                        onChange={this.handleNameChange}
                      />
                    </FormGroup>
                    <FormGroup controlId='formBasicText'>
                      <ControlLabel>Tool Quantity</ControlLabel>
                      <FormControl 
                        type='text'
                        value={this.state.quantity}
                        placeholder={tool.quantity}
                        onChange={this.handleQuantityChange}
                      />
                    </FormGroup>
                    </form>
                    <KeyValuePairs
                      data={tool.attributes}
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
                    <Button bsStyle="success" onClick={this.handleEditTool}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default EditToolModal;