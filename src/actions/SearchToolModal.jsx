import React from 'react';
import { Modal } from 'react-bootstrap';
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
  	const { show, hide, title } = this.props;
    const tools = this.state.tools.sort(function(a,b) {
      return b.score - a.score;
    });
 
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
                  <p key={tool.title}><a href={tool.url} key={tool.title}>{tool.title}</a></p>
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