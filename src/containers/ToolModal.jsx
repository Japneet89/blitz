import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import CreateDropdown from '../components/CreateDropdown';
import KeyValueForm from '../components/KeyValueForm';
import axios from 'axios';
import '../css/ToolModal.css';
import { postTools } from '../utils/backend-api';
import {getTools, getToolboxes, getDrawers, getContainers} from '../utils/backend-api';
import { Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';


class ToolModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            tools: [],
            toolboxes: [],
            drawers: [],
            containers: [],
            addMoreCounter: ['1'],
            toolData: {
                name: "",
                toolboxId:"",
                containerId:"",
                drawerId:"", 
                keyValuePairs: {}
            }
        };
    }

    componentDidMount() {
      getToolboxes().then((toolboxes) => {
        this.setState({ toolboxes} );
      });

      getDrawers().then((drawers) => {
        this.setState( {drawers} );
      });

      getContainers().then((containers) => {
        this.setState( {containers} );
      });

      getTools().then((tools) => {
        this.setState( {tools} );
      });
    }

    addMore = () => { 
        this.state.addMoreCounter.push('1');
        this.forceUpdate();
    }

    handleCreateTool = () => {
        this.props.hide()
        const { toolData } = this.state
        postTools(toolData.name, toolData.containerId, toolData.drawerId, toolData.toolboxId);
        setTimeout(function() {
            window.location.reload();
        }, 1000);
    }

    onToolboxChange = (e) => {
        const value = e.target.value;
        const toolData = this.state.toolData;
        const specificToolbox = this.state.toolboxes.filter(val => val.name===value)

        const drawers = this.state.drawers.filter(val => val.toolbox.name === value);

        toolData.toolboxId = specificToolbox[0].id;
        this.setState({ toolData });

        const obj = {target: {value: drawers[0].name}}
        this.onDrawerChange(obj);
    }
    
    onDrawerChange = (e) => {
        const value = e.target.value;
        const toolData = this.state.toolData;
        const specificDrawer = this.state.drawers.filter(val => val.name===value)
        toolData.drawerId = specificDrawer[0].id;
        this.setState({ toolData });
    }

    onContainerChange = (e) => {
        const value = e.target.value;
        const toolData = this.state.toolData;
        const specificContainer= this.state.containers.filter(val => val.name===value)
        toolData.containerId = specificContainer[0].id;
        this.setState({ toolData });
    }
    
    onToolChange = (e) => {
        const toolData = this.state.toolData;
        toolData.name = e.target.value;
        this.setState({ toolData });
    }

    render () {
        const { addMoreCounter, tools } = this.state;
        const { show, hide, title } = this.props;
        const { drawers, containers, toolboxes } = this.state;
        const filteredDrawers = drawers.filter(val => val.toolbox.id === this.state.toolData.toolboxId);
        const filteredContainers = containers.filter(val => val.drawer.id === this.state.toolData.drawerId);
        const toolsList = tools.filter(tool => tool.client === true);

        return (
            <Modal show={show} onHide={hide}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CreateDropdown 
                        title="Choose a Toolbox" 
                        data={toolboxes} 
                        handler={this.onToolboxChange}
                    />
                    <CreateDropdown 
                        title="Choose a Drawer" 
                        data={filteredDrawers}
                        handler={this.onDrawerChange}
                    />
                    <CreateDropdown 
                        title="Choose a Container" 
                        data={filteredContainers}
                        handler={this.onContainerChange}
                    />
                    {/*hard coded for now */}

                    <CreateDropdown 
                        title="Choose an existing Tool" 
                        data={toolsList}
                        handler={this.onToolChange}
                    />

                    <FormGroup onChange={this.onToolChange}>
                      <ControlLabel>Or create a new tool</ControlLabel>
                      {' '}
                      <FormControl type="value" placeholder="tool name" />
                    </FormGroup>

                    {addMoreCounter.length > 1 ? addMoreCounter.map((keyvaluePair,i) => <KeyValueForm key={i} />) : <KeyValueForm />}

                    <Button className="addMoreButton" onClick={this.addMore}>Add More</Button>
                </Modal.Body>
                <Modal.Footer>  
                    <Button bsStyle="success" onClick={this.handleCreateTool}>Save changes</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}


export default ToolModal;