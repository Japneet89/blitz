import React from 'react';
import { Modal, Button, Table } from 'react-bootstrap';
import CreateDropdown from '../components/CreateDropdown';
import KeyValueForm from '../components/KeyValueForm';
import DeleteIcon from 'react-icons/lib/md/clear';
import '../css/ToolModal.css';
import '../css/Tools.css';

class ToolEditModal extends React.Component {
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
                    
                    <CreateDropdown title="Choose a different Toolbox" data={toolboxes}/>
                    <CreateDropdown title="Choose a different Drawer" data={drawers}/>
                    <CreateDropdown title="Choose a different Container" data={containers}/>
                    <CreateDropdown title="Choose a different Tool" data={toolsList}/>
                    
                    {/*hard coded for now */}
                    <Table striped bordered condensed responsive>
                        <thead>
                        <tr>
                            <th>Key</th>
                            <th>Value</th>
                        </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Size</td>
                                <td>Big<DeleteIcon className="deleteIcon"/></td>
                            </tr>
                            <tr>
                                <td>Weight</td>
                                <td>1lb<DeleteIcon className="deleteIcon"/></td>
                            </tr>
                        </tbody>
                    </Table>
                    
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


export default ToolEditModal;