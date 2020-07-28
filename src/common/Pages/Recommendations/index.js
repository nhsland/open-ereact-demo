import React, { useState, useEffect } from 'react';
import {
    Card,
    Box,
    CardContent,
    IconButton,
    Typography,
    Grid,
    Divider
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import MuiCardHeader from '@material-ui/core/CardHeader';
import { withStyles, makeStyles } from '@material-ui/styles';


import useApiRequest from '../../../core/hooks/useApiRequest';
import paths from '../../../core/api/paths';
import PatientRecord from '../../Components/PatientRecord';
import Button from '../../Components/Button';
import Sepsis from "../../../resources/img/sepsis.png";
import Text from '../../Components/Text';
import Spinner from '../../Components/Spinner';
import StyledCard from '../../Components/Card';

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
        width: '100%'
    }
}));

const PageHeader = withStyles(theme => ({
    root: {
        paddingTop: theme.spacing(0),
        paddingBottom: theme.spacing(0)
    }
}))(MuiCardHeader);

export default ({
    history, match
}) => {
    const classes = useStyles();
    const [patient, setPatient] = useState({});
    const [{ response, loading, error }, { makeRequest }] = useApiRequest(
        `${paths.pateints}?id=${match.params.id}`,
        {
            verb: 'get'
        }
    );
    useEffect(() => {
        makeRequest();
    }, [makeRequest]);
    useEffect(() => {
        const data = response?.data;
        if (data) {
            setPatient(data[0]);
        }
    }, [response]);
    const handleRedirect = (path) => history.push(path);

    if (loading) {
        return <Spinner />;
    }
    if (error) {
        return <p>{error}</p>;
    }
    const { score, names, nhsNo, id, sepsisScreening } = patient;


    const handleRedirectSepsis = () => {
        history.push(`/sepsis-screening/${id}`);
    };
  

    return (
        <Card elevation={0}>
            <PageHeader
                title={
                    <Grid
                        container
                        direction="row"
                        alignItems="center"
                        style={{ marginRight: '5px' }}
                    >
                        <IconButton onClick={() => history.push('/')}>
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h5" component="h5">
                            Patient Recommendations
                        </Typography>
                    </Grid>
                }
            />

            <CardContent>
                <StyledCard
                    title={names}
                    subheader={nhsNo}
                    score={score}
                    action
                    patientId={id}
                    onRedirect={handleRedirect}
                    content={
                        <>
                            <PatientRecord expandable record={patient} />

                            <Divider />

                            <div className={classes.root}>
                                <Grid
                                    container
                                    direction="column"
                                    justify="center"
                                    alignItems="center"
                                >
                                    <Grid item xs={12}>
                                        <Typography align="center" >Sepsis Screening & Patient Diagnosis</Typography>
                                    </Grid>
                                    <div className={classes.root}>
                                        <Grid item xs={12}>
                                            <Box display="flex" p={1} bgcolor="background.paper" flexWrap='wrpa' width='100%'>
                                                <Box p={2} flexGrow={2} bgcolor="grey.300">
                                                    {sepsisScreening ? (
                                                        <>
                                                            <Typography>Last sepsis screening</Typography>
                                                            <Text label='Time' type='date'>{sepsisScreening.date}</Text>
                                                            <Text label='Date' type='time'>{sepsisScreening.date}</Text>
                                                            <Text label='Status' type='standard'>{sepsisScreening.status}</Text>
                                                        </>
                                                    ) : (
                                                            <Typography variant="h6" component="h6">
                                                                No prior screening
                                                                information available
                                        </Typography>
                                                        )}
                                                </Box>
                                                <Box p={1} bgcolor="grey.300">
                                                    <Grid
                                                        container
                                                        direction="column"
                                                        justify="center"
                                                        alignItems="center"
                                                    >
                                                        <Grid item>
                                                            <img src={Sepsis} width={100} alt='sepsis-logo' />
                                                        </Grid>
                                                        <Grid item>
                                                            <Button variant="contained" color='success' onClick={handleRedirectSepsis}>
                                                                {sepsisScreening ? 'Screen again' : 'New screening'}
                                                            </Button>
                                                        </Grid>
                                                    </Grid>
                                                </Box>
                                            </Box>
                                        </Grid>
                                    </div>

                                    
                                </Grid>

                            </div>
                        </>
                    }
                />

            </CardContent>
        </Card >
    );
};
