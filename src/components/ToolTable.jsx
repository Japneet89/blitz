import  { Table, Button }  from 'react-bootstrap';
import React from 'react';
import CreateToolModal from '../actions/CreateToolModal';
import Tool from '../entities/Tool';
import '../css/Tool.css';

class ToolTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tools: props.data
        }
    }

    openCreateModal = () => this.setState({ showCreateModal: true });

    closeCreateModal = () => this.setState({ showCreateModal: false });
    
    render () {
        const { tools } = this.state;
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
                />
            </div>
        );
    }
};

export default ToolTable; 