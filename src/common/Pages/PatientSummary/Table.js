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
    width: 500
  },
  root: {
    padding: 0
  }
});
const TableCell = withStyles(theme => ({
  root: {
    padding: theme.spacing(0),
    fontSize: 10
  }
}))(MuiTableCell);

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
];
const formatTime = value => {
  const date = new Date(value);
  const houre = date.getHours();
  const minuts = date.getMinutes();
  return `${houre}:${minuts}`;
};

const formatDate = value => {
  const date = new Date(value);
  const year = date
    .getFullYear()
    .toString()
    .slice(-2);
  const day = date.getDay();
  const month = months[date.getMonth()];
  return `${day}-${month}-${year}`;
};

const VitalSigns = tableDate => {
  const classes = useStyles();
  const sections = Object.keys(tableDate.tableDate) || [];
  const parametrs = [];
  const values = [];

  sections.map(section =>
    tableDate.tableDate[section].map((parametr, index) =>
      parametrs.push(
        <TableCell
          key={uniqid()}
          style={{
            borderRight: `${
              tableDate.tableDate[section].length === index + 1
                ? '2px solid #fff'
                : 'none'
              }`
          }}
          align="center"
        >
          {parametr.parametr}
        </TableCell>
      )
    )
  );

  sections.map(section =>
    tableDate.tableDate[section].map((parametr, index) =>
      values.push(
        <TableCell
          key={uniqid()}
          style={{
            border: '2px solid #E0E0E0',
            backgroundColor: `${parametr.color}`,
            color: `${parametr.color === '#2E7D32' ? '#fff' : '#000'}`,
            borderRight: `${
              tableDate.tableDate[section].length === index + 1
                ? '2px solid #fff'
                : 'none'
              }`,
            width: '100px'
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
                {parametr.value}
              </Box>
            </Grid>
            <Grid item>{parametr.units || '.'}</Grid>
          </Grid>
        </TableCell>
      )
    )
  );

  return (
    <TableContainer style={{ backgroundColor: '#E0E0E0' }} component={Paper}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            {sections.map((section, ) => (
              <TableCell
                key={uniqid()}
                className={classes.root}
                style={{
                  backgroundColor: '#515F9C',
                  color: '#fff',
                  height: '20px',
                  borderRight: '2px solid #fff'
                }}
                align="center"
                colSpan={tableDate.tableDate[section].length}
              >
                <Box fontSize={12} fontWeight="fontWeightBold">
                  {section.split('').join(' + ')}{' '}
                </Box>
              </TableCell>
            ))}
          </TableRow>
          <TableRow>{parametrs}</TableRow>
        </TableHead>
        <TableBody>
          <TableRow>{values}</TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export const Biohemistry = ({ tableDate }) => {
  const classes = useStyles();

  return (
    <TableContainer style={{ backgroundColor: '#E0E0E0', overflow: 'visible' }} component={Paper}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            {tableDate.map(parametr => (
              <TableCell
                key={uniqid()}
                style={{
                  paddingTop: '10px',
                  paddingBottom: '10px'
                }}
                align="center"
              >
                <Box fontWeight="fontWeightBold">{parametr.parametr}</Box>
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            {tableDate.map(parametr => (
              <TableCell
                key={uniqid()}
                style={{
                  border: '2px solid #E0E0E0',
                  backgroundColor: `${parametr.color}`,
                  color: `${parametr.color === '#2E7D32' ? '#fff' : '#000'}`,
                  borderRight: '2px solid #E0E0E0',
                  width: '100px'
                }}
              >
                <Grid
                  container
                  direction="column"
                  justify="center"
                  alignItems="center"
                >
                  <Grid item>
                    <Box fontSize={12} fontWeight="fontWeightBold">
                      {parametr.value}
                    </Box>
                  </Grid>
                  <Grid item>{parametr.units || '.'}</Grid>
                </Grid>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            {tableDate.map(parametr => (
              <TableCell align="center" key={uniqid()}>
                <Grid
                  container
                  direction="column"
                  justify="center"
                  alignItems="center"
                >
                  <Grid item>{formatTime(parametr.date)}</Grid>
                  <Grid item>{formatDate(parametr.date)}</Grid>
                </Grid>
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default VitalSigns;
