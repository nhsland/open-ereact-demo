import React, { useState, useEffect, useContext, useRef } from 'react';
import { useForm, FormContext } from "react-hook-form";
import {
    Grid,
    Card,
    CardHeader,
    Divider,
    Box,
    CardContent,
    Typography,
    IconButton
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { makeStyles } from '@material-ui/styles';
import EditIcon from '@material-ui/icons/Edit';
import paths from '../../../core/api/paths';
import useApiRequest from '../../../core/hooks/useApiRequest';
import fakeData from './fakeData';
import BottomBar from '../../Components/BottomBar';
import Dialog from '../../Components/Dialog';
import Button from '../../Components/Button';
import Checkboxes from '../../Components/Checkboxes';
import MonitoringForm from './MonitoringForm/index';
import MonitoringForm2 from './MonitoringForm/index2';
import Summary from './Summary';
import { calculateNews2Score, getSummaryData } from './news2Score';
import { PatientContext } from '../../../core/context/PatientContext';
import { SettingsContext } from '../../../core/context/SettingsContext';
import Spinner from '../../Components/Spinner';

const SanitizedGrid = ({ ...props }) => {
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <Box mb={5}><Grid style={{ minWidth: '100%' }} {...props} /></Box>;
};


const CHECKBOXES_EDIT_MONITORING_FORM = [
    {
        id: 'news',
        label: 'NEWS Observation'
    },
    {
        id: 'bloodGlucose',
        label: 'Blood Glucose Observation'
    },
    {
        id: 'painScore',
        label: 'Pain Score'
    }
];

const useStyles = makeStyles({
    root: {
        marginTop: '60px'
    },
    fixed: {
        width: '100%',
        backgroundColor: '#fff',
        height: '60px',
        zIndex: '500',
        background: 'white',
        position: 'fixed',
        top: 0
    }
});

const Monitoring = ({ history, match }) => {
    const classes = useStyles();
    // const [isSticky, setSticky] = useState(false);
    const ref = useRef(null);
    const methods = useForm();
    const { handleSubmit, errors, setValue } = methods;
    const { patient, setPatientData } = useContext(PatientContext);
    const { settings } = useContext(SettingsContext);

    const [{ response, loading, error }, { makeRequest }] = useApiRequest(
        `${paths.pateints}?id=${match.params.id}`,

        {
            verb: 'get'
        }
    );
    const [openSummary, setOpenSummary] = useState(false);
    const [parametrToEdit, setParametrToEdit] = useState('');
    const [openEdit, setOpenEdit] = useState(false);
    // const [checked, setChecked] = useState(getCheckboxes(CHECKBOXES_EDIT_MONITORING_FORM));
    const [checked, setChecked] = useState(
        { news: true, bloodGlucose: false, painScore: false }
    );

    const [summaryData, setSummaryData] = useState({});
    useEffect(() => {
        makeRequest();
    }, [makeRequest]);

    useEffect(() => {
        const data = response?.data;
        if (data) {
            setPatientData(data[0]);
        }
    }, [response, setPatientData]);

    const handleOpenSummary = () => {
        setOpenSummary(true);
        setParametrToEdit(null);
    };
    const handleCloseSummary = () => setOpenSummary(false);
    const handleOpenEdit = () => setOpenEdit(true);
    const handleCloseEdit = () => setOpenEdit(false);

    const handleConfirm = () => {
        // make post
        handleCloseSummary();
        history.push(`/recommendations/${patient.id}`);
    };

    const handleChange = (event, name) => {
        setChecked({ ...checked, [name]: event.target.checked });
    };

    const editParametr = (e, name) => {
        handleCloseSummary();
        setParametrToEdit(name);
        setPatientData(patient);
    };

    const onSubmit = result => {
        const mergedFormData = { ...patient, ...result };
        // insted request to ss
        setSummaryData(getSummaryData(calculateNews2Score(mergedFormData), mergedFormData));
        setPatientData(mergedFormData);
        handleOpenSummary();
    };

    const onCancelEditConsciousness = () => {
        const prevValue = patient.consciousness.value;
        setValue("consciousness.value", prevValue);
    };

    if (loading) {
        return <Spinner />;
    }
    if (error) {
        return <p>{error}</p>;
    }
    return (
        <>
            <SanitizedGrid container>
                <Grid item xs={12}>
                    <Card elevation={0}>
                        <div className={classes.fixed} ref={ref}>
                            <CardHeader
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
                                            Patient Monitoring                                        </Typography>
                                    </Grid>
                                }
                                // title="Patient Monitoring"
                                action={
                                    <Dialog
                                        openAction={
                                            <IconButton onClick={handleOpenEdit}>
                                                <span style={{ color: '#515F9C' }}>
                                                    <EditIcon /> Edit
                                            </span>
                                            </IconButton>
                                        }
                                        open={openEdit}
                                        handleClose={handleCloseEdit}
                                        handleCancel={() => setOpenEdit(false)}
                                        // handleConfirm={() => handleEditForm()}
                                        title="Choose tasks - tick all that apply"
                                        bottomActions={
                                            <Grid
                                                container
                                                direction="row"
                                                justify="flex-end"
                                                alignItems="flex-end"
                                                spacing={2}
                                            >
                                                <Grid item>
                                                    <Button onClick={handleCloseEdit} color="secondary">
                                                        Cancel
                                            </Button>
                                                </Grid>
                                                <Grid item>
                                                    <Button
                                                        color="success"
                                                        variant="contained"
                                                        disabled
                                                        onClick={handleCloseEdit}>
                                                        Confirm
                                            </Button>
                                                </Grid>
                                            </Grid>
                                        }
                                    >
                                        <Checkboxes
                                            options={CHECKBOXES_EDIT_MONITORING_FORM}
                                            checked={checked}
                                            handleChange={handleChange}
                                        />
                                    </Dialog>
                                }
                            />
                        </div>

                        <CardContent className={classes.root}>
                            <>
                                <Box width='100%'>
                                    <Divider />
                                </Box>
                                {patient && (
                                    <FormContext {...methods}>
                                        <form id="monitoring-form" onSubmit={handleSubmit(onSubmit)}>
                                            {settings.picker ? (
                                                <MonitoringForm
                                                    onSubmit={handleSubmit(onSubmit)}
                                                    onCancelEditConsciousness={onCancelEditConsciousness}
                                                    patient={patient}
                                                    fields={fakeData}
                                                    edit={parametrToEdit}
                                                    settings={settings}
                                                />
                                            ) : (
                                                    <MonitoringForm2
                                                        patient={patient}
                                                        fields={fakeData}
                                                        edit={parametrToEdit}
                                                        onCancelEditConsciousness={onCancelEditConsciousness}
                                                        onSubmit={handleSubmit(onSubmit)}
                                                        settings={settings}

                                                    />
                                                )}
                                        </form>
                                    </FormContext>
                                )}
                            </>
                        </CardContent>
                    </Card>
                </Grid>
            </SanitizedGrid>

            <BottomBar>
                <Box m={1}>
                    <Button
                        width={200}
                        color="success"
                        variant="contained"
                        type='submit'
                        form='monitoring-form'
                        disabled={Boolean(Object.keys(errors).length > 0)}
                    >
                        Finish observation
                        </Button>
                </Box>
            </BottomBar>

            <Dialog
                open={openSummary}
                handleClose={handleCloseSummary}
                title="PATIENT MONITORING SUMMARY"
                bottomActions={
                    <Grid
                        container
                        direction="row"
                        justify="flex-end"
                        alignItems="flex-end"
                        spacing={2}
                    >
                        <Grid item>
                            <Button onClick={handleCloseSummary} color="secondary">
                                Cancel
                        </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                color="success"
                                variant="contained"
                                onClick={handleConfirm}>
                                Confirm
                        </Button>
                        </Grid>
                    </Grid>
                }
            >
                <Box width={500}>
                    {patient && <Summary handleEdit={editParametr} summaryData={summaryData} name={patient.names} nhsNo={patient.nhsNo} />}
                </Box>
            </Dialog>
        </>
    );
};
export default Monitoring;
