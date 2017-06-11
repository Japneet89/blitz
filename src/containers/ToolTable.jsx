import  { Table, Tooltip, OverlayTrigger }  from 'react-bootstrap';
import React from 'react';
import PencilIcon from 'react-icons/lib/md/create';
import DeleteIcon from 'react-icons/lib/md/clear';
import ToolEditModal from './ToolEditModal';
import DeleteModal from '../containers/DeleteModal';


import '../css/Tools.css';

class ToolTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            showDeleteModal: false,
            deleteToolId: '',
            editToolId: ''
        }
    }

    close = () => this.setState({ showModal: false });
    open = (id) => this.setState({ showModal: true, editToolId: id });
    delete = (id) => this.setState({ deleteToolId: id, showDeleteModal: true });
    closeDelete = () => this.setState({ showDeleteModal: false });
    
    render () {
        const tooltipEdit = (<Tooltip id="tooltip">Edit</Tooltip>);
        const tooltipDelete = (<Tooltip id="tooltip">Delete</Tooltip>);
        const { showModal } = this.state;
        const { tools } = this.props;
        return (
            <Table responsive striped bordered condensed hover>
                <ToolEditModal 
                    show={showModal} 
                    hide={this.close} 
                    title="Edit Tool" 
                    data={this.props.data}
                    id={this.state.editToolId}
                />
                <DeleteModal 
                    show={this.state.showDeleteModal} 
                    hide={this.closeDelete}
                    id={this.state.deleteToolId}
                    url={"/tools/"}
                />
                <thead>
                <tr>
                    <th>Tools</th>
                    <th>Drawer</th>
                    <th>Containter</th>
                    <th>Toolbox</th>
                </tr>
                </thead>
                <tbody>
                    {  
                        tools.map((tool, i) => (
                            <tr key={i}>
                                <td>
                                    {tool.name}
                                    <OverlayTrigger placement="top" overlay={tooltipEdit}>
                                        <PencilIcon 
                                            onClick={() => this.open(tool.id)}
                                            className="pencilIcon"
                                        />
                                    </OverlayTrigger>
                                    <OverlayTrigger placement="top" overlay={tooltipDelete}>
                                        <DeleteIcon 
                                            onClick={() => this.delete(tool.id)}
                                            className="deleteIcon" 
                                        />
                                    </OverlayTrigger>
                                </td>
                                <td>{tool.drawer.name}</td>
                                <td>{tool.container.name}</td>
                                <td>{tool.toolbox.name}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        );
    }
};

export default ToolTable; 