import React from 'react';
import { Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import '../css/KeyValueForm.css';

const KeyValueForm = (props) => (
    <Form className="keyValueFormContainer">
        <FormGroup className="formControl" controlId="formInlineName">
            <ControlLabel>Key</ControlLabel>
            {' '}
            <FormControl type="key" placeholder="Key Name" />
        </FormGroup>
            {' '}
        <FormGroup className="formControl" controlId="formInlineEmail">
            <ControlLabel>Value</ControlLabel>
            {' '}
            <FormControl type="value" placeholder="Value" />
        </FormGroup>
            {' '}
    </Form>
)

export default KeyValueForm;
