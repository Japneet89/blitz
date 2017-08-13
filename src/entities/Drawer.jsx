import React from 'react';
import '../css/Drawer.css';
import { Button } from 'react-bootstrap';
import DeleteModal from '../actions/DeleteModal';
import EditDrawerModal from '../actions/EditDrawerModal';
import Entities from './Entities';


class Drawer extends React.Component {
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
    const { id, name, owner, toolbox } = this.props;
    return (
      <div className="drawer">
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
        <p className="drawerName">{name}</p>
        <p className="user">Toolbox: {toolbox.name}</p>
        <p className="user">Created By: {owner}</p>
        <DeleteModal 
          show={this.state.showDeleteModal} 
          hide={this.closeDeleteModal}
          id={id}
          resource={Entities.DRAWER}
        />
        <EditDrawerModal 
          show={this.state.showEditModal}
          hide={this.closeEditModal}
          title='Edit Drawer'
          id={id}
          name={name}
          owner={owner}
          toolbox={toolbox}
        />
      </div>
    )
  }
}

export default Drawer;