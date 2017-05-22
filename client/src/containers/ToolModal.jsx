import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import CreateDropdown from '../components/CreateDropdown';
import KeyValueForm from '../components/KeyValueForm';
import '../css/ToolModal.css';

class ToolModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
        addMoreCounter: ['1'],
        toolsList: [
            {name: "Thor's hammer"},
            {name: "WW's whip"},
            {name: "Captain's Shield"}
        ]
        };
    }

  addMore = () => {
      this.state.addMoreCounter.push('1');
      this.forceUpdate();
  }

    render () {
        const { addMoreCounter, toolsList } = this.state;
        const { show, hide, title } = this.props;
        const { drawers, containers, toolboxes } = this.props.data;
        return (
            <Modal show={show} onHide={hide}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CreateDropdown title="Choose a Toolbox" data={toolboxes}/>
                    <CreateDropdown title="Choose a Drawer" data={drawers}/>
                    <CreateDropdown title="Choose a Container" data={containers}/>
                    {/*hard coded for now */}
                    <CreateDropdown title="Choose a Tool" data={toolsList}/>
                    
                    {addMoreCounter.length > 1 ? addMoreCounter.map((keyvaluePair,i) => <KeyValueForm key={i} />) : <KeyValueForm />}
                    <Button className="addMoreButton" onClick={this.addMore}>Add More</Button>
                </Modal.Body>
                <Modal.Footer>  
                    <Button bsStyle="success">Save changes</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}


export default ToolModal;