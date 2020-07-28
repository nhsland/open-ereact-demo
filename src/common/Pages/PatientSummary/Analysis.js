import React from 'react';
import { withStyles } from '@material-ui/styles';
import { Box, Grid, Typography } from '@material-ui/core';
import MuiPaper from '@material-ui/core/Paper';
import uniqid from 'uniqid';
import VitalSigns, { Biohemistry } from './Table';


const SINGLE_PATIENT_ANALYSIS_LABELS = [
  'Vital Signs',
  'Biochemistry Labs- Basic Biochemistry Electrolytes & Renal',
  'Biochemistry - POC Blood Gas Analysis 1',
  'Biochemistry - POC Blood Gas Analysis 2',
  'Biochemistry - Liver Function & Extended Electrolytes 1',
  'Biochemistry - Liver Function & Extended Electrolytes 2',
  'Biochemistry - Biomarkers & Toxscreen',
  'Haematology - Full Blood Count',
  'Haematology - Coagulation',
  'Microbiology',
  'Personalised Risk Prediction',
  'Blood Bank'
];

const SINGLE_PATIENT_ANALYSIS_MAP = section =>
  ({
    'Vital Signs': 'VitalSigns',
    'Biochemistry Labs- Basic Biochemistry Electrolytes & Renal':
      'BiochemistryElectrolytesRenal',
    'Biochemistry - POC Blood Gas Analysis 1': 'BiochemistryBloodGas1',
    'Biochemistry - POC Blood Gas Analysis 2': 'BiochemistryBloodGas2',
    'Biochemistry - Liver Function & Extended Electrolytes 1':
      'BiochemistryLiverAndElectrolytes1',
    'Biochemistry - Liver Function & Extended Electrolytes 2':
      'BiochemistryLiverAndElectrolytes2',
    'Biochemistry - Biomarkers & Toxscreen':
      'BiochemistryBiomarkersAndToxscreen',
    'Haematology - Full Blood Count': 'HaematologyFullBloodCunt',
    'Haematology - Coagulation': 'HaematologyCoagulation',
    Microbiology: 'Microbiology',
    'Personalised Risk Prediction': 'PersonalisedRiskPrediction',
    'Blood Bank': 'BloodBank'
  }[section]);
const WhitePaper = withStyles(() => ({
  root: {
    backgroundColor: '#fff'
  }
}))(MuiPaper);

const Table = ({ section, tableDate }) =>
  section === 'VitalSigns' ? (
    <VitalSigns tableDate={tableDate} />
  ) : (
      <Biohemistry tableDate={tableDate} />
    );

export const carouselAnalysisItems = (analysis = []) => {
  const items = [];
  SINGLE_PATIENT_ANALYSIS_LABELS.map(label => {
    const section = SINGLE_PATIENT_ANALYSIS_MAP(label);
    return analysis.map(card => {
      return items.push({
        title: label,
        content: (
          <WhitePaper elevation={0} key={uniqid()}>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <Grid item>
                <Box mb={2}>
                  {card[section] ? (
                    <Table tableDate={card[section]} section={section} />
                  ) : (
                      <Grid
                        container
                        direction="column"
                        justify="space-between"
                        alignItems="center"
                      >
                        <Grid item>
                          <Box>
                            <Typography variant="subtitle1">
                              No results available
                        </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    )}
                </Box>
              </Grid>
            </Grid>
          </WhitePaper>
        )
      });
    });
  });
  return items;
};
