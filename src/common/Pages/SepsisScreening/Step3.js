import React, { useEffect, useState } from 'react';
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
const RED_FLAG_SOURCE = [
    {
        name: 'mentalState',
        label: 'Objective evidence of new or altered mental state'
    },
    {
        name: 'systolic',
        label: 'Systolic BP < 90mmHg (or drop of >40 from normal'
    },
    {
        name: 'heartRate',
        label: 'Heart Rate > 130 per minute'
    },
    {
        name: 'resspiratoryRate',
        label: 'Respiratory rate > 25 per minute'
    },
    {
        name: 'o2',
        label: 'Needs O2 to keep SpO2 > 92% (88% in COPD)'
    },
    {
        name: 'rash',
        label: 'Non-blanching rash / mottled / ashen / cyanotic'
    },
    {
        name: 'lactate',
        label: 'Lactate > 2 mmol/l'
    },
    {
        name: 'chemotherapy',
        label: 'Recent chemotherapy'
    },
    {
        name: 'urine',
        label: 'Not passed urine in 18 hrs (<0.5 ml/kg/hr if catheterised)'
    }
];

export default ({ defaultValues, setValid, step, setStepContext, onSubmit, screeningResult }) => {
    const methods = useForm();
    const { watch, register } = methods;
    const [redFlagSuspicion, setRedFlagSuspicion] = useState(false);
    useEffect(() => {
        setRedFlagSuspicion(watch().redFlag === 'yes');
    }, [watch]);

    const noRedFlag = redFlagValue => redFlagValue === 'no';
    const reasonIsPresent = ({ redFlag, otherRedFlag, redFlagSource }) => {
        return (redFlag === 'yes' && redFlagSource && redFlagSource.some(source => Boolean(source)))
            || (redFlag === 'yes' && otherRedFlag && otherRedFlag.length > 0);
    };
    useEffect(() => {
        const { redFlag, otherRedFlag, redFlagSource } = watch({ nest: true });
        if (noRedFlag(redFlag) || reasonIsPresent({ redFlag, otherRedFlag, redFlagSource })) {
            setValid(true);
        }
        else if (step === 'step3') {
            setValid(false);
        }
    }, [watch, step, setValid]);

    const onSubmitStep3 = data => {
        const { redFlag, otherRedFlag, redFlagSource } = data;
        let parsed = { redFlag: [] };
        if (redFlag === 'no') {
            return setStepContext('step4', { data, parsed });
        }
        if (redFlagSource) {
            parsed = { redFlag: redFlagSource.filter(Boolean) };
        }
        if (otherRedFlag) {
            parsed.redFlag.push(otherRedFlag);
        }
        return onSubmit({ ...screeningResult, ...parsed }, 'red');
    };
    return (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <FormContext {...methods}>
            <form id='sepsis-form-step3' onSubmit={methods.handleSubmit(onSubmitStep3)}>
                <Box m={2}>
                    <Grid container wrap="nowrap" direction='column' spacing={2}>
                        <Grid item md={12} >
                            <RadioGroup
                                name='redFlag'
                                values={RADIO_OPTIONS}
                                defaultValue={defaultValues && 'no'}
                                label='Are any red flag factors present?'
                            />
                        </Grid>
                        {redFlagSuspicion &&
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
                                        {RED_FLAG_SOURCE.map((source, index) => {
                                            const { label, name } = source;
                                            return (
                                                <Grid item key={`${name}-control`} >
                                                    <Checkbox
                                                        register={register}
                                                        name={`redFlagSource[${index}]`}
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
                                        name='otherRedFlag'
                                        label='If other, please specify'
                                        placeholder='If other, please specify'
                                        defaultValue={defaultValues?.otherRedFlag}

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