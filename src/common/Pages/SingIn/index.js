import React, { useContext, useEffect } from 'react';
import { Typography, Grid, Box } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import texts from '../../../resources/texts';
import DitoLogo from '../../../resources/img/dito.png';
import Button from '../../Components/Button';
import Input from '../../Components/Input/Input';
import { AuthContext } from '../../../core/context/AuthContext';
// import { TOKEN_OBTAIN } from '../../../config';
import useApiRequest from '../../../core/hooks/useApiRequest';


export default ({ history }) => {
    const { register, errors, setError, clearError, handleSubmit } = useForm();
    const [{ response, error }, { makeRequest }] = useApiRequest(
        'TOKEN_OBTAIN',
        {
            verb: 'post'
        }
    );
    const { setAuthData } = useContext(AuthContext);
    const onSubmit = data => {
        if (true) {
            setAuthData(data);
            return history.replace('/');

        }
        return makeRequest(data);
    };
    useEffect(() => {
        if (response && response.status) {
            const authData = response && response.status ?
                { accessToken: response.data.access, refreshToken: response.data.refresh } : null;
            setAuthData(authData);
            history.replace('/');
        }
    }, [response, history, setAuthData]);

    useEffect(() => {
        if (error) {
            return setError('password', 'validation', `${error}`);
        }
        return clearError('password');
    }, [error, clearError, setError]);

    return (
        <Grid
            container
            direction="column"
            justify="space-around"
            alignItems="center"
        >
            <Grid item>
                <Box mt={12}>
                    <img width={200} src={DitoLogo} alt="logo" />
                </Box>
            </Grid>
            <Grid item>
                <Grid
                    container
                    direction="column"
                    justify="space-around"
                    alignItems="center"
                    spacing={4}
                >
                    <Grid item >
                        <Box mt={12} mb={6} width={325}>
                            <Typography
                                color='textSecondary'
                                align="center"
                                variant="h5"
                                component="h2"
                            >
                                Enter your credentials or use the finger print sensor to login
                            </Typography>
                        </Box>
                    </Grid>
                    <form onSubmit={handleSubmit(onSubmit)} id='sign-in'>
                        <Grid item>
                            <Input
                                errors={errors}
                                inputRef={register({ required: 'This is required field' })}
                                variant='outlined' label='Username' name='username' />
                        </Grid>
                        <Grid item>
                            <Input
                                inputRef={register({ required: 'This is required field' })}
                                errors={errors}
                                variant='outlined' label='Password' type='password' name='password' />
                        </Grid>
                    </form>
                    <Grid item>
                        <Grid
                            container
                            direction="row"
                            justify="center"
                            alignItems="center"
                        >
                            <Grid item>
                                <Typography display='inline'>Forgotten</Typography>
                            </Grid>
                            <Grid item>
                                <Button style={{ textDecoration: 'underline' }} color="secondary">Username</Button>
                            </Grid>
                            <Grid item>
                                <Typography>or</Typography>
                            </Grid>
                            <Grid item>
                                <Button style={{ textDecoration: 'underline' }} color="secondary">Password</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item>
                <Box mt={12}>
                    <Button
                        width={200}
                        color="success"
                        variant="contained"
                        type='submit'
                        form='sign-in'
                    >
                        {texts.BUTTON_CONFIRM}
                    </Button>
                </Box>

            </Grid>
        </Grid>
    );
};
