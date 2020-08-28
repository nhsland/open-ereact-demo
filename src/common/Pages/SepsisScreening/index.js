import React, { useState, useEffect } from 'react';
import {
  Card,
  Box,
  CardContent,
  IconButton,
  Typography,
  Grid,
  Divider,
  CardHeader,
  CardActions,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import MuiCardHeader from '@material-ui/core/CardHeader';
import { withStyles } from '@material-ui/styles';
import MuiCard from '@material-ui/core/Card';

import Step1 from './Step1';

import useApiRequest from '../../../core/hooks/useApiRequest';
import paths from '../../../core/api/paths';
import PatientRecord from '../../Components/PatientRecord';
import Button from '../../Components/Button';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import EndDialog from './EndDialog';
import StepIndication from '../../Components/StepIndication';
import Spinner from '../../Components/Spinner';
import StyledCard from '../../Components/Card';

const PageHeader = withStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(0),
  },
}))(MuiCardHeader);

export default ({ history }) => {
  const [patient, setPatient] = useState({});
  const [step1, setStep1] = useState();
  const [step2, setStep2] = useState();
  const [step3, setStep3] = useState();
  const [step, setStep] = useState('step1');
  const [valid, setValid] = useState(false);
  const [screeningResult, setScreeningResult] = useState();

  // const [step4, setStep4] = useState();
  const [openSummary, setOpenSummary] = useState(false);
  const [flag, setFlag] = useState('');

  const [{ response, loading, error }, { makeRequest }] = useApiRequest(
    `${paths.pateints}?id=1`,
    {
      verb: 'get',
    }
  );

  const [
    { loading: postLoading, error: postError },
    { makeRequest: makePostRequest },
  ] = useApiRequest(`${paths.pateints}?id=1`, {
    verb: 'post',
  });

  useEffect(() => {
    makeRequest();
  }, [makeRequest]);

  useEffect(() => {
    const data = response?.data;
    if (data) {
      setPatient(data[0]);
    }
  }, [response]);
  const timeoutRef = React.useRef();
  const [counter, setCounter] = useState(0);

  const setDialogTimeout = () => {
    timeoutRef.current = setTimeout(() => {
      setCounter(counter + 1);
      setOpenSummary(false);
      history.replace(`/recommendations/${patient.id}`);
    }, 50000);
    return () => {
      clearTimeout(timeoutRef.current);
    };
  };

  useEffect(() => {
    if (counter) {
      setDialogTimeout();
    }
  });

  const handleClose = () => {
    setCounter(0);
    clearTimeout(timeoutRef.current);
    setOpenSummary(false);
    history.replace(`/recommendations/${patient.id}`);
  };

  const onSubmit = (data, diagnose) => {
    makePostRequest(data);
    setFlag(diagnose);
    setOpenSummary(true);
    return setCounter(counter + 1);
  };

  const setStepContext = (nextStep, stepContext) => {
    setScreeningResult({ ...screeningResult, ...stepContext.parsed });
    if (nextStep === 'step2') {
      setStep1(stepContext);
      setStep('step2');
    }
    if (nextStep === 'step3') {
      setStep2(stepContext);
      setStep('step3');
    }
    if (nextStep === 'step4') {
      setStep3(stepContext);
      setStep('step4');
    }
  };

  const handleBack = () => {
    setValid(true);
    if (step === 'step2') {
      setStep('step1');
    }
    if (step === 'step3') {
      setStep('step2');
    }
    if (step === 'step4') {
      setStep('step3');
    }
  };

  if (loading) {
    return <Spinner />;
  }
  if (error) {
    return <p>{error}</p>;
  }
  const { score, names, nhsNo, id } = patient;

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
              Sepsis Screening
            </Typography>
          </Grid>
        }
      />
      <EndDialog
        onClose={handleClose}
        open={openSummary}
        setOpen={setOpenSummary}
        patient={names}
        loading={openSummary ? postLoading : false}
        error={postError}
        flag={flag}
      />
      <CardContent>
        <StyledCard
          title={names}
          subheader={nhsNo}
          score={score}
          patientId={id}
          content={
            <>
              <Box mb={2}>
                <PatientRecord record={patient} />
              </Box>
              <Divider />
              <StepIndication
                steps={[
                  { id: 'step1', value: 'Suspicion' },
                  { id: 'step2', value: 'Source' },
                  { id: 'step3', value: 'Red Flag' },
                  { id: 'step4', value: 'Amber Flag' },
                ]}
                active={step}
                letterSpacing={1}
              />
              {
                {
                  step1: (
                    <Step1
                      defaultValues={step1?.data}
                      setValid={setValid}
                      valid={valid}
                      setStepContext={setStepContext}
                      onSubmit={onSubmit}
                    />
                  ),
                  step2: (
                    <Step2
                      defaultValues={step2?.data}
                      setValid={setValid}
                      step2={step2}
                      step={step}
                      setStepContext={setStepContext}
                      onSubmit={onSubmit}
                      screeningResult={screeningResult}
                    />
                  ),
                  step3: (
                    <Step3
                      defaultValues={step3?.data}
                      setValid={setValid}
                      step={step}
                      setStepContext={setStepContext}
                      onSubmit={onSubmit}
                      screeningResult={screeningResult}
                    />
                  ),
                  step4: (
                    <Step4
                      setValid={setValid}
                      step={step}
                      onSubmit={onSubmit}
                      screeningResult={screeningResult}
                    />
                  ),
                }[step]
              }

              <Box m={1}>
                <Grid
                  container
                  direction="row"
                  justify="space-around"
                  alignItems="center"
                  spacing={2}
                >
                  <Grid item>
                    <Button
                      width={200}
                      color="success"
                      variant="contained"
                      onClick={handleBack}
                      disabled={step === 'step1'}
                    >
                      Previous
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      width={200}
                      color="success"
                      variant="contained"
                      type="submit"
                      form={`sepsis-form-${step}`}
                      disabled={!valid}
                    >
                      Next
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </>
          }
        />
      </CardContent>
    </Card>
  );
};
