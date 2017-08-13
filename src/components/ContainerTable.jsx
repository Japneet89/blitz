import React from 'react';
import Container from '../entities/Container';
import { Button } from 'react-bootstrap';
import CreateContainerModal from '../actions/CreateContainerModal';

class ContainerTable extends React.Component {
	constructor(props) {
		super(props);
    	this.state = {
    		containers: props.data
    	};
	}

    openCreateModal = () => this.setState({ showCreateModal: true });

	closeCreateModal = () => this.setState({ showCreateModal: false });

	render() {
		const { containers } = this.state;
	    return (
	    	<div>
				<div className='header'>
		      		<Button
				        bsSize="small"
				        className="createButton"
				        bsStyle="success"
				        onClick={this.openCreateModal}>Create
		      		</Button>
		      		<p className='headerTitle'>Containers</p>
		    	</div>
		        <div className='containers'>
		          {
		            containers
		              .map(container => (
		                <Container
		                	id={container.id}
		                	name={container.name}
		                  	owner={container.owner}
		                  	drawer={container.drawer}
		                />
		              ))
		          }
		        </div>			    
		        <CreateContainerModal 
		          show={this.state.showCreateModal}
		          hide={this.closeCreateModal}
		          title='Create Container'
		    	/>
		    </div>
	    );
    }
}

export default ContainerTable;