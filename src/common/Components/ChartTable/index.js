import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import uniqid from 'uniqid';

import clsx from 'clsx';
import { formatTime } from '../../../utils/formatters';

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
  'Dec',
];
export const formatDate2 = value => {
  if (value) {
    const date = new Date(value);

    const day = date.getDate();
    const month = months[date.getMonth()];
    return ` ${day}-${month} `;
  }
  return '';
};
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  fixed: {
    background: 'white',
    position: 'sticky',
    left: 0,
    borderRight: '2px solid black',
  },
  lowRisk: {
    backgroundColor: '#fbf184',
  },
  risk: {
    backgroundColor: '#FBC384',
  },
  hightRisk: {
    backgroundColor: '#F40013',
    color: '#fff',
  },
  cell: {
    fontWeight: 'bold',
  },
  border: {
    borderLeft: '2px solid black',
  },
  news2: {
    borderTop: '4px solid rgba(224, 224, 224, 1)',
  },
});

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#005EB8',
    color: theme.palette.common.white,
    fontSize: 10,
    whiteSpace: 'nowrap',
    borderBottom: '2px solid black',
    lineHeight: 'normal',
    padding: '6px 14px 6px 6px',
  },
  body: {
    fontSize: 10,
    borderRight: '1px solid black',
    padding: '6px 14px 6px 6px',
  },
}))(TableCell);

export default function SimpleTable({ headers, rows }) {
  const classes = useStyles();

  const cellColor = score => {
    if (score === 3) return clsx(classes.hightRisk, classes.cell);
    if (score === 2) return clsx(classes.risk, classes.cell);
    if (score === 1) return clsx(classes.lowRisk, classes.cell);
    return classes.cell;
  };
  return (
    <TableContainer square component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell
              className={clsx(classes.fixed, classes.cell)}
              align="center"
              size="small"
            >
              Measurment
            </StyledTableCell>
            {headers.map(item => {
              return (
                <StyledTableCell
                  key={uniqid()}
                  className={classes.cell}
                  align="center"
                  size="small"
                >
                  <div>{formatDate2(item)}</div>
                  <div>{formatTime(item)}</div>
                </StyledTableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.name}>
              <StyledTableCell
                className={clsx(
                  classes.fixed,
                  classes.cell,
                  //   classes.columnTitle,
                  row.news2 && classes.news2,
                )}
                align="center"
                size="small"
                component="th"
                scope="row"
              >
                {row.name}
              </StyledTableCell>
              {row.values.map((value, index) => (
                <StyledTableCell
                  className={clsx(
                    cellColor(value?.score),
                    index === 0 && classes.border,
                    row.news2 && classes.news2,
                  )}
                  align="center"
                  size="small"
                  component="th"
                  scope="row"
                >
                  {value?.value}
                </StyledTableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
