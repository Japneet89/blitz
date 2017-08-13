import React from 'react';
import '../css/Toolbox.css';
import { Button } from 'react-bootstrap';
import DeleteModal from '../actions/DeleteModal';
import EditToolboxModal from '../actions/EditToolboxModal';
import Entities from './Entities';


class Toolbox extends React.Component {
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
    const { id, name, owner } = this.props;
    return (
      <div className="toolbox">
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
        <p className="toolboxName">{name}</p>
        <p className="user">Created By: {owner}</p>
        <DeleteModal 
          show={this.state.showDeleteModal} 
          hide={this.closeDeleteModal}
          id={id}
          resource={Entities.TOOLBOX}
        />
        <EditToolboxModal 
          show={this.state.showEditModal}
          hide={this.closeEditModal}
          title='Edit Toolbox'
          id={id}
          name={name}
          owner={owner}
        />
      </div>
    )
  }
}

export default Toolbox;