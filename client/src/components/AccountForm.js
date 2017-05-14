import React from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';

function AccountForm (props) {
    return (
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
}
export default AccountForm;
