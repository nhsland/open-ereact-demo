import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import MuiTableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import uniqid from 'uniqid';

const useStyles = makeStyles({
  table: {
    width: 500,
  },
  root: {
    padding: 0,
  },
});
const TableCell = withStyles(theme => ({
  root: {
    padding: theme.spacing(0),
    fontSize: 10,
    lineHeight: 1.5,
  },
}))(MuiTableCell);

const VitalSigns = ({ tableDate }) => {
  // console.log('TABLE DAT A =>  ', tableDate.respirationRate);
  const classes = useStyles();
  // const sections = Object.keys(tableDate.tableDate) || [];
  const parametrs = [];
  const values = [];

  // sections.map(section =>
  //   tableDate.tableDate[section].map((parametr, index) =>
  //     parametrs.push(
  //       <TableCell
  //         key={uniqid()}
  //         style={{
  //           borderRight: `${
  //             tableDate.tableDate[section].length === index + 1
  //               ? '2px solid #fff'
  //               : 'none'
  //           }`,
  //         }}
  //         align="center"
  //       >
  //         {parametr.parametr}
  //       </TableCell>,
  //     ),
  //   ),
  // );

  // sections.map(section =>
  //   tableDate.tableDate[section].map((parametr, index) =>
  //     values.push(
  //       <TableCell
  //         key={uniqid()}
  //         style={{
  //           border: '2px solid #E0E0E0',
  //           backgroundColor: `${parametr.color}`,
  //           color: `${parametr.color === '#2E7D32' ? '#fff' : '#000'}`,
  //           borderRight: `${
  //             tableDate.tableDate[section].length === index + 1
  //               ? '2px solid #fff'
  //               : 'none'
  //           }`,
  //           width: '100px',
  //         }}
  //         align="center"
  //       >
  //         <Grid
  //           container
  //           direction="column"
  //           justify="center"
  //           alignItems="center"
  //         >
  //           <Grid item>
  //             <Box fontSize={12} fontWeight="fontWeightBold" m={1}>
  //               {parametr.value}
  //             </Box>
  //           </Grid>
  //           <Grid item>{parametr.units || '.'}</Grid>
  //         </Grid>
  //       </TableCell>,
  //     ),
  //   ),
  // );

  const mapCirleParametrColor = score => {
    if (score === 0) {
      return '#3A7F3A';
    }
    return {
      '3': '#F40013',
      '2': '#FBC384',
      '1': '#fbf184',
    }[score];
  };

  const mapScoreParametrColor = score =>
    score === 3 || score === 0 ? '#fff' : '#000';

  return (
    <TableContainer style={{ backgroundColor: '#E0E0E0' }} component={Paper}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            {/* {sections.map(section => ( */}
            <TableCell
              key={uniqid()}
              className={classes.root}
              style={{
                backgroundColor: '#515F9C',
                color: '#fff',
                height: '20px',
                borderRight: '2px solid #fff',
              }}
              align="center"
              colSpan={3}
            >
              <Box fontSize={12} fontWeight="fontWeightBold">
                {'A + B'}
              </Box>
            </TableCell>
            <TableCell
              key={uniqid()}
              className={classes.root}
              style={{
                backgroundColor: '#515F9C',
                color: '#fff',
                height: '20px',
                borderRight: '2px solid #fff',
              }}
              align="center"
              colSpan={2}
            >
              <Box fontSize={12} fontWeight="fontWeightBold">
                {'C'}
              </Box>
            </TableCell>
            <TableCell
              key={uniqid()}
              className={classes.root}
              style={{
                backgroundColor: '#515F9C',
                color: '#fff',
                height: '20px',
                borderRight: '2px solid #fff',
              }}
              align="center"
              colSpan={3}
            >
              <Box fontSize={12} fontWeight="fontWeightBold">
                {'D + E'}
              </Box>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell key={uniqid()} align="center">
              {'Respiration Rate'}
            </TableCell>
            <TableCell key={uniqid()} align="center">
              {'Saturation	'}
            </TableCell>
            <TableCell
              key={uniqid()}
              style={{
                borderRight: '2px solid #fff',
              }}
              align="center"
            >
              {'Flow Rate	'}
            </TableCell>
            <TableCell key={uniqid()} align="center">
              {'Blood Pressure	'}
            </TableCell>
            <TableCell
              key={uniqid()}
              style={{
                borderRight: '2px solid #fff',
              }}
              align="center"
            >
              {'Puls Rate'}
            </TableCell>
            <TableCell key={uniqid()} align="center">
              {'Consciousness'}
            </TableCell>

            <TableCell key={uniqid()} align="center">
              {'Temperature'}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell
              key={uniqid()}
              style={{
                border: '2px solid #E0E0E0',
                backgroundColor: `${mapCirleParametrColor(
                  tableDate.respirationRate.score,
                )}`,
                color: `${mapScoreParametrColor(
                  tableDate.respirationRate.score,
                )}`,
                // backgroundColor: `${parametr.color}`,
                // color: `${parametr.color === '#2E7D32' ? '#fff' : '#000'}`,

                width: '100px',
              }}
              align="center"
            >
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <Grid item>
                  <Box fontSize={12} fontWeight="fontWeightBold" m={1}>
                    {tableDate.respirationRate.value}
                  </Box>
                </Grid>
                <Grid item>{tableDate.respirationRate.units || '.'}</Grid>
              </Grid>
            </TableCell>

            <TableCell
              key={uniqid()}
              style={{
                border: '2px solid #E0E0E0',
                width: '100px',
                backgroundColor: `${mapCirleParametrColor(
                  tableDate.sats.score,
                )}`,
                color: `${mapScoreParametrColor(tableDate.sats.score)}`,
              }}
              align="center"
            >
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <Grid item>
                  <Box fontSize={12} fontWeight="fontWeightBold" m={1}>
                    {tableDate.sats.value}
                  </Box>
                </Grid>
                <Grid item>{tableDate.sats.units || '.'}</Grid>
              </Grid>
            </TableCell>

            <TableCell
              key={uniqid()}
              style={{
                border: '2px solid #E0E0E0',
                borderRight: '2px solid #fff',
                backgroundColor: `${mapCirleParametrColor(
                  tableDate.flowRate.score,
                )}`,
                color: `${mapScoreParametrColor(tableDate.flowRate.score)}`,
                // backgroundColor: `${parametr.color}`,
                // color: `${parametr.color === '#2E7D32' ? '#fff' : '#000'}`,

                width: '100px',
              }}
              align="center"
            >
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <Grid item>
                  <Box fontSize={12} fontWeight="fontWeightBold" m={1}>
                    {tableDate.flowRate.value}
                  </Box>
                </Grid>
                <Grid item>{tableDate.flowRate.units || '.'}</Grid>
              </Grid>
            </TableCell>

            <TableCell
              key={uniqid()}
              style={{
                border: '2px solid #E0E0E0',
                backgroundColor: `${mapCirleParametrColor(
                  tableDate.systolicBP.score,
                )}`,
                color: `${mapScoreParametrColor(tableDate.systolicBP.score)}`,
                // color: `${parametr.color === '#2E7D32' ? '#fff' : '#000'}`,

                width: '100px',
              }}
              align="center"
            >
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <Grid item>
                  <Box fontSize={12} fontWeight="fontWeightBold" m={1}>
                    {`${tableDate.systolicBP.value}/${tableDate.diastolicBP.value}`}
                  </Box>
                </Grid>
                <Grid item>{tableDate.sats.units || '.'}</Grid>
              </Grid>
            </TableCell>
            <TableCell
              key={uniqid()}
              style={{
                border: '2px solid #E0E0E0',
                borderRight: '2px solid #fff',
                backgroundColor: `${mapCirleParametrColor(
                  tableDate.heartRate.score,
                )}`,
                color: `${mapScoreParametrColor(tableDate.heartRate.score)}`,

                width: '100px',
              }}
              align="center"
            >
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <Grid item>
                  <Box fontSize={12} fontWeight="fontWeightBold" m={1}>
                    {tableDate.heartRate.value}
                  </Box>
                </Grid>
                <Grid item>{tableDate.heartRate.units || '.'}</Grid>
              </Grid>
            </TableCell>

            <TableCell
              key={uniqid()}
              style={{
                border: '2px solid #E0E0E0',
                backgroundColor: `${mapCirleParametrColor(
                  tableDate.consciousness.score,
                )}`,
                color: `${mapScoreParametrColor(
                  tableDate.consciousness.score,
                )}`,

                width: '100px',
              }}
              align="center"
            >
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <Grid item>
                  <Box fontSize={12} fontWeight="fontWeightBold" m={1}>
                    {tableDate.consciousness.value}
                  </Box>
                </Grid>
                <Grid item>{tableDate.consciousness.units || '.'}</Grid>
              </Grid>
            </TableCell>

            <TableCell
              key={uniqid()}
              style={{
                border: '2px solid #E0E0E0',
                backgroundColor: `${mapCirleParametrColor(
                  tableDate.temperature.score,
                )}`,
                color: `${mapScoreParametrColor(tableDate.temperature.score)}`,

                width: '100px',
              }}
              align="center"
            >
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <Grid item>
                  <Box fontSize={12} fontWeight="fontWeightBold" m={1}>
                    {tableDate.temperature.value}
                  </Box>
                </Grid>
                <Grid item>{tableDate.temperature.units || '.'}</Grid>
              </Grid>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default VitalSigns;
