import React from 'react';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

const Dropdown = (props) => (   	
    <FormGroup controlId="formControlsSelect" onChange={props.handler}>
        <ControlLabel>{props.label}</ControlLabel>
        <FormControl bsSize="sm" componentClass="select" placeholder={props.placeholder} defaultValue={props.placeholder}>
            <option value="select">select</option>
            {
                    props.data.map((item,i) => (
                        <option key={i} value={item.id}>{item.name}</option>
                    ))
            }
        </FormControl>
    </FormGroup>
)

export default Dropdown;