import React from "react";
import { Checkbox, FormControlLabel, FormGroup } from "@material-ui/core";
import uniqid from 'uniqid';

const Checkboxes = ({ handleChange, options = [], checked }) => {
    return (
        <FormGroup>
            {options.map(checkbox => (
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={checked[checkbox.id]}
                            onChange={event => handleChange(event, checkbox.id)}
                            value={checkbox.id}
                            color="primary"
                            disabled
                        />
                    }
                    label={checkbox.label}
                    key={uniqid()}
                />
            ))}
        </FormGroup>
    );
};

export default Checkboxes;
