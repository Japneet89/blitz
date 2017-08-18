import  { Table, Button }  from 'react-bootstrap';
import React from 'react';
import CreateToolModal from '../actions/CreateToolModal';
import Tool from '../entities/Tool';
import '../css/Tool.css';

class ToolTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tools: props.data,
            drawers: props.drawers,
            containers: props.containers,
            toolboxes: props.toolboxes,
        }
    }

    openCreateModal = () => this.setState({ showCreateModal: true });

    closeCreateModal = (newTool=null) => {
        if(newTool.hasOwnProperty('name')) {
            console.log("newtool: ", newTool);
            let newTools = this.state.tools;
            newTools.push(newTool)
            this.props.stateUpdateCallback({tools: newTools});
        }
        this.setState({ showCreateModal: false });
    }
    
    render () {
        const { tools } = this.state;
        console.log(tools);
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
                    <p className='headerTitle'>Tools</p>
                </div>
                <div className='tools'>
                    <Table responsive striped bordered condensed>
                        <thead>
                            <tr>
                                <th>Toolbox</th>
                                <th>Drawer</th>
                                <th>Container</th>
                                <th>Tool</th>
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