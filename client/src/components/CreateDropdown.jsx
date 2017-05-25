import React from 'react';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

const CreateDropdown = (props) => (
   
    <FormGroup controlId="formControlsSelect" onChange={props.handler}>
        <ControlLabel>{props.title}</ControlLabel>
        <FormControl bsSize="sm" componentClass="select" placeholder="select">
            <option value="select">select</option>
            {
                props.data.map((tool,i) => (
                    <option key={i} value={tool.name}>{tool.name}</option>
                ))
            }
        </FormControl>
    </FormGroup>
)

export default CreateDropdown;