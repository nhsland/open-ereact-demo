import React, { useEffect } from 'react';
import { FormContext, useForm } from 'react-hook-form';
import { Box, Grid } from '@material-ui/core';
import RadioGroup from '../../Components/RadioGroup';
import { parseFormData } from './formater';

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
export default ({ defaultValues, valid, setValid, setStepContext, onSubmit }) => {
    const methods = useForm();
    const { watch } = methods;

    useEffect(() => {
        const checkAllQuestions = () => {
            const step1Values = Object.keys(watch());
            return !valid && step1Values.length !== 0 && step1Values.every((k) => !!watch()[k]);
        };
        if (checkAllQuestions()) {
            setValid(true);
        }
    }, [watch, valid, setValid]);

    const onSubmitStep1 = data => {
        const parsed = parseFormData(data, 'step1');
        if (parsed.infectionSuspicion.length > 0) {
            setValid(false);
            return setStepContext('step2', { data, parsed });
        }
        return onSubmit(parsed, 'ok');
    };

    return (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <FormContext {...methods}>
            <form id='sepsis-form-step1' onSubmit={methods.handleSubmit(onSubmitStep1)}>
                <Box m={2}>
                    <Grid container wrap="nowrap" direction='column' spacing={2}>
                        <Grid item md={12} >
                            <RadioGroup
                                name='unwell'
                                values={RADIO_OPTIONS}
                                defaultValue={defaultValues?.unwell}
                                label='Is the patient ill / looks unwell / a concern?'
                            />
                        </Grid>
                        <Grid item md={12} >
                            <RadioGroup
                                name='impairedImmunity'
                                values={RADIO_OPTIONS}
                                defaultValue={defaultValues?.impairedImmunity}
                                label='Is there any impaired immunity (e.g. diabetes, steroids, chemotherapy)?'
                            />
                        </Grid>
                        <Grid item md={12} >
                            <RadioGroup
                                name='recentTrauma'
                                values={RADIO_OPTIONS}
                                defaultValue={defaultValues?.recentTrauma}
                                label='Is there any evidence of recent trauma / surgery / invasive procedure?'
                            />
                        </Grid>
                        <Grid item md={12} >
                            <RadioGroup
                                name='indwellingLines'
                                values={RADIO_OPTIONS}
                                defaultValue={defaultValues?.indwellingLines}
                                label='Is there any indwelling lines / IVDU / broken skin?'
                            />
                        </Grid>
                    </Grid>
                </Box>
            </form>
        </FormContext>
    );
};