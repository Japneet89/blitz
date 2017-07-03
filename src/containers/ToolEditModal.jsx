import React from 'react';
import { Modal, Button, Table } from 'react-bootstrap';
import CreateDropdown from '../components/CreateDropdown';
import KeyValueForm from '../components/KeyValueForm';
import DeleteIcon from 'react-icons/lib/md/clear';
import '../css/ToolModal.css';
import '../css/Tools.css';
import axios from 'axios';
import { putTools } from '../utils/backend-api';
import {getTools, getToolboxes, getDrawers, getContainers} from '../utils/backend-api';
import { Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';


class ToolEditModal extends React.Component {
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
            },
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

  handleEditTool = () => {
    this.props.hide()
    const { toolData } = this.state
    putTools(this.props.id, toolData.name, toolData.containerId, toolData.drawerId, toolData.toolboxId)
        .then(response => {
            this.props.editTool(response.data.item)
        })
   }

    onToolboxChange = (e) => {
        const value = e.target.value;
        const toolData = this.state.toolData;
        const specificToolbox = this.state.toolboxes.filter((val)=>val.name===value)

        const drawers = this.state.drawers.filter(val => val.toolbox.name === value);

        toolData.toolboxId = specificToolbox[0].id;
        this.setState({ toolData });

        const obj = {target: {value: drawers[0].name}}
        this.onDrawerChange(obj);
    }
    
    onDrawerChange = (e) => {
        const value = e.target.value;
        const toolData = this.state.toolData;
        const specificDrawer = this.state.drawers.filter((val)=>val.name===value)
        toolData.drawerId = specificDrawer[0].id;
        this.setState({ toolData });
    }
    onContainerChange = (e) => {
        const value = e.target.value;
        const toolData = this.state.toolData;
        const specificContainer= this.state.containers.filter((val)=>val.name===value)
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
                      <ControlLabel>Or choose a new tool name</ControlLabel>
                      {' '}
                      <FormControl type="value" placeholder="tool name" />
                    </FormGroup>
                    
                    {/*hard coded for now */}
                    <Table striped bordered condensed responsive>
                        <thead>
                        <tr>
                            <th>Key</th>
                            <th>Value</th>
                        </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Size</td>
                                <td>Big<DeleteIcon className="deleteIcon"/></td>
                            </tr>
                            <tr>
                                <td>Weight</td>
                                <td>1lb<DeleteIcon className="deleteIcon"/></td>
                            </tr>
                        </tbody>
                    </Table>
                    
                    {addMoreCounter.length > 1 ? addMoreCounter.map((keyvaluePair,i) => <KeyValueForm key={i} />) : <KeyValueForm />}
                   
                    <Button className="addMoreButton" onClick={this.addMore}>Add More</Button>
                </Modal.Body>
                <Modal.Footer>  
                    <Button bsStyle="success" onClick={this.handleEditTool}>Save changes</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}


export default ToolEditModal;