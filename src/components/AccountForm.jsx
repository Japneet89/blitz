import React from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';

const AccountForm = (props) => (
    <form>
        <FormGroup 
            controlId="formBasicText"
            bsSize="large"
        >
            <FormControl
                type="text"
                bsSize="large"
                placeholder={props.placeholder}
            />
        </FormGroup>
    </form>
)
export default AccountForm;
