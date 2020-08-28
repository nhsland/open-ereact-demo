import React from 'react';
import { withStyles } from '@material-ui/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';

import { Grid, Typography, Box, DialogActions } from '@material-ui/core';
import RedFlag from '../../../resources/img/red-flag.png';
import AmberFlag from '../../../resources/img/amber-flag.png';
import Ok from '../../../resources/img/ok.png';
import QuestionMark from '../../../resources/img/question-mark.png';
import Spinner from '../../Components/Spinner';
import Button from '../../Components/Button';

// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction="down" ref={ref} {...props} />;
// });

const DialogContent = withStyles((theme) => ({
  root: {
    margin: theme.spacing(6),
  },
}))(MuiDialogContent);

export default ({ open, setOpen, flag, patient, loading, error, onClose }) => {
  const IMAGE = {
    ok: Ok,
    unilekely: QuestionMark,
    red: RedFlag,
    amber: AmberFlag,
  }[flag];

  const TEXT = {
    ok: 'All clear',
    unilekely: 'Sepsis unlikely, check another diagnosis',
    red: 'RED FLAG SEPSIS Start Sepsis Six',
    amber: 'AMBER Flag Sepsis Further Review Required',
  }[flag];
  if (loading) {
    return <Spinner />;
  }
  if (error) {
    return <p>{error}</p>;
  }
  return (
    <>
      <Dialog
        open={open}
        // TransitionComponent={Transition}
        keepMounted
        onClose={onClose}
      >
        <DialogContent>
          <Grid
            container
            direction="column"
            justify="space-around"
            alignItems="center"
            spacing={2}
          >
            <Grid item xs={12}>
              <Box width={250}>
                <Typography align="center" variant="h6" component="h3">
                  <Box fontWeight="fontWeightMedium">Sepsis screening for</Box>
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box mb={2}>
                <Typography align="center" variant="h6" component="h3">
                  <Box fontWeight="fontWeightMedium">{patient}</Box>
                </Typography>
              </Box>
            </Grid>
            <Grid item>
              <img width={150} src={IMAGE} alt="Registation Complete" />
            </Grid>
            <Grid item xs={12}>
              <Box width={200}>
                <Typography align="center" variant="h6" component="h3">
                  <Box fontWeight="fontWeightMedium">{TEXT}</Box>
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Grid container justify="center" alignItems="center" >
            <Button variant="contained" onClick={onClose} color="success">
              OK
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
    </>
  );
};
