import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import MuiDialog from '@material-ui/core/Dialog';
import SortIcon from '@material-ui/icons/Sort';
import MuiSvgIcon from '@material-ui/core/Icon';
import { Button, Grid, Typography, Box, FormControl, FormLabel, FormControlLabel, Radio, RadioGroup } from '@material-ui/core';
import uniqid from 'uniqid';

export const RadioItem = ({ value, label, disabled }) => (
  <FormControlLabel
    value={value}
    control={<Radio size='small' color="primary" disabled={disabled} />}
    label={label}
  />
);

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    margin: 0
  },
  scrollContainer: {
    overflow: 'auto'
  },
  paper: {
    minWidth: 400,
    border: '0.0469em solid #757575',

    overflow: 'auto'
  }
}));

const Dialog = withStyles(() => ({
  scrollPaper: {
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start'
  }
}))(MuiDialog);

const SvgIcon = withStyles(() => ({
  root: {
    transform: 'scale(1, -1)'
  }
}))(MuiSvgIcon);

const mapedSortBy = sort =>
  ({
    'score.ammount': 'NEWS2',
    newsFreq: 'news Freq',
    names: 'name',
    priority: 'Priority'
  }[sort]);

export default ({
  name,
  handleSort,
  open,
  setOpen,
  options,
  disabled,
  defaultValue
}) => {
  const [selected, setSelected] = useState({
    value: defaultValue
  });
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = value => {
    setSelected({ value });
    handleSort({ value });
    handleClose();
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const classes = useStyles();
  return (
    <Box ml={2}>
      <div className={classes.root}>
        <div className={classes.scrollContainer}>
          <Grid container alignItems="center" justify="center">
            <div>
              <Button disabled={disabled} onClick={handleOpen}>
                <Grid
                  container
                  direction="column"
                  justify="flex-start"
                  alignItems="flex-start"
                >
                  <SvgIcon>
                    <SortIcon />
                  </SvgIcon>
                  <Typography variant="caption">
                    {mapedSortBy(selected.value)}
                  </Typography>
                </Grid>
              </Button>

              <Dialog open={open} onClose={handleClose}>
                <Box p={1} m={1}>
                  <FormControl component="fieldset">
                    <FormLabel disabled component="legend">Sort</FormLabel>
                    <RadioGroup
                      name={name}
                      value={selected.value}
                      onChange={event => handleChange(event.target.value)}
                    >
                      {options &&
                        options.map(item => (
                          <RadioItem
                            key={uniqid()}
                            value={item.id}
                            label={item.name}
                          />
                        ))}
                    </RadioGroup>
                  </FormControl>
                </Box>
              </Dialog>
            </div>
          </Grid>
        </div>
      </div>
    </Box>
  );
};
