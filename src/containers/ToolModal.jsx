import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import CreateDropdown from '../components/CreateDropdown';
import KeyValueForm from '../components/KeyValueForm';
import axios from 'axios';
import '../css/ToolModal.css';
import { postTools } from '../utils/backend-api';

class ToolModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            addMoreCounter: ['1'],
            toolsList: [
                {name: "Thor's hammer"},
                {name: "WW's whip"},
                {name: "Captain's Shield"}
            ],
            toolData: {
                name: "",
                toolboxId:"",
                containerId:"",
                drawerId:"", 
                keyValuePairs: {}
            }
        };
    }

    addMore = () => { 
        this.state.addMoreCounter.push('1');
        this.forceUpdate();
    }

    handleCreateTool = () => {
        window.location.reload();
        this.props.hide()
        const { toolData } = this.state
        postTools(toolData.name, toolData.containerId, toolData.drawerId, toolData.toolboxId);
    }

    onToolboxChange = (e) => {
        const value = e.target.value;
        const toolData = this.state.toolData;
        const specificToolbox = this.props.data.toolboxes.filter((val)=>val.name===value)
        toolData.toolboxId = specificToolbox[0].id;
        this.setState({ toolData });
    }
    
    onDrawerChange = (e) => {
        const value = e.target.value;
        const toolData = this.state.toolData;
        const specificDrawer = this.props.data.drawers.filter((val)=>val.name===value)
        toolData.drawerId = specificDrawer[0].id;
        this.setState({ toolData });
    }
    onContainerChange = (e) => {
        const value = e.target.value;
        const toolData = this.state.toolData;
        const specificContainer= this.props.data.containers.filter((val)=>val.name===value)
        toolData.containerId = specificContainer[0].id;
        this.setState({ toolData });
    }
    onToolChange = (e) => {
        const toolData = this.state.toolData;
        toolData.name = e.target.value;
        this.setState({ toolData });
    }

    render () {
        const { addMoreCounter, toolsList } = this.state;
        const { show, hide, title } = this.props;
        const { drawers, containers, toolboxes } = this.props.data;
        const filteredDrawers = drawers.filter(val => val.toolbox.id === this.state.toolData.toolboxId);
        const filteredContainers = containers.filter(val => val.drawer.id === this.state.toolData.drawerId);

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
                        ref="drawer"
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
                        title="Choose a Tool" 
                        data={toolsList}
                        handler={this.onToolChange}
                    />

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