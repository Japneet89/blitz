import React from 'react';
import Drawer from '../entities/Drawer';
import { Button } from 'react-bootstrap';
import CreateDrawerModal from '../actions/CreateDrawerModal';

class DrawerTable extends React.Component {
	constructor(props) {
		super(props);
    	this.state = {
    		drawers: props.data
    	};
	}

    openCreateModal = () => this.setState({ showCreateModal: true });

	closeCreateModal = () => this.setState({ showCreateModal: false });

	render() {
		const { drawers } = this.state;
		if(drawers === undefined || drawers === null || !Array.isArray(drawers))
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
		      		<p className='headerTitle'>Drawers</p>
		    	</div>
		        <div className='drawers'>
		          {
		            drawers
		              .map(drawer => (
		                <Drawer
		                	id={drawer.id}
		                	name={drawer.name}
		                  	owner={drawer.owner}
		                  	toolbox={drawer.toolbox}
		                  	key={drawer.id}
		                />
		              ))
		          }
		        </div>			    
		        <CreateDrawerModal 
		          show={this.state.showCreateModal}
		          hide={this.closeCreateModal}
		          title='Create Drawer'
		    	/>
		    </div>
	    );
	    }
    }
}

export default DrawerTable;