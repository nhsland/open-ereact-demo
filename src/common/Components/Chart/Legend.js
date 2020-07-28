import React from 'react';
import { makeStyles } from '@material-ui/styles';
import uniqid from 'uniqid';
import { SvgIcon, FormControlLabel } from '@material-ui/core';
import {
  Circle,
  Square,
  Daimnond,
  Hexagon,
  Triangle,
  TriangleMirrow,
} from './Icon';

const useStyles = makeStyles({
  listItem: {
    display: 'inline',
    margin: '5px',
  },
  wrapper: {
    textAlign: 'center',
    marginBottom: '5px',
  },
});

const icons = type =>
  ({
    circle: Circle,
    square: Square,
    daimnond: Daimnond,
    hexagon: Hexagon,
    triangleMirrow: TriangleMirrow,
    triangle: Triangle,
  }[type]);

const CustomizedLegend = ({ items }) => {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <ul>
        {items.map(({ icon, name }) => (
          <li className={classes.listItem} key={uniqid()}>
            <FormControlLabel
              value="female"
              control={<SvgIcon component={icons(icon)} />}
              label={name}
            />

            {/* <SvgIcon component={icons(icon)} /> */}
            {/* {icons(icon, name)} <span>{name}</span> */}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default CustomizedLegend;
