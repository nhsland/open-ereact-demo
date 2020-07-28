import React, { useState, useEffect } from 'react';
import { FormContext, useForm } from 'react-hook-form';
import { Box, Grid, FormLabel } from '@material-ui/core';
import RadioGroup from '../../Components/RadioGroup';
import Checkbox from '../../Components/Checkbox';
import Input from '../../Components/Input/Input';

const RADIO_OPTIONS = [
    {
        id: 'yes',
        value: 'Yes'
    },
    {
        id: 'no',
        value: 'No'
    }
];
const AMBER_FLAG_SOURCE = [
    {
        name: 'relativesMentalStaus',
        label: 'Relatives concerned about mental status'
    },
    {
        name: 'deterioration',
        label: 'Acute deterioration in functional ability'
    },
    {
        name: 'immunosuppressed',
        label: 'Immunosuppressed'
    },
    {
        name: 'resspiratoryRate24',
        label: 'Respiratory rate 21-24'
    },
    {
        name: 'Systolic100',
        label: 'Systolic BP 91-100 mmHg'
    },
    {
        name: 'dysrhythmia',
        label: 'Heart rate 91-130 or new dysrhythmia'
    },
    {
        name: 'temp',
        label: 'Temperature less than 36 C'
    },
    {
        name: 'woundInfrction',
        label: 'Clinical signs of wound infection'
    }
];

export default ({ step, setValid, onSubmit, screeningResult }) => {
    const methods = useForm();
    const { watch, register } = methods;
    const [amberFlagSuspicion, setAmberFlagSuspicion] = useState(false);
    useEffect(() => {
        setAmberFlagSuspicion(watch().amberFlag === 'yes');
    }, [watch]);

    const noAmberFlag = amberFlagValue => amberFlagValue === 'no';
    const reasonIsPresent = ({ amberFlag, otherAmberFlag, amberFlagSource }) => {
        return (amberFlag === 'yes' && amberFlagSource && amberFlagSource.some(source => Boolean(source)))
            || (amberFlag === 'yes' && otherAmberFlag && otherAmberFlag.length > 0);
    };
    useEffect(() => {
        const { amberFlag, otherAmberFlag, amberFlagSource } = watch({ nest: true });
        if (noAmberFlag(amberFlag) || reasonIsPresent({ amberFlag, otherAmberFlag, amberFlagSource })) {
            setValid(true);
        }

        else if (step === 'step4') {
            setValid(false);
        }
    }, [watch, step, setValid]);

    const onSubmitStep4 = data => {
        const { otherAmberFlag, amberFlagSource } = data;
        let parsed = { amberFlag: [] };
        if (amberFlagSource) {
            parsed = { amberFlag: amberFlagSource.filter(Boolean) };
        }
        if (otherAmberFlag) {
            parsed.amberFlag.push(otherAmberFlag);
        }
        return onSubmit({ ...screeningResult, ...parsed }, 'amber');

    };
    return (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <FormContext {...methods}>
            <form id='sepsis-form-step4' onSubmit={methods.handleSubmit(onSubmitStep4)}>
                <Box m={2}>
                    <Grid container wrap="nowrap" direction='column' spacing={2}>
                        <Grid item md={12} >
                            <RadioGroup
                                name='amberFlag'
                                values={RADIO_OPTIONS}
                                register={register}
                                label='Are any amber flag factors present?'
                            />
                        </Grid>
                        {amberFlagSuspicion &&
                            <>
                                <Grid item md={12}>
                                    <Box mb={1}>
                                        <FormLabel component="legend">Tick all that apply</FormLabel>
                                    </Box>
                                    <Grid
                                        container
                                        direction='column'
                                        alignContent="flex-start"
                                        m={1}
                                    >
                                        {AMBER_FLAG_SOURCE.map((source, index) => {
                                            const { label, name } = source;
                                            return (
                                                <Grid item key={`${name}-control`}>
                                                    <Checkbox
                                                        register={register}
                                                        name={`amberFlagSource[${index}]`}
                                                        label={label}
                                                    />
                                                </Grid>);
                                        })}
                                    </Grid>
                                </Grid>
                                <Grid item md={12}>
                                    <Input
                                        inputRef={register}
                                        InputLabelProps={{ shrink: true }}
                                        name='otherAmberFlag'
                                        label='If other, please specify'
                                        placeholder='If other, please specify'
                                    />
                                </Grid>
                            </>
                        }
                    </Grid>
                </Box>
            </form>
        </FormContext>
    );
};