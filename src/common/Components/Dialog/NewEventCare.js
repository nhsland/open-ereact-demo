import React from 'react';
import {
    Box,
    Grid,
    Typography,
    DialogContent,
    DialogTitle,
    Dialog
} from '@material-ui/core';

import Button from "../Button";

const NewCareEvent = ({ open, title, handleClose, onRedirect }) => {
    return (
        <Dialog
            open={open}
            keepMounted
            onClose={handleClose}
        >
            <DialogTitle>
                <Grid
                    container
                    direction='column'
                    justify='center'
                    alignContent='center'
                >
                    <Grid item>
                        <Typography align='center'>New Care Event for</Typography>
                    </Grid>
                    <Grid item>
                        <Typography align='center'>{title}</Typography>
                    </Grid>
                </Grid>
            </DialogTitle>

            <DialogContent>
                <Box pb={2}>
                    <Grid
                        container
                        direction="column"
                        justify="space-around"
                        alignItems="center"
                        spacing={2}
                    >
                        <Grid item>
                            <Button color='primmary' disabled onClick={onRedirect} variant='outlined'>Assesment</Button>
                        </Grid>
                        <Grid item>
                            <Button color='primmary' disabled onClick={onRedirect} variant='outlined'>Intervention</Button>
                        </Grid>
                        <Grid item>
                            <Button color='primmary' onClick={() => onRedirect('monitoring')} variant='outlined'>Monitoring</Button>
                        </Grid>
                    </Grid>
                </Box>

            </DialogContent>
        </Dialog>
    );
};
export default NewCareEvent;