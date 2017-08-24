import React from 'react';
import { Modal } from 'react-bootstrap';
import '../css/Modal.css';

class SearchToolModal extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
      	tools: [] 
      }
  }

  componentDidMount() {
    
  }

  render () {
    const { show, hide, title, tools } = this.props;
 
    if(tools === undefined) {
      return (
        <Modal show={show} onHide={hide}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            </Modal.Body>
            <Modal.Footer>  
            </Modal.Footer>
        </Modal>
      );
    }
    else {
    let recommendations = tools.sort(function(a,b) {
      return b.score - a.score;
    });
	  return (
		  <Modal show={show} onHide={hide}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            {
              recommendations
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