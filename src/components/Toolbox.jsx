import React from 'react';
import '../css/Toolbox.css';
import { Button } from 'react-bootstrap';
import DeleteModal from '../containers/DeleteModal';
import EditToolBoxModal from '../containers/EditToolboxModal';


class Toolbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      showEditModal: false,
    }
  }

  close = () => this.setState({ showModal: false });
  open = () => this.setState({ showModal: true });

  closeEditModal = () => this.setState({ showEditModal: false });
  openEditModal = () => this.setState({ showEditModal: true });

  render() {
    return (
      <div className="toolbox">
        <Button
          bsSize="small"
          onClick={this.open}
          className="deleteButton"
          bsStyle="danger">Delete
        </Button>
        <Button
          bsSize="small"
          className="editButton"
          bsStyle="default"
          onClick={this.openEditModal}>Edit
        </Button>
        <p className="toolboxName">{this.props.name}</p>
        <p className="user">Created By: {this.props.owner}</p>
        <DeleteModal 
          show={this.state.showModal} 
          hide={this.close}
          id={this.props.id}
          url={"/toolboxes/"}
          deleteToolBox={this.props.deleteToolBox}
        />
        <EditToolBoxModal 
          show={this.state.showEditModal}
          hide={this.closeEditModal}
          id={this.props.id}
          title='Edit a Toolbox'
          name={this.props.name}
          userId={this.props.userId}
        />
      </div>
    )
  }
}

export default Toolbox;