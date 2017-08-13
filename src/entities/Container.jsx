import React from 'react';
import '../css/Container.css';
import { Button } from 'react-bootstrap';
import DeleteModal from '../actions/DeleteModal';
import EditContainerModal from '../actions/EditContainerModal';
import Entities from './Entities';


class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      showEditModal: false,
    }
  }

  closeDeleteModal = () => this.setState({ showDeleteModal: false });
  openDeleteModal = () => this.setState({ showDeleteModal: true });

  closeEditModal = () => this.setState({ showEditModal: false });
  openEditModal = () => this.setState({ showEditModal: true });

  render() {
    const { id, name, owner, drawer } = this.props;
    return (
      <div className="containerEntity">
        <Button
          bsSize="small"
          onClick={this.openDeleteModal}
          className="deleteButton"
          bsStyle="danger">Delete
        </Button>
        <Button
          bsSize="small"
          className="editButton"
          bsStyle="default"
          onClick={this.openEditModal}>Edit
        </Button>
        <p className="containerName">{name}</p>
        <p className="user">Drawer: {drawer.name}</p>
        <p className="user">Created By: {owner}</p>
        <DeleteModal 
          show={this.state.showDeleteModal} 
          hide={this.closeDeleteModal}
          id={id}
          resource={Entities.CONTAINER}
        />
        <EditContainerModal 
          show={this.state.showEditModal}
          hide={this.closeEditModal}
          title='Edit Container'
          id={id}
          name={name}
          owner={owner}
          drawer={drawer}
        />
      </div>
    )
  }
}

export default Container;