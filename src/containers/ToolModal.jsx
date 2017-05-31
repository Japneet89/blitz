import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import CreateDropdown from '../components/CreateDropdown';
import KeyValueForm from '../components/KeyValueForm';
import axios from 'axios';
import '../css/ToolModal.css';

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
        this.props.hide()
        const { toolData } = this.state
        axios.post('http://104.154.162.68:8080/api/tools/', {
            name: toolData.name,
            container: toolData.containerId,
            drawer: toolData.drawerId,
            toolbox: toolData.toolboxId
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
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
                        data={drawers}
                        handler={this.onDrawerChange}
                    />
                    <CreateDropdown 
                        title="Choose a Container" 
                        data={containers}
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