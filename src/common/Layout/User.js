import React, { useState, useContext } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useForm, FormContext } from 'react-hook-form';
import MuiDialog from '@material-ui/core/Dialog';
import { IconButton, Grid, Typography, Box, FormControlLabel, FormLabel, Radio, Divider, Switch } from '@material-ui/core';
import { AuthContext } from '../../core/context/AuthContext';
import { SettingsContext } from '../../core/context/SettingsContext';
import Button from "../Components/Button";
import RadioGroup from "../Components/RadioGroup";

import UserAvatar from './UserAvatar';

export const RadioItem = ({ value, label, disabled }) => (
    <FormControlLabel
        value={value}
        control={<Radio size='small' color="primary" disabled={disabled} />}
        label={label}
    />
);

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
        margin: 0
    },
    scrollContainer: {
        overflow: 'auto'
    },
    paper: {
        minWidth: 400,
        border: '0.0469em solid #757575',

        overflow: 'auto'
    }
}));

const Dialog = withStyles(() => ({
    scrollPaper: {
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection: 'row-reverse',
        justifyContent: 'flex-start'
    }
}))(MuiDialog);

export default () => {
    const [open, setOpen] = useState(false);
    const { user, setAuthData } = useContext(AuthContext);
    const { settings, setSettingsContext } = useContext(SettingsContext);
    const methods = useForm({});
    const register = methods;
    const [state, setState] = React.useState(settings);

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleLogout = () => setAuthData(null);

    const onSubmit = (data) => {

        setSettingsContext(state);
        handleClose();
    };




    const classes = useStyles();
    const { name, grade, id } = user;
    const { first, surname } = name;
    return (
        <Box ml={2}>
            <div className={classes.root}>
                <div className={classes.scrollContainer}>
                    <Grid container alignItems="center" justify="center">
                        <div>
                            <IconButton onClick={handleOpen}>
                                <UserAvatar name={name} />

                            </IconButton>

                            <Dialog open={open} onClose={handleClose}>
                                <Grid container alignItems='center' justify='space-between' direction='column'>

                                    <Grid item>
                                        <Grid
                                            container
                                            direction="row"
                                            justify="space-between"
                                            alignItems="flex-start"
                                        >
                                            <Grid item>
                                                <Box m={2} mr={3} mt={1}>
                                                    <Typography>{first}, {surname}</Typography>
                                                    <Typography>{id}</Typography>
                                                    <Typography>{grade}</Typography>
                                                </Box>
                                            </Grid>
                                            <Grid item>
                                                <Box m={1}>
                                                    <UserAvatar name={name} color='#005EB8' />
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <Box m={1}>
                                            <Button
                                                width={200}
                                                color="success"
                                                variant="contained"
                                                onClick={handleLogout}
                                            >
                                                Sign out
                                        </Button>
                                        </Box>
                                    </Grid>

                                    <Grid item>
                                        <Box m={2}>
                                            <Box m={2}>
                                                <Divider />
                                            </Box>
                                            <FormContext {...methods}>
                                                <form onSubmit={methods.handleSubmit(onSubmit)}>
                                                    <FormControlLabel
                                                        control={
                                                            <Switch checked={state.picker} color="primary" onChange={handleChange} name="picker" />
                                                        }
                                                        label="Picker"
                                                    />
                                                    <FormControlLabel
                                                        control={
                                                            <Switch
                                                                checked={state.tabs}
                                                                onChange={handleChange}
                                                                name="tabs"
                                                                color="primary"
                                                            />
                                                        }
                                                        label="Tabs"
                                                    />

            
                                                    <Button
                                                        width={200}
                                                        color="primmary"
                                                        variant="outlined"
                                                        type='submit'
                                                    >
                                                        Submit
                                                </Button>
                                                </form>
                                            </FormContext>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Dialog>
                        </div>
                    </Grid>
                </div>
            </div>
        </Box>
    );
};
