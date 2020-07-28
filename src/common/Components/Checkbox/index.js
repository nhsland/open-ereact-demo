import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';


export default ({ register, name, label, defaultValue = false }) => {
    const [checked, setChecked] = React.useState(defaultValue);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    return (

        <FormControlLabel
            control={
                <Checkbox
                    size='small'
                    checked={checked}
                    onChange={handleChange}
                    name={name}
                    color="primary"
                    inputRef={register}
                    value={checked ? label : undefined}
                />
            }
            label={label}
        />);
};
