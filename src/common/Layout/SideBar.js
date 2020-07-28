import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Drawer, Grid, Box, Typography, Divider, IconButton } from '@material-ui/core';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Button from "../Components/Button";
import { AuthContext } from '../../core/context/AuthContext';


const useStyles = makeStyles({
    list: {
        width: 250
    },
    root: {
        width: '100%'
    }
});

export default ({ open, toggleDrawer }) => {
    const { setAuthData } = useContext(AuthContext);
    const handleLogout = () => setAuthData(null);

    const classes = useStyles();
    const content = () => (
        <div
            className={classes.list}
            role="presentation"
            onClick={() => toggleDrawer(false)}
            onKeyDown={() => toggleDrawer(false)}
        >
            <Grid
                className={classes.root}
                container
                direction="column"
                justify="center"
                alignItems="center"
                spacing={2}>
                <Grid item>
                    <Box mt={2}>
                        <Typography align='center'>Jackie, Smith</Typography>
                        <Typography align='center'>123 456</Typography>
                        <Typography align='center'>Nurse</Typography>
                    </Box>
                </Grid>

                <Grid item>
                    <Box mt={2}>
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

            </Grid>
            <Grid container
                direction="row"
                justify="flex-start"
                alignItems="flex-start">
                <Divider />
                <Grid item>
                    <IconButton disabled>
                        <StarBorderIcon /> <Typography>Settings</Typography>
                    </IconButton>
                </Grid>
            </Grid>
        </div>
    );

    return (
        <Drawer anchor="left" open={open} onClose={() => toggleDrawer(false)}>
            {content('left')}
        </Drawer>
    );
};
