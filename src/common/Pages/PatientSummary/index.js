import React, { useState, useEffect } from 'react';
import {
  Card,
  Box,
  CardContent,
  IconButton,
  Typography,
  Grid,
  Paper,
  Divider
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import MuiCardHeader from '@material-ui/core/CardHeader';
import { withStyles } from '@material-ui/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import uniqid from 'uniqid';
import { carouselAnalysisItems } from './Analysis';
import useApiRequest from '../../../core/hooks/useApiRequest';
import paths from '../../../core/api/paths';
import CustomCarousel from '../../Components/Carousel';
import PatientRecord from '../../Components/PatientRecord';
import StyledCard from '../../Components/Card';
import Button from '../../Components/Button';
import NewCareEvent from '../../Components/Dialog/NewEventCare';
import Spinner from '../../Components/Spinner';
import MaxAnalisis from './Analysis/MaxAnalisis';
import { minAnalysis } from './Analysis/MinAnalysis';


const PageHeader = withStyles(theme => ({
  root: {
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(0)
  }
}))(MuiCardHeader);

const getSectionTitle = type =>
  ({
    awareneesAndPlanning: 'SITUATION INFORMATION',
    situationAndBackground: 'BACKGROUND INFORMATION',
    analysis: 'ANALYSIS'
  }[type]);

const getTitle = type =>
  ({
    patientSummary: 'Patient Summary',
    situationAndBackground: 'Patient Situation & Background',
    awareneesAndPlanning: 'Patient Situation Awareness and Planning',
    analysis: 'Patient Analysis'
  }[type]);

const getSectionSubtitle = (type, index) => {
  const sections = {
    situationAndBackground: ['Presenting Complaint & Problems', 'Past Medical & Drug History', 'Procedures & Progress'
    ],
    awareneesAndPlanning: ['Independent Living & Escalation Asessments', 'Independent Living & Escalation Asessments', 'Independent Living & Escalation Asessments', 'Independent Living & Escalation Asessments'],
    analysis: ['Vital Signs', 'Biochemistry - Basic Electrolytes & Renal', 'Biochemistry - POC Blood Gas Analysis 1', 'Biochemistry - POC Blood Gas Analysis 2', 'Biochemistry - Liver Function & Extended Electrolytes 1', 'Biochemistry - Liver Function & Extended Electrolytes 2', 'Biochemistry - Biomarkers & Toxscreen',
      'Haematology - Full Blood Count', 'Haematology - Coagulation', 'Microbiology', 'Personalised Risk Prediction', 'Blood Bank'
    ]
  };
  return sections[type][index];
};

const carouselItems = (section = [], sectionName) => {
  const items = [];
  section.map((card, index) => {
    return items.push({
      title: getSectionSubtitle(sectionName, index),
      content: (
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          key={uniqid()}
        >
          {card[Object.keys(card)[0]].map(filed => (
            <Grid item xs={12} key={uniqid()} >

              <Box width={500}>
                <Typography align='center' noWrap variant="subtitle2">
                  <Box
                    component="div"
                    textOverflow="ellipsis"
                    overflow="hidden"

                  >
                    {filed}
                  </Box>
                </Typography>
              </Box>
            </Grid>
          ))
          }
        </Grid >
      )
    });
  });
  return items;
};

const ExpandalbeDetails = ({ items, handleExpand }) => (
  <div style={{ margin: 5, borderRadius: 2, width: '100%', padding: '5px', border: '1px solid black' }}>
    <CustomCarousel autoPlay={false} items={items} handleExpand={handleExpand} />
  </div>
);

const ExpandedDetails = ({ section, sectionName }) => {
  const items = [];
  section.map((card, index) => {
    const title = getSectionSubtitle(sectionName, index);
    const prevTitle = getSectionSubtitle(sectionName, index - 1);
    const newSubsection = prevTitle !== title;
    return items.push(
      <Box {...(newSubsection ? { mb: 4 } : {})}>
        <Grid
          container
          direction="column"
          justify="space-between"
          alignItems="center"
          key={uniqid()}
          style={{ width: '100%' }}
        >

          {index !== 0 && newSubsection && (
            <Box width='100%'>
              <Divider />
            </Box>)}

          {newSubsection && (
            <Grid item>
              <Box p={2}>
                <Typography variant="subtitle2">
                  {title}
                </Typography>
              </Box>
            </Grid>)}

          {card[Object.keys(card)[0]].map(filed => (
            <Grid item key={uniqid()}>
              <Box width='100%'>
                <Typography algin='center' variant="subtitle1">{filed}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  });
  return items;
};

const SeverityStatement = () => (
  <>
    <div style={{ width: '100%' }}>
      <Box display="flex" p={1} bgcolor="background.paper">
        <Box p={1} flexGrow={1} bgcolor="grey.300">
          <Typography variant="h6" component="h6">
            Patient unwell day 2 post op
          </Typography>
        </Box>
        <Box p={1} bgcolor="grey.300">
          <Button
            variant="contained"
            color='secondary' >Edit</Button>
        </Box>
      </Box>
    </div>
  </>
);

export default ({
  history, match
}) => {
  const [expand, setExpand] = useState('patientSummary');
  const [patient, setPatient] = useState({});
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [{ response, loading, error }, { makeRequest }] = useApiRequest(
    `https://my-json-server.typicode.com/adabedi/patient-summary/patients?id=1`,
    // `https://my-json-server.typicode.com/adabedi/patient-summary/patients?id=${match.params.id}`,
    {
      verb: 'get'
    }
  );
  const { names, nhsNo, id, score } = patient;

  const handleRedirect = (path) => history.push(path);
  const newCareEvent = (event) => {
    const path = `/${event}/${id}`;
    history.push(path);
  };

  useEffect(() => {
    makeRequest();
  }, [makeRequest]);
  useEffect(() => {
    const data = response?.data;
    if (data) {
      setPatient(data[0]);
    }
  }, [response]);


  const navigateBack = () => {
    history.goBack();
  };

  if (loading) {
    return <Spinner />;
  }
  if (error) {
    return <p>{error}</p>;
  }
  const additionContent = () => {
    if (patient?.[expand] && expand === 'analysis') {
      return <MaxAnalisis />;
    }
    if (patient?.[expand]) {
      return (
        <StyledCard
          roundedCorners
          content={
            <ExpandedDetails
              section={patient[expand]}
              sectionName={expand}
            />}
        />
      );
    }
    const { situationAndBackground, awareneesAndPlanning, analysis } = patient;
    // console.log(patient)
    return (
      <>
        <SeverityStatement />
        <ExpandalbeDetails
          items={carouselItems(
            situationAndBackground,
            'situationAndBackground'
          )}
          handleExpand={() => {
            setExpand('situationAndBackground');
          }}
        />
        <ExpandalbeDetails
          items={carouselItems(
            awareneesAndPlanning,
            'awareneesAndPlanning'
          )}
          handleExpand={() => {
            setExpand('awareneesAndPlanning');
          }}
        />
        {analysis && <ExpandalbeDetails
          items={minAnalysis(analysis, 'analysis')}
          handleExpand={() => {
            setExpand('analysis')
            // setExpand('analysis');
          }}
        />}
        <div style={{ margin: 5, borderRadius: 2, width: '100%', padding: '5px', border: '1px solid black' }}>
          <Box m={4}>
            <Grid
              container
              direction='column'
              justify='center'
            >
              <Grid item>
                <Typography align='center'>Recommendations AND Actions list</Typography>

              </Grid>
              <Grid item>
                <Button
                  color="success"
                  variant="contained"
                  onClick={handleOpen}
                >
                  Create Patient Care Event
             </Button>

              </Grid>
            </Grid>

          </Box>
        </div>
        <NewCareEvent open={open} handleClose={handleClose} onRedirect={newCareEvent} title={names} />
      </>
    );
  };

  return (
    <>
      <Card elevation={0}>
        <PageHeader
          title={
            <Grid
              container
              direction="row"
              alignItems="center"
              style={{ marginRight: '5px' }}
            >
              {patient?.[expand] ? (
                <IconButton onClick={() => setExpand('patientSummary')}>
                  <ArrowBackIcon />
                </IconButton>
              ) : (
                  <IconButton onClick={navigateBack}>
                    <CloseIcon />
                  </IconButton>
                )}
              <Typography variant="h5" component="h5">
                {getTitle(expand)}
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
                <Grid
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                >
                  <Grid item xs={12}>

                    {additionContent()}
                  </Grid>
                </Grid>
              </>
            }
          />
        </CardContent>
      </Card>
    </>
  );
};
