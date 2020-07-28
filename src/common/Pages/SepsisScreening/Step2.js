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
const INFECTION_SOURCE = [
    {
        name: 'respiratory',
        label: 'Respiratory'
    },
    {
        name: 'surgical',
        label: 'Surgical'
    },
    {
        name: 'brain',
        label: 'Brain'
    },
    {
        name: 'urine',
        label: 'Urine'
    },
    {
        name: 'skin',
        label: 'Skin/ Joint/ Wound'
    },
    {
        name: 'indwellingDeviced',
        label: 'Indwelling deviced'
    }
];

export default ({ defaultValues, setValid, step2, step, setStepContext, onSubmit, screeningResult }) => {
    const [infectionSuspicion, setInfectionSuspicion] = useState(false);
    const methods = useForm();
    const { watch, register } = methods;
    useEffect(() => {
        setInfectionSuspicion(watch().infection === 'yes');
    }, [watch]);

    const noInfection = infectionValue => infectionValue === 'no' || step2?.parsed;
    const reasonIsPresent = ({ infection, otherInfection, infectionSource }) => {
        return (infection === 'yes' && infectionSource && infectionSource.some(source => Boolean(source)))
            || (infection === 'yes' && otherInfection && otherInfection.length > 0);
    };
    useEffect(() => {
        const { infection, otherInfection, infectionSource } = watch({ nest: true });
        if (noInfection(infection) || reasonIsPresent({ infection, otherInfection, infectionSource })) {
            setValid(true);
        }
        else if (step === 'step2') {
            setValid(false);
        }
    }, [watch, step, step2, setValid]);

    const onSubmitStep2 = data => {
        const { infection, otherInfection, infectionSource } = data;
        if (infection === 'no') {
            return onSubmit({ ...screeningResult, infection: [] }, 'unilekely');
        }
        const parsed = { infection: infectionSource.filter(Boolean) };
        if (otherInfection) {
            parsed.infection.push(otherInfection);
        }

        return setStepContext('step3', { data, parsed });
    };
    return (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <FormContext {...methods}>
            <form id='sepsis-form-step2' onSubmit={methods.handleSubmit(onSubmitStep2)}>
                <Box m={2}>
                    <Grid container wrap="nowrap" direction='column' spacing={2}>
                        <Grid item md={12} >
                            <RadioGroup
                                name='infection'
                                values={RADIO_OPTIONS}
                                defaultValue={defaultValues && 'yes'}
                                label='Could it be an infection?'
                            />
                        </Grid>
                        {infectionSuspicion && (
                            <>
                                <Grid item md={12}>
                                    <FormLabel component="legend">What is the source of the infection?</FormLabel>

                                    <Box
                                        display="flex"
                                        flexWrap="wrap"
                                        alignContent="flex-start"
                                        m={1}
                                    >
                                        {INFECTION_SOURCE.map((source, index) => {
                                            const { label, name } = source;
                                            return (
                                                <Box width={200} key={`${name}-control`}>
                                                    <Checkbox
                                                        register={register}
                                                        name={`infectionSource[${index}]`}
                                                        label={label}
                                                        defaultValue={typeof defaultValues?.infectionSource[index] === 'string'}
                                                    />
                                                </Box>);
                                        })}
                                    </Box>
                                </Grid>
                                <Grid item md={12}>
                                    <Input
                                        inputRef={register}
                                        InputLabelProps={{ shrink: true }}
                                        name='otherInfection'
                                        label='If other, please specify'
                                        placeholder='If other, please specify'
                                        defaultValue={defaultValues?.otherInfection}
                                    />
                                </Grid>
                            </>)}
                    </Grid>
                </Box>
            </form >
        </FormContext >
    );
};