import  { Table, Button, Collapse, ProgressBar }  from 'react-bootstrap';
import React from 'react';
import ReactFileReader from 'react-file-reader';
import CreateToolModal from '../actions/CreateToolModal';
import Tool from '../entities/Tool';
import { listAll, create } from '../utils/backend-api';
import '../css/Tool.css';
import Entities from '../entities/Entities';
const FileDownload = require('react-file-download');
const Papa = require('papaparse');

class ToolTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tools: props.data,
            drawers: props.drawers,
            containers: props.containers,
            toolboxes: props.toolboxes,
            now: 0,
            label: 'Importing Tools...',
            ProgressBar: false
        }

        this.toolboxExists = this.toolboxExists.bind(this);
        this.drawerExists = this.drawerExists.bind(this);
        this.containerExists = this.containerExists.bind(this);
        this.toolInContainer = this.toolInContainer.bind(this);
        this.blankRow = this.blankRow.bind(this);
        this.createToolbox = this.createToolbox.bind(this);
        this.createDrawer = this.createDrawer.bind(this);
        this.createContainer = this.createContainer.bind(this);
        this.createTool = this.createTool.bind(this);
        this.getExistingToolbox = this.getExistingToolbox.bind(this);
        this.getExistingDrawer = this.getExistingDrawer.bind(this);
        this.getExistingContainer = this.getExistingContainer.bind(this);
        this.getToolbox = this.getToolbox.bind(this);
        this.getDrawer = this.getDrawer.bind(this);
        this.getContainer = this.getContainer.bind(this);
    }

    openCreateModal = () => this.setState({ showCreateModal: true });

    closeCreateModal = (newTool=null) => {
        if(newTool.hasOwnProperty('name')) {
            let newTools = this.state.tools;
            newTools.push(newTool)
            this.props.stateUpdateCallback({tools: newTools});
        }
        this.setState({ showCreateModal: false });
    }

    downloadCSV = () => {
        return listAll('tools/csv/export')
            .then((data) => {
                FileDownload(data, 'tools.csv');
            });
    }

    handleSort(entityType) {
        let sortedEntities = this.state.tools;
        sortedEntities = sortedEntities.sort(function(a,b) {
            if(entityType === 'toolboxes') {
                let toolboxA = this.getToolbox(a);
                let toolboxB = this.getToolbox(b);
                return toolboxA.localeCompare(toolboxB);
            } else if (entityType === 'drawers') {
                let drawerA = this.getDrawer(a);
                let drawerB = this.getDrawer(b);
                return drawerA.localeCompare(drawerB);
            } else if (entityType === 'containers') {
                let containerA = this.getContainer(a);
                let containerB = this.getContainer(b);
                return containerA.localeCompare(containerB);
            } else {
                let toolA = a.name;
                let toolB = b.name;
                return toolA.localeCompare(toolB);
            }
        }.bind(this));

        this.setState({[entityType]: sortedEntities});
    }

    getToolbox = (tool) => {
        if(tool.container !== null && tool.container !== undefined)
            return tool.container.drawer.toolbox.name;
        else
            return tool.drawer.toolbox.name;
    }

    getDrawer = (tool) => {
        if(tool.container !== null && tool.container !== undefined)
            return tool.container.drawer.name;
        else
            return tool.drawer.name;
    }

    getContainer = (tool) => {
        if(tool.container !== null && tool.container !== undefined)
            return tool.container.name;
        else
            return '';
    }

    handleFiles = (files) => {

        this.setState({now: 0});
        this.setState({ProgressBar: true});
        Papa.parse(files[0], {
            header: true,
            skipEmptyLines: true,
            step: function(rowObj, parser) {
                let row = rowObj.data[0];
                if(this.blankRow(row))
                    return;

                parser.pause();

                let promiseChain;
                let newToolbox = !this.toolboxExists(row);
                let newDrawer = !this.drawerExists(row);
                let newContainer = !this.containerExists(row);
                let needContainer = this.toolInContainer(row);

                if(newToolbox && !needContainer) {
                    promiseChain = this.createToolbox(row)
                                    .then(toolbox => this.createDrawer(row, toolbox))
                                    .then(drawer => this.createTool(row, {drawer:drawer})); 
                } else if (newToolbox && needContainer) {
                    promiseChain = this.createToolbox(row)
                                    .then(toolbox => this.createDrawer(row, toolbox))
                                    .then(drawer => this.createContainer(row, drawer))
                                    .then(container => this.createTool(row, {container:container}));
                } else if (!newToolbox && !newDrawer && !needContainer) {
                    promiseChain = this.createTool(row, {drawer:this.getExistingDrawer(row)});
                } else if (!newToolbox && !newDrawer && needContainer && !newContainer) {
                    promiseChain = this.createTool(row, {container:this.getExistingContainer(row)});
                } else if (!newToolbox && newDrawer && !needContainer) {
                    promiseChain = this.createDrawer(row, this.getExistingToolbox(row))
                                .then(drawer => this.createTool(row, {drawer:drawer}));
                } else if (!newToolbox && newDrawer && needContainer) {
                    promiseChain = this.createDrawer(row, this.getExistingToolbox(row))
                                .then(drawer => this.createContainer(row, drawer))
                                .then(container => this.createTool(row, {container:container}));
                } else if (!newToolbox && !newDrawer && needContainer && newContainer) {
                    promiseChain = this.createContainer(row, this.getExistingDrawer(row))
                                    .then(container => this.createTool(row, {container:container}));
                }

                promiseChain.then(() => {
                    let progressUpdate = this.state.now + 1;
                    this.setState({now: progressUpdate}); 
                    parser.resume(); 
                });

            }.bind(this),
            complete: function() {
                this.setState({now: 100});
                this.setState({ProgressBar: false});
                this.props.stateUpdateCallback({
                    toolboxes: this.state.toolboxes,
                    drawers: this.state.drawers,
                    containers: this.state.containers,
                    tools: this.state.tools
                });
            }.bind(this)
        });
    }

    blankRow = (data) => {
        return data['Toolbox'] === '' ? true : false;
    }

    toolboxExists = (data) => {
        return this.state.toolboxes
                .filter(toolbox => toolbox.name === data['Toolbox'])
                .length > 0
                ? true
                : false;
    }

    createToolbox = (data) => {
       let toolbox = {name: data['Toolbox']};
       return create(Entities.TOOLBOX, toolbox)
        .then((data) => {
            let newToolboxes = this.state.toolboxes;
            newToolboxes.push(data);
            this.setState({toolboxes: newToolboxes});
            return Promise.resolve(data);
        });
    }

    getExistingToolbox = (data) => {
        return this.state.toolboxes
                .filter(toolbox => toolbox.name === data['Toolbox'])[0];
    }

    drawerExists = (data) => {
        return this.state.drawers
                .filter(drawer => drawer.toolbox.name === data['Toolbox'] 
                                    && drawer.name === data['Drawer'])
                .length > 0
                ? true
                : false;
    }

    getExistingDrawer = (data) => {
        return this.state.drawers
                .filter(drawer => drawer.toolbox.name === data['Toolbox']
                                    && drawer.name === data['Drawer'])[0];
    }

    createDrawer = (data, toolbox) => {
        let drawer = {name: data['Drawer'], toolbox: toolbox};
        return create(Entities.DRAWER, drawer)
        .then((data) => {
            let newDrawers = this.state.drawers;
            newDrawers.push(data);
            this.setState({drawers: newDrawers});
            return Promise.resolve(data);
        });
    }

    containerExists = (data) => {
        return this.state.containers
                .filter(container => container.drawer.name === data['Drawer'] 
                                    && container.name === data['Container']
                                    && container.drawer.toolbox.name === data['Toolbox'])
                .length > 0
                ? true
                : false;
    }

    getExistingContainer = (data) => {
        return this.state.containers
                .filter(container => container.drawer.name === data['Drawer'] 
                                    && container.name === data['Container']
                                    && container.drawer.toolbox.name === data['Toolbox'])[0];
    }

    createContainer = (data, drawer) => {
        let container = {name: data['Container'], drawer: drawer};
        return create(Entities.CONTAINER, container)
        .then((data) => {
            let newContainers = this.state.containers;
            newContainers.push(data);
            this.setState({containers: newContainers});
            return Promise.resolve(data);
        });
    }

    toolInContainer = (data) => {
        return data['Container'] === '' ? false : true;
    }

    createTool = (data, options) => {
        let partNoAttribute = (data['Part Number'] === '') ? {} : {key: 'Part Number', value:data['Part Number']};
        let attributes = [];
        attributes.push(partNoAttribute);
        let tool = (options.container === undefined) 
                        ? {name: data['Tool Nomenclature'], quantity:Number(data['Qty']), attributes:attributes, drawer: options.drawer}
                        : {name: data['Tool Nomenclature'], quantity:Number(data['Qty']), attributes:attributes, container: options.container};

        return create(Entities.TOOL, tool)
            .then((data) => {
                let newTools = this.state.tools;
                newTools.push(data);
                this.setState({tools: newTools});
                return Promise.resolve(data);
            });
    }

    
    render () {
        const { tools } = this.state;
        if(tools === undefined || tools === null || !Array.isArray(tools))
            return (<div/>);
        else {
        return (
            <div>
                <div className='header'>
                    <Button
                        bsSize="small"
                        className="createButton"
                        bsStyle="success"
                        onClick={this.openCreateModal}>Create
                    </Button>
                    <Button
                        bsSize="small"
                        className="createButton"
                        bsStyle="success"
                        onClick={this.downloadCSV}>Export
                    </Button>
                    <ReactFileReader handleFiles={this.handleFiles} fileTypes={'.csv'}>
                        <Button 
                            bsSize="small"
                            className="createButton"
                            bsStyle="success">Import
                        </Button>
                    </ReactFileReader>
                    <p className='headerTitle'>Tools</p>
                </div>
                <Collapse in={this.state.ProgressBar}>
                    <div>
                        <ProgressBar active now={this.state.now} label={this.state.label} />
                    </div>
                </Collapse>
                <div className='tools'>
                    <Table responsive striped bordered condensed>
                        <thead>
                            <tr>
                                <th><a onClick={() => this.handleSort('toolboxes')}>Toolbox</a></th>
                                <th><a onClick={() => this.handleSort('drawers')}>Drawer</a></th>
                                <th><a onClick={() => this.handleSort('containers')}>Container</a></th>
                                <th><a onClick={() => this.handleSort('tools')}>Tool</a></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                tools
                                    .map((tool) => (
                                        <Tool
                                            data={tool}
                                            toolboxes={this.state.toolboxes}
                                            drawers={this.state.drawers}
                                            containers={this.state.containers}
                                            tools={this.state.tools}
                                            key={tool.id}
                                            stateUpdateCallback={this.props.stateUpdateCallback}
                                        />
                                    ))    
                            }
                        </tbody>
                    </Table>        
                </div>              
                <CreateToolModal 
                  show={this.state.showCreateModal}
                  hide={this.closeCreateModal}
                  title='Create Tool'
                  toolboxes={this.state.toolboxes}
                  drawers={this.state.drawers}
                  containers={this.state.containers}
                  tools={this.state.tools}
                />
            </div>
        );
        }
    }
};

export default ToolTable; 