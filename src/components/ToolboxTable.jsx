import React from 'react';
import Toolbox from '../entities/Toolbox';
import { Button } from 'react-bootstrap';
import CreateToolboxModal from '../actions/CreateToolboxModal';

class ToolboxTable extends React.Component {
	constructor(props) {
		super(props);
    	this.state = {
    		toolboxes: props.data
    	};
	}

    openCreateModal = () => this.setState({ showCreateModal: true });

	closeCreateModal = () => this.setState({ showCreateModal: false });

	render() {
		const toolboxes = this.props.data;
		if(toolboxes === undefined || toolboxes === null || !Array.isArray(toolboxes))
			return (<div/>);
		else {
	    return (
	    	<div className="entityList">
				<div className='header'>
		      		<Button
				        bsSize="small"
				        className="createButton"
				        bsStyle="success"
				        onClick={this.openCreateModal}>Create
		      		</Button>
		      		<p className='headerTitle'>Toolboxes</p>
		    	</div>
		        <div className='toolboxes'>
		          {
		            toolboxes
		              .map(toolbox => (
		                <Toolbox
		                	id={toolbox.id}
		                	name={toolbox.name}
		                  	owner={toolbox.owner}
		                />
		              ))
		          }
		        </div>			    
		        <CreateToolboxModal 
		          show={this.state.showCreateModal}
		          hide={this.closeCreateModal}
		          title='Create Toolbox'
		    	/>
		    </div>
	    );
	    }
    }
}

export default ToolboxTable;