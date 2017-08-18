import React from 'react';
import '../css/Tool.css';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import PencilIcon from 'react-icons/lib/md/create';
import DeleteIcon from 'react-icons/lib/md/clear';
import SearchIcon from 'react-icons/lib/md/add-shopping-cart';
import DeleteModal from '../actions/DeleteModal';
import EditToolModal from '../actions/EditToolModal';
import SearchToolModal from '../actions/SearchToolModal';
import Entities from './Entities';

class Tool extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      showEditModal: false,
      showSearchModal: false,
      toolboxes: props.toolboxes,
      drawers: props.drawers,
      containers: props.containers,
      tools: props.tools
    }
  }

  openDeleteModal = () => this.setState({ showDeleteModal: true });
  closeDeleteModal = () => this.setState({ showDeleteModal: false });
  

  openEditModal = () => this.setState({ showEditModal: true });
  closeEditModal = (updatedTool=null) => {
  	if(updatedTool.hasOwnProperty('id')) {
  		let updateIndex = this.state.tools.findIndex(x => x.id === updatedTool.id);
  		let newTools = this.state.tools;
  		newTools[updateIndex] = updatedTool;
  		this.props.stateUpdateCallback({tools: newTools});
  	}
  	this.setState({ showEditModal: false });
  }


  closeSearchModal = () => this.setState({ showSearchModal: false });
  openSearchModal = () => this.setState({ showSearchModal: true });

  render() {
  	const { data } = this.props;
	const tooltipEdit = (<Tooltip id="tooltip">Edit</Tooltip>);
	const tooltipDelete = (<Tooltip id="tooltip">Delete</Tooltip>);
	const tooltipSearch = (<Tooltip id="tooltip">Search for Recommendations</Tooltip>);
	let name = data.name;
	let toolbox, container, drawer = "";
	if(data.container !== null && data.container !== undefined) {
		toolbox = data.container.drawer.toolbox.name;
		drawer = data.container.drawer.name;
		container = data.container.name;
	} else {
		toolbox = data.drawer.toolbox.name;
		drawer = data.drawer.name;
	}
  	return (
  		<tr key={data.id}>
  			<td> {toolbox} </td>
  			<td> {drawer} </td>
  			<td> {container} </td>
  			<td> 
  				{name}
  				<OverlayTrigger placement="top" overlay={tooltipEdit}>
	                <PencilIcon 
	                    onClick={this.openEditModal}
	                    className="pencilIcon"
	                />
	            </OverlayTrigger>
	            <OverlayTrigger placement="top" overlay={tooltipDelete}>
	                <DeleteIcon 
	                    onClick={this.openDeleteModal}
	                    className="deleteIcon" 
	                />
	            </OverlayTrigger>
	            <OverlayTrigger placement="top" overlay={tooltipSearch}>
	                <SearchIcon 
	                    onClick={this.openSearchModal}
	                    className="searchIcon" 
	                />
	            </OverlayTrigger>
			</td>
	        <EditToolModal 
			    show={this.state.showEditModal}
	         	hide={this.closeEditModal} 
			    title="Edit Tool"
			    toolboxes={this.state.toolboxes}
			    drawers={this.state.drawers}
			    containers={this.state.containers}
			    tool={data}
			/>
			<DeleteModal 
			    show={this.state.showDeleteModal} 
	          	hide={this.closeDeleteModal}
			    id={data.id}
			    resource={Entities.TOOL}
			/>
			<SearchToolModal
				show={this.state.showSearchModal}
				hide={this.closeSearchModal}
				title='Replacement Recommendations'	
				tool={data}
			/>
		</tr>	
  	);
  }
};

export default Tool;