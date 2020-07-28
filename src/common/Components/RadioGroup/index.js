import React from "react";
import { useFormContext } from "react-hook-form";
import {
    RadioGroup,
    FormControlLabel,
    Radio,
    FormLabel
} from "@material-ui/core";


const RadioGroupMUI = ({
    values,
    name,
    inputRef,
    label,
    disabled,
    defaultValue = '',
    required = 'This fill is required',
}) => {
    const { register } = useFormContext();
    const [selection, setSelection] = React.useState({ [name]: defaultValue });

    const updateSelection = (e) => {
        e.persist();
        setSelection({ ...selection, [name]: e.target.value });
    };
    return (
        <div className="App">
            <FormLabel component="legend">{label}</FormLabel>
            <RadioGroup
                name={name}
                value={selection[name]}
                onChange={updateSelection}
            >
                {values.map(({ value, id }) => (
                    <FormControlLabel
                        disabled={disabled}
                        label={value}
                        key={id}
                        value={id}
                        inputRef={inputRef || register({ required })}
                        control={<Radio color="primary" />}
                    />
                ))}
            </RadioGroup>
        </div>
    );
};

export default RadioGroupMUI;
