import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import MuiSelect from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const Select = ({ handleChange, value, options }) => {
    const classes = useStyles();
    return (
        <FormControl className={classes.formControl}>
            <MuiSelect
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value}
                onChange={e => handleChange(e.target.value)}
            >
                {options.map(({ value: itemValue, name }) =>
                    <MenuItem value={itemValue}>{name}</MenuItem>
                )}

            </MuiSelect>
        </FormControl>
    );
};
export default Select;