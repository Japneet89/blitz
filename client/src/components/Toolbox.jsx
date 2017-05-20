import React from 'react';
import '../css/Toolbox.css';
import { Button } from 'react-bootstrap';
import DeleteToolboxModal from '../containers/DeleteToolboxModal';


class Toolbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    }
  }

  close = () => this.setState({ showModal: false });
  open = () => this.setState({ showModal: true });

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
          bsStyle="default">Edit
        </Button>
        <p className="toolboxName">{this.props.name}</p>
        <p className="user">Created By: {this.props.owner}</p>
        <DeleteToolboxModal 
          show={this.state.showModal} 
          hide={this.close}
        />
      </div>
    )
  }
}

export default Toolbox;