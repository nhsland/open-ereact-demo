import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/styles';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import AssignmentIcon from '@material-ui/icons/Assignment';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { NavContext } from '../../core/context/NavContext';

const useStyles = makeStyles({
  root: {
    minWidth: 75
  },
  wrapper: {
    position: 'fixed',
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 100,
    backgroundColor: '#efefef',
    textAlign: 'center',
    paddingTop: 5
  }
});
export default () => {
  const classes = useStyles();
  const { navPath, setNavContext } = useContext(NavContext);
  const handleChange = (event, newValue) => {
    setNavContext(newValue);
  };
  return (
    <div
      className={classes.wrapper}
    >
      <BottomNavigation
        value={navPath}
        showLabels
        onChange={handleChange}
      >
        <BottomNavigationAction
          className={classes.root}
          label="Patients"
          value="/"
          icon={<FavoriteBorderIcon />}
        />
        <BottomNavigationAction
          className={classes.root}
          label="Tasks"
          value="/tasks"
          icon={<AssignmentIcon />}
        />
        <BottomNavigationAction
          className={classes.root}
          label="Label"
          value="/#"
          icon={<RadioButtonUncheckedIcon />}
          disabled
        />

        <BottomNavigationAction
          className={classes.root}
          label="Label"
          value="/#"
          icon={<RadioButtonUncheckedIcon />}
          disabled
        />
        <BottomNavigationAction
          className={classes.root}
          label="Label"
          value="/#"
          icon={<RadioButtonUncheckedIcon />}
          disabled
        />
      </BottomNavigation>
    </div>
  );
};
