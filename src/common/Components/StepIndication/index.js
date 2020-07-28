/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Grid, Box } from '@material-ui/core';
import uniqid from 'uniqid';

export default ({ steps, active, letterSpacing = 5 }) => {
    return (
        <Box m={2}>
            <Grid container direction='row' justify="center" alignItems="center">
                {steps.map((step, index) => {
                    return (
                        <Grid item key={uniqid()}>
                            <Box letterSpacing={letterSpacing} {...(active === step.id ? { fontWeight: 'fontWeightBold' } : {})}>
                                {index !== 0 && <span>&mdash;</span>}
                                {step.value}
                            </Box>
                        </Grid>
                    );
                })}
            </Grid>
        </Box >
    );
};