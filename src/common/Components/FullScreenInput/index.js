import React, { useState, useEffect, useRef } from 'react';
import { useFormContext, ErrorMessage } from "react-hook-form";
import { TextField, InputAdornment, Grid, Box, Typography } from '@material-ui/core';
import Input from '../Input/Input';
import Dialog from '../Dialog';
import Button from '../Button';
import { validationRulesBloodPresure, validationRules } from './fieldsRules';
import Select from '../Select';

const FLOW_RATE_UNITS = {
    Lpm: 'Litres per minute',
    percent: '%'
};

export default ({
    label,
    units,
    required = 'This fill is required',
    scale,
    device,
    defaultValue,
    edit,
    onSubmit,
    name,
    columnTitles
}) => {
    const { register } = useFormContext();
    const [open, setOpen] = useState(false);
    const [error, setError] = useState({});
    const [inputValue, setInputValue] = useState('');
    const [value, setValue] = useState('');
    const [value2, setValue2] = useState('');
    const inputEl = useRef(null);
    const inputEl2 = useRef(null);
    const [selectedUnits, setSelectedUnits] = React.useState('Lpm');

    useEffect(() => {
        if (edit === name) {
            setOpen(true);
        }
    }, [edit, name]);

    const handleClose = () => {
        setOpen(false);
        if (edit === name) {
            onSubmit();
        }
    };

    const handleOpen = e => {
        const values = e.target.value.split('.');
        if (!edit || edit === name) {
            setValue(values[0]);
            if (values[1]) {
                setValue2(values[1]);
            }
            e.preventDefault();
            setOpen(true);
        }
    };

    const handleSubmit = val => {
        setInputValue(val);
        setOpen(false);
        if (edit === name) {
            onSubmit();
        }
    };

    const rangValidator = (val, min, max, errorObject) => {
        return val >= min && val <= max ? null : errorObject;
    };

    const formatInputValue = () => {
        let val = inputEl.current.value;
        if (inputEl2.current) {
            val += `.${inputEl2.current.value}`;
        }
        return val;
    };

    const vallidateBloodPresure = () => {
        const { systolic, diastolic, bloodPressure } = validationRulesBloodPresure;
        const { rules: systolicRules, errorObject: systolicErrorObject } = systolic;
        const { rules: diastolicRules, errorObject: diastolicErrorObject } = diastolic;
        const { min: systolicMin, max: systolicMax } = systolicRules;
        const { min: diastolicMin, max: diastolicMax } = diastolicRules;
        const systolicValue = inputEl.current.value;
        const diastolicValue = inputEl2.current.value;
        const systolicError = rangValidator(
            systolicValue, systolicMin, systolicMax, systolicErrorObject
        );
        const diastolicError = rangValidator(
            diastolicValue, diastolicMin, diastolicMax, diastolicErrorObject
        );
        let err = {};
        if (systolicValue < diastolicValue) {
            Object.assign(err, bloodPressure.errorObject);
        }
        else {
            err = {};
        }
        const errors = (systolicError || diastolicError);
        setError(errors || err);
        if (!errors && Object.keys(err).length === 0) {
            setError({});
            handleSubmit(formatInputValue);
        }
    };

    const handleValidate = () => {

        if (name === 'bloodPressure.value') {
            return vallidateBloodPresure();
        }
        const { rules, errorObject } = validationRules(name);
        const { min, max } = rules;
        const val = formatInputValue();
        const err = rangValidator(val, min, max, errorObject);
        if (!err) {
            setError({});
            return handleSubmit(val);
        }
        return setError(err);
    };

    const handleChange = e =>
        setValue(e.target.value);

    const handleChange2 = e =>
        setValue2(e.target.value);

    const isFlowRate = name === 'flowRate.value';

    const getUnits = () =>
        isFlowRate ? FLOW_RATE_UNITS[selectedUnits] : units;

    return (
        <Dialog
            title={`Add ${label}`}
            open={open}
            fullScreen
            close
            handleClose={handleClose}
            handleOpen={handleOpen}
            openAction={
                <>
                    <TextField
                        name={name}
                        label={label}
                        value={inputValue || ''}
                        inputRef={register({ required })}
                        onClick={event => handleOpen(event)}
                        onTouchEnd={event => handleOpen(event)}
                        onKeyUp={() => handleOpen()}
                        variant="outlined"
                        style={{ width: '100%' }}
                        autoComplete="off"
                        disabled={Boolean(edit && defaultValue && edit !== name)}
                        // eslint-disable-next-line react/jsx-props-no-spreading
                        {...(inputValue.length > 0 ? {
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
        >
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                spacing={8}
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

                {columnTitles ? (
                    <Grid item>
                        <Grid container direction='row' id='singleInput' name='singleInput'>
                            <Grid item>
                                <Box m={4}>
                                    <Typography align='center' >{columnTitles[0]}</Typography>
                                </Box>
                                <Input
                                    type='number'
                                    key='secondColumn'
                                    value={value}
                                    autoFocus
                                    inputRef={inputEl}
                                    defaultWidth={150}
                                    onChange={handleChange}
                                    // eslint-disable-next-line react/jsx-props-no-spreading
                                    {...(value.length > 0 ? {
                                        InputProps: {
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    {units}
                                                </InputAdornment>
                                            )
                                        }
                                    } : {})}
                                />
                            </Grid>
                            <Grid item>
                                <Box m={4}>
                                    <Typography align='center' >{columnTitles[1]}</Typography>
                                </Box>
                                <Input
                                    type='number'
                                    value={value2}
                                    key='firstColumn'
                                    inputRef={inputEl2}
                                    defaultWidth={150}
                                    onChange={handleChange2}
                                    // eslint-disable-next-line react/jsx-props-no-spreading
                                    {...(value2.length > 0 ? {
                                        InputProps: {
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    {units || <span>&#8451;</span>}
                                                </InputAdornment>
                                            )
                                        }
                                    } : {})}
                                />
                            </Grid>
                        </Grid>
                        <Box color='error.main'>
                            <ErrorMessage name='singleInput' errors={error} />
                        </Box>
                    </Grid>
                ) : (
                        <Grid item>
                            <Box name='singleInput'>
                                <Grid container direction='row'>
                                    <Grid item>
                                        <Input
                                            type='number'
                                            value={value}
                                            key='firstColumn'
                                            autoFocus
                                            inputRef={inputEl}
                                            defaultWidth={300}
                                            onChange={e => handleChange(e)}
                                            // eslint-disable-next-line react/jsx-props-no-spreading
                                            {...(value.length > 0 && !isFlowRate ? {
                                                InputProps: {
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            {units}
                                                        </InputAdornment>
                                                    )
                                                }
                                            } : {})}
                                        />
                                    </Grid>
                                    {isFlowRate && (
                                        <Grid item>
                                            <Select
                                                options={[{ value: 'Lpm', name: 'Litres per minute' }, { value: 'percent', name: '%' }]
                                                }
                                                value={selectedUnits}
                                                handleChange={setSelectedUnits}
                                            />
                                        </Grid>
                                    )}
                                </Grid>


                            </Box>
                            <Box color='error.main'>
                                <ErrorMessage name='singleInput' errors={error} />
                            </Box>
                        </Grid>
                    )}
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    spacing={2}
                >
                    <Grid item>
                        <Box m={4}>
                            <Button
                                color="success"
                                variant="contained"
                                onClick={handleValidate}
                            >
                                Confirm {label}
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Dialog>
    );
};
