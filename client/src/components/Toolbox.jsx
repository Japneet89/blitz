import React from 'react';
import '../css/Toolbox.css';
import { Button } from 'react-bootstrap';

const Toolbox = (props) => (
  <div className="toolbox">
    <Button
      bsSize="small"
      className="deleteButton"
      bsStyle="danger">Delete
    </Button>
    <Button
      bsSize="small"
      className="editButton"
      bsStyle="info">Edit
    </Button>
    <p className="toolboxName">{props.name}</p>
    <p className="user">Created By: {props.owner}</p>
  </div>
)

export default Toolbox;