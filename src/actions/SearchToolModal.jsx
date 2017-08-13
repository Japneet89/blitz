import React from 'react';
import { Modal, Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import '../css/Modal.css';
import { getRecommendations } from '../utils/backend-api';

class SearchToolModal extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
      	tools: [] 
      }
  }

  componentDidMount() {
    getRecommendations(this.props.tool.name)
      .then(output => this.setState({tools: output.items}));
  }

  render () {
  	const { show, hide, title, tool } = this.props;
    const tools = this.state.tools;
    if(tools === undefined)
      return (<div/>);
    else {
	  return (
		  <Modal show={show} onHide={hide}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            {
              this.state.tools
                .map((tool) => 
                  <a href={tool.url}>{tool.title}</a>
                )
            }
            </Modal.Body>
            <Modal.Footer>  
            </Modal.Footer>
        </Modal>
	  );
    }
  }
};

export default SearchToolModal;