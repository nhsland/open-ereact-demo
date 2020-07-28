import React, { useState, useEffect } from 'react';
import { useFormContext } from "react-hook-form";
import { TextField, InputAdornment, Grid, Box, Typography } from '@material-ui/core';
import Picker from 'react-mobile-picker-scroll';
import uniqid from 'uniqid';
import Dialog from '../Dialog';
import Button from '../Button';
import Select from "../Select";


const FLOW_RATE_UNITS = {
  Lpm: 'Liters per minute',
  percent: '%'
};

export default ({
  title,
  label,
  units,
  placeholder,
  valueGroupsProps,
  optionGroups,
  required = 'required',
  // register,
  scale,
  device,
  // triggerValidation,
  defaultValue,
  edit,
  columnTitles,
  name,
  onSubmit
  // clearError
}) => {
  const { register, triggerValidation, clearError } = useFormContext();
  const [open, setOpen] = useState(false);
  const [valueGroups, setValueGroup] = useState(valueGroupsProps);
  const [inputValue, setInputValue] = useState(null);
  const [selectedUnits, setSelectedUnits] = useState('Lpm')
  const [scroled, setScroled] = useState(false)

  const disabled = Boolean(edit && defaultValue && edit !== name);
  useEffect(() => {
    if (edit === name) {
      setOpen(true);
    }
  }, [edit, name]);

  useEffect(() => {
    triggerValidation(name);
  }, [triggerValidation, name]);


  const handleClose = () => {
    setOpen(false);
    if (edit === name) {
      onSubmit();
    }
  };
  const handleOpen = event => {
    event.currentTarget.focus();
    if (!disabled) {
      event.preventDefault();
      setOpen(true);
    }
  };

  const systolicDiastolicValidation = (key, value) => {
    if (key === 'firstColumn' && value < valueGroups.secondColumn) {
      return setValueGroup({ ...valueGroups, [key]: value, secondColumn: value });
    }
    if (key === 'secondColumn' && valueGroups.firstColumn < value) {
      return setValueGroup({ ...valueGroups, [key]: valueGroups.firstColumn });
    }
    return setValueGroup({ ...valueGroups, [key]: value });
  };

  const handleChange = (key, value) => {
    setScroled(true)
    if (name === 'bloodPressure.value') {
      return systolicDiastolicValidation(key, value);
    }
    return setValueGroup({ ...valueGroups, [key]: value });
  };

  const handleConfirm = () => {
    setInputValue(valueGroups);
    clearError(name);
    setOpen(false);
    if (edit === name) {
      onSubmit();
    }
  };
  const parseSeparartor = () => valueGroupsProps.separator === '\u25CF' ? '.' : '/';

  const getValue = () => {
    if (edit === name || !edit) {
      return inputValue
        ? `${inputValue.firstColumn}${valueGroupsProps.separator ? parseSeparartor() : ''}${
        inputValue.secondColumn ? inputValue.secondColumn : ''
        }`
        : '';
    }
    if (defaultValue) {
      return defaultValue;
    }
    return inputValue
      ? `${inputValue.firstColumn}${valueGroupsProps.separator ? parseSeparartor() : ''}${
      inputValue.secondColumn ? inputValue.secondColumn : ''
      }`
      : '';
  };
  const isFlowRate = name === 'flowRate.value';
  const subtitle = isFlowRate ? (
    <Select
      options={[{ value: 'Lpm', name: 'Liters per minute' }, { value: 'percent', name: '%' }]
      }
      value={selectedUnits}
      handleChange={setSelectedUnits}
    />
  ) : units;
  const getUnits = () =>
    isFlowRate ? FLOW_RATE_UNITS[selectedUnits] : units;
  return (
    <Dialog
      title={title}
      subtitle={subtitle}
      open={open}
      handleClose={handleClose}
      handleOpen={handleConfirm}
      openAction={
        <>
          <TextField
            name={name}
            label={label}
            placeholder={placeholder}
            value={getValue()}
            inputRef={register({ required })}
            onClick={event => handleOpen(event)}
            onTouchEnd={event => handleOpen(event)}
            onKeyUp={() => handleOpen()}
            variant="outlined"
            style={{ width: '100%' }}
            autoComplete="off"
            disabled={disabled}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...(inputValue ? {
              InputProps: {
                readOnly: true,
                endAdornment: (
                  <InputAdornment position="end">
                    {getUnits()}
                  </InputAdornment>
                )
              }
            } : {
                InputProps: { readOnly: true }
              })}

          />
        </>
      }
      bottomActions={
        <Grid
          container
          direction="row"
          justify="flex-end"
          alignItems="flex-end"
          spacing={2}
        >
          <Grid item>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              color="success"
              variant="contained"
              disabled={!scroled}
              onClick={handleConfirm}>
              Confirm
            </Button>
          </Grid>
        </Grid>
      }
    >
      <Box width={600} mb={4} pb={2} pt={2}>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
        >
          {scale && (
            <Grid item>
              <Box width={300}>
                <Typography align="center">
                  Scale {scale}
                </Typography>
              </Box>
              {scale === '2' &&
                <Box width={300}>
                  <Typography align="center" >
                    Only use Scale 2 under the direction of a qualified clinician
               </Typography>
                </Box>}
              {device &&
                <Box mt={2} width={300} color='warning.main'>
                  <Typography align="center">
                    ⚠  Patient has {device}
                  </Typography>
                </Box>}
            </Grid>
          )}

          {columnTitles && <Grid item>
            <Box width={300}>
              <Grid container direction='row' justify="space-around">
                {columnTitles.map(item => (
                  <Grid item key={uniqid()}>
                    <Typography align="center">
                      {item}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>}

          <Grid item>
            <Box width={300} >
              <Picker
                itemHeight={66}
                height={310}
                optionGroups={optionGroups}
                valueGroups={valueGroups}
                onChange={(key, value) => handleChange(key, value)}
                />
            </Box>
          </Grid>

        </Grid>
      </Box>
    </Dialog>
  );
};
