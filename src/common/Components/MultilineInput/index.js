import React, { useState } from 'react';
import { useFormContext } from "react-hook-form";
import uniqid from 'uniqid';
import {
    Typography, Box, makeStyles, Grid, List,
    ListItem
} from '@material-ui/core';
import Input from "../Input/Input";
import Dialog from '../Dialog';
import Button from '../Button';

const MAX_CHARS_ISB_TABS = "255";
const MULTILINE_INPUT_ROWS = "5";

const useStyles = makeStyles(() => ({
    root: {
        borderRight: '2px solid #F8F8F8',
        width: '60%'
    }
}));

const MultilineInput = ({
    label,
    needHelp,
    // register,
    name,
    handleChange,
    helpProp,
    defaultValue
}) => {
    const classes = useStyles();
    const { register } = useFormContext();
    const [avaibleChars, setAvaibleChars] = useState(0);
    const [value, setValue] = useState('');
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);
    const onChange = event => {
        event.preventDefault();
        setValue(event.target.value);
        setAvaibleChars(MAX_CHARS_ISB_TABS - event.target.value.length);
    };

    return (
        <Box flex="auto" display="flex">
            <Box flex="auto" width={200} p={2}>
                <Input
                    className={classes.root}
                    name={name}
                    label={label}
                    defaultValue={defaultValue}
                    onChange={e => onChange(e)}
                    inputRef={register}
                    multiline
                    rows={MULTILINE_INPUT_ROWS}
                    variant="standard"
                    onBlur={() => handleChange(value)}
                    inputProps={{ maxlength: '255' }}

                />
            </Box>
            <Box flex="auto">
                <Box>
                    <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                        spacing={4}
                    >
                        <Grid item>
                            <Typography variant="button">{`${avaibleChars}/${MAX_CHARS_ISB_TABS}`}</Typography>
                        </Grid>
                        <Grid item>
                            {needHelp && (
                                <Dialog
                                    open={open}
                                    title={helpProp.title}
                                    keepMounted
                                    handleClose={handleClose}
                                    openAction={<Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={handleOpen}
                                    >
                                        Help
                                      </Button>}
                                >
                                    <List>
                                        {helpProp.content.map(option => (
                                            <ListItem key={uniqid()} style={{ listStyle: 'inside' }}>
                                                - {option}
                                            </ListItem>
                                        ))}
                                    </List></Dialog>
                            )}
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Box>
    );
};

export default MultilineInput;
