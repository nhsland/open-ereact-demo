import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import { Box, TextField } from '@material-ui/core';
import ErrorMessage from '../ErrorMsg';
import useWindowDimensions from '../../../core/hooks/useWindowDimensions';

const useStyles = makeStyles({
  root: {
    minWidth: '100%',
    backgroundColor: '#fff'
  }
});

export default ({
  inputRef,
  label,
  name,
  errors,
  endAdornment,
  readOnly,
  defaultWidth,
  ...props
}) => {
  const classes = useStyles();
  const { width } = useWindowDimensions();
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.only('xs'));
  return (
    <Box p={1} width={defaultWidth || width - 124}>
      <TextField
        label={label}
        InputLabelProps={{
          ...props.InputLabelProps
        }}
        readOnly
        autoComplete="off"
        name={name}
        className={classes.root}
        inputRef={inputRef}
        {...(md ? { size: 'small' } : {})}
        InputProps={{
          // eslint-disable-next-line react/destructuring-assignment
          ...props.InputProps,
          readOnly,
          endAdornment
        }}
        {...props}
      />
      {errors && <ErrorMessage name={name} errors={errors} />}
    </Box>
  );
};
