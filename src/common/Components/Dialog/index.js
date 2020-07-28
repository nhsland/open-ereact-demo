import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import { Dialog, Grid, Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  subtitle: {
    margin: 0,
    paddingTop: 0,
    paddingLeft: theme.spacing(4)
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
});


const DialogTitle = withStyles(styles)(props => {
  const { title, classes, onClose, align, handleClose, close, handleSave, ...other } = props;
  return (
    <MuiDialogTitle
      disableTypography
      className={classes.root}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...other}
    >
      <Grid
        container
        direction='row'
        alignItems='center'
        alignContent='center'
        spacing={2}

      >
        <Grid item>
          {close && (
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>)}
        </Grid>
        <Grid item>
          <Typography align="center" variant="h5">{title}</Typography>
        </Grid>
      </Grid>

    </MuiDialogTitle>
  );
});

const DialogSubtitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle
      disableTypography
      className={classes.subtitle}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...other}
    >
      <Typography style={{ paddingRight: '70px' }} variant="h6">
        {children}
      </Typography>
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    // minHeight: 350,
    // marginTop: theme.spacing(4),
    // marginLeft: theme.spacing(6),
    // marginRight: theme.spacing(6),
    // marginTop: theme.spacing(6),
    // marginLeft: theme.spacing(10),
    // marginRight: theme.spacing(10),
    overflow: 'hidden'
  }
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    paddingRight: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  }
}))(MuiDialogActions);

export default ({ title, subtitle, close, children, open, openAction, bottomActions, fullScreen, handleClose, alignTitle }) => {
  return (
    <>
      {openAction}
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
      >
        {title && <DialogTitle close={close} title={title} onClose={() => handleClose()} handleClose={handleClose} align={alignTitle} />}
        {subtitle && <DialogSubtitle>{subtitle}</DialogSubtitle>
        }
        <DialogContent>{children}</DialogContent>
        <DialogActions>
          {bottomActions}
        </DialogActions>
      </Dialog>
    </>
  );
};
