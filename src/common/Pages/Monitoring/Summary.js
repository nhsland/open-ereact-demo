import React from 'react';
import { Grid, Box, Typography } from '@material-ui/core';
import uniqid from 'uniqid';
import ScoreIcon from '../../Components/ScoreIcon';
import Button from '../../Components/Button';

// const mapTotalScoreColor = score =>
//   ({
//     "Hight": "#F40013",
//     "Risk": "#FBC384",
//     "Medium": "#fbf184",
//     "Small": "#c2c1b6",
//     "No Risk": "#2E7D32"
//   }[score]);

const mapTotalScoreBackground = score => {
  if (score >= 7) {
    return "#F40013";
  }
  if (score < 0) {
    return "#fbf184";
  }
  return ({
    "6": "#FBC384",
    "5": "#FBC384",
    "4": "#2E7D32",
    "3": "#2E7D32",
    "2": "#2E7D32",
    "1": "#2E7D32",
    "0": "#2E7D32"
  }[score]);
};

const mapTotalScoreColor = score => {
  if ((score >= 0 && score <= 4) || (score >= 7)) {
    return '#fff';
  }
  return '#000';
};

const Parametr = ({ parametr, value, score }) => (
  <div style={{ width: '100%' }}>
    <Box
      display="flex"
      // flexWrap="nowrap"
      alignItems="center"
      p={0}
      pl={1}
      pr={1}
    >
      <Box width={2 / 5} mr={1}>
        {parametr}
      </Box>
      <Box width={2 / 5} mr={1}>
        {value}
      </Box>
      <Box width={1 / 5}>
        <ScoreIcon score={score} isParametr />
      </Box>
    </Box>
  </div>
);

const Section = ({ items, section, handleEdit }) => {
  const sectionIsEmpty = () => items.filter(item => item.score.ammount >= 1).length < 1;
  if (sectionIsEmpty()) {
    return null;
  }
  return (
    <>
      <Box pb={1} pt={1}>
        <Box
          style={{
            backgroundColor: '#515F9C',
            color: '#fff',
            maxWidth: '50px'
          }}
          display="flex"
          justifyContent="center"
        >
          {section}
        </Box>
      </Box>

      {items.map(parametr => {
        if (parametr.score.ammount >= 1) {
          return <Box pb={1} key={uniqid()}>
            <Box
              display="flex"
              style={{
                border: '0.0469em solid #757575',
                borderRadius: '4px',
                alignItems: 'center'
              }}
            >
              <Parametr
                parametr={parametr.label}
                value={`${parametr.value} ${parametr.units ? parametr.units : ''}`}
                score={parametr.score}
              />
              <Box ml={2}>
                <Button
                  variant="contained"
                  onClick={(e) => handleEdit(e, parametr.name)}
                  color='secondary'
                >
                  Edit
          </Button>
              </Box>
            </Box>
          </Box>;
        }
      }
      )}
    </>
  );
};

const TotalNEWSScore = ({ score, clinicalRisk }) => {
  const absoluteScore = Math.abs(score);
  return (
    <div style={{ width: '100%' }}>
      <Box
        display="flex"
        flexWrap="nowrap"
        alignItems="center"
        style={{
          backgroundColor: mapTotalScoreBackground(score),
          color: mapTotalScoreColor(score)
        }}

      >
        <Box width={3 / 4}>
          <Box
            width="100%"
            display="flex"
            fontWeight="fontWeightBold"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Box>
              Total NEWS Score : {absoluteScore}
            </Box>
            <Box>
              Clinical Risk: {clinicalRisk}
            </Box>
          </Box>
        </Box>
        <Box width={1 / 4} pr={1}>
          <div style={{ backgroundColor: '#fff', color: '#000' }}>
            <ScoreIcon score={{ ammount: score, description: 'same' }} />
          </div>
        </Box>

      </Box>
    </div>
  );
};

const Summary = ({ name, nhsNo, summaryData, handleEdit }) => {
  return (
    <div style={{ border: '1px solid black', borderRadius: 2 }}>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="flex-start"
        style={{ backgroundColor: 'lightgrey' }}
      >

        <Grid item>
          <Box m={1}>
            <Typography align="left" component='h6'>
              <Box fontWeight={500}>
                {name}
              </Box>
            </Typography>
          </Box>
          <Box width={300} m={1}>
            <Typography align="left" component='h6'>
              <Box fontWeight={500}>
                {nhsNo}
              </Box>
            </Typography>
          </Box>
        </Grid>

      </Grid>
      <Box m={2}>
        <Section items={summaryData.ab} section="A + B" handleEdit={handleEdit} />
        <Section items={summaryData.c} section="C" handleEdit={handleEdit} />
        <Section items={summaryData.de} section="D + E" handleEdit={handleEdit} />
        <TotalNEWSScore
          score={summaryData.score}
          clinicalRisk={summaryData.clinicalRisk}
        />
      </Box>
    </div>
  );
};
export default Summary;
