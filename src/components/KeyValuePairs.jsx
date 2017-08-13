import React from 'react';
import { Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import '../css/KeyValueForm.css';

const KeyValuePairs = (props) => (
	<Form inline>
	{
		props.data.map((kvp) => (
				<div>
					<FormGroup className="formControl">
						<ControlLabel>Attribute</ControlLabel>
						{' '}
						<FormControl
							type='text'
							id={kvp.key}
	            			value={kvp.key}
	                        placeholder='Attribute name'
	                        onChange={props.onKeyChange}
	                   	/>
	                </FormGroup>
	                {' '}
	                <FormGroup className="formControl">
						<ControlLabel>Value</ControlLabel>
						{' '}
						<FormControl
							type='text'
							id={kvp.key}
	            			value={kvp.value}
	                        placeholder='Attribute value'
	                        onChange={props.onValChange}
	                   	/>
	                </FormGroup>
	                {' '}
                </div>
			))
	}
    </Form> 
)

export default KeyValuePairs;