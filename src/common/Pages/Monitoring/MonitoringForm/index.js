/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';

import { Divider, Grid, Box, Typography } from '@material-ui/core';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Tabs from '@bit/muicss.mui.tabs';
import Tab from '@bit/muicss.mui.tab';

import { ExpansionPanelDetails, ExpansionPanelSummary, ExpansionPanel } from '../../../Components/ExpansionPanel';
import Card from '../../../Components/Card';
import PatientRecord from '../../../Components/PatientRecord';
import MultilineInput from '../../../Components/MultilineInput';
import RadioGroup from '../../../Components/RadioGroup';
import WheelPicker from '../../../Components/Input/WheelPicker';
import Dialog from '../../../Components/Dialog';
import Button from '../../../Components/Button';

import fields from '../../../../resources/fileds';

export default ({
    patient,
    onSubmit,
    onCancelEditConsciousness,
    settings,
    // checked,
    edit
}) => {
    const [expanded, setExpanded] = React.useState({ ab: 'ab', c: 'c', de: 'de' });
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded({ ...expanded, [panel]: isExpanded ? panel : false });
        event.target.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'end' });
    };

    const [situation, setSituation] = useState('');
    const [background, setBackground] = useState('');
    const handleChangeSituation = value => setSituation(value);
    const handleChangeBackground = value => setBackground(value);


    const { names, score, nhsNo, device, respirationRate, oxygenSaturation, supplementalO2,
        flowRate, bloodPressure, pulseRate, temperature, consciousness } = patient;
    const { scale } = oxygenSaturation;

    const disableConsiciousness = Boolean(consciousness?.value && edit && edit !== 'consciousness.value');
    const onCancel = () => {
        onCancelEditConsciousness();
        onSubmit();
    };

    return (
        <Grid
            contatiner
            direction="column"
            justify="center"
            alignItems="center"
        >
            <Grid item>
                <Tabs justified defaultSelectedIndex={0}>
                    <Tab label="Identity" >
                        <Box p={2}>
                            <Card
                                headerBackgroundColor='#F2F2F2'
                                backgroundColor='#F2F2F2'
                                title={names}
                                subheader={nhsNo}
                                score={score}
                                content={<PatientRecord expandable record={patient} />
                                }
                            />
                        </Box>
                    </Tab>
                    <Tab label="Situation">
                        <Box p={2}>
                            <Card
                                headerBackgroundColor='#F2F2F2'
                                title={names}
                                subheader={nhsNo}
                                score={score}
                                content={
                                    <MultilineInput
                                        defaultValue={situation}
                                        handleChange={handleChangeSituation}
                                        needHelp
                                        {...fields.situation}
                                    />
                                }
                            />
                        </Box>
                    </Tab>
                    <Tab label='Background'>
                        <Box p={2}>
                            <Card
                                headerBackgroundColor='#F2F2F2'
                                title={names}
                                subheader={nhsNo}
                                score={score}
                                content={
                                    <MultilineInput
                                        defaultValue={background}
                                        handleChange={handleChangeBackground}
                                        needHelp
                                        {...fields.background}
                                    />
                                }
                            />
                        </Box>
                    </Tab>
                </Tabs>
            </Grid>
            <Grid item>
                <Box m={2}>
                    <Divider />
                </Box>
            </Grid>

            {settings.tabs ? (
                <Grid item>
                    <Tabs className='mui-tabs__bar_blue' justified defaultSelectedIndex={0}>
                        <Tab label="A + B" >
                            <Box p={2}>
                                <Grid container wrap="nowrap" direction='column' spacing={2}>
                                    <Grid item md={12} >
                                        <WheelPicker
                                            {...fields.respirationRate}
                                            onSubmit={onSubmit}
                                            defaultValue={respirationRate?.value}
                                            edit={edit}
                                        />
                                    </Grid>
                                    <Grid item md={12}>
                                        <WheelPicker
                                            scale={scale}
                                            device={device?.value}
                                            {...fields.oxygenSaturation}
                                            defaultValue={oxygenSaturation?.value}
                                            onSubmit={onSubmit}
                                            edit={edit}
                                            {...(scale === '2' ?
                                                { ...fields.oxygenSaturationScale2 } : {
                                                    ...fields.oxygenSaturation
                                                })}
                                        />
                                    </Grid>
                                    <Grid item md={12} >
                                        <RadioGroup
                                            {...fields.supplementalO2}
                                            defaultValue={supplementalO2?.value}
                                            disabled={Boolean(supplementalO2)}
                                        />
                                    </Grid>
                                    {supplementalO2?.value === 'yes' && (
                                        <Grid item md={12}>
                                            <WheelPicker
                                                {...fields.flowRate}
                                                defaultValue={flowRate?.value}
                                                edit={edit}
                                                onSubmit={onSubmit}
                                            />
                                        </Grid>
                                    )}
                                </Grid>
                            </Box>
                        </Tab>
                        <Tab label="C">
                            <Box p={2}>
                                <Grid container wrap="nowrap" direction='column' spacing={2}>
                                    <Grid item md={12} >
                                        <WheelPicker
                                            {...fields.bloodPressure}
                                            defaultValue={bloodPressure?.value}
                                            onSubmit={onSubmit}
                                            edit={edit}
                                        />
                                    </Grid>
                                    <Grid item md={12} >
                                        <WheelPicker
                                            {...fields.pulseRate}
                                            onSubmit={onSubmit}
                                            defaultValue={pulseRate?.value}
                                            edit={edit}
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                        </Tab>
                        <Tab label='D + E'>
                            <Box p={2}>
                                <Grid container wrap="nowrap" direction='column' spacing={2}>
                                    <Grid item md={12}>
                                        {edit === fields.consciousness.name ? (
                                            <Dialog
                                                title="Edit Consciousness"
                                                open
                                                bottomActions={
                                                    <Grid
                                                        container
                                                        direction="row"
                                                        justify="flex-end"
                                                        alignItems="flex-end"
                                                        spacing={2}
                                                    >
                                                        <Grid item>
                                                            <Button onClick={onCancel} color="secondary">
                                                                Cancel
                                                </Button>
                                                        </Grid>
                                                        <Grid item>
                                                            <Button
                                                                color="success"
                                                                variant="contained"
                                                                onClick={onSubmit}>
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
                                                        <RadioGroup
                                                            {...fields.consciousness}
                                                            defaultValue={consciousness?.value}
                                                            disabled={disableConsiciousness}
                                                        />
                                                    </Grid>
                                                </Box>
                                            </Dialog>

                                        ) : (
                                                <RadioGroup
                                                    {...fields.consciousness}
                                                    defaultValue={consciousness?.value}
                                                    disabled={disableConsiciousness}
                                                />
                                            )}

                                    </Grid>
                                    <Grid item md={12} >
                                        <WheelPicker
                                            {...fields.temperature}
                                            onSubmit={onSubmit}
                                            defaultValue={temperature?.value}
                                            edit={edit}
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                        </Tab>
                    </Tabs>
                </Grid>

            ) : (

                    <Grid item>
                        <ExpansionPanel expanded={expanded.ab === 'ab'} onChange={handleChange('ab')}>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon style={{ color: '#fff' }} />} >
                                <Typography variant="h6" component="h5">
                                    <Box fontWeight={900}>A + B</Box>
                                </Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Grid container wrap="nowrap" direction='column' spacing={2}>
                                    <Grid item md={12} >
                                        <WheelPicker
                                            {...fields.respirationRate}
                                            onSubmit={onSubmit}
                                            defaultValue={respirationRate?.value}
                                            edit={edit}
                                        />
                                    </Grid>
                                    <Grid item md={12}>
                                        <WheelPicker
                                            scale={scale}
                                            device={device?.value}
                                            {...fields.oxygenSaturation}
                                            defaultValue={oxygenSaturation?.value}
                                            onSubmit={onSubmit}
                                            edit={edit}
                                            {...(scale === '2' ?
                                                { ...fields.oxygenSaturationScale2 } : {
                                                    ...fields.oxygenSaturation
                                                })}
                                        />
                                    </Grid>
                                    <Grid item md={12} >
                                        <RadioGroup
                                            {...fields.supplementalO2}
                                            defaultValue={supplementalO2?.value}
                                            disabled={Boolean(supplementalO2)}
                                        />
                                    </Grid>
                                    {supplementalO2?.value === 'yes' && (
                                        <Grid item md={12}>
                                            <WheelPicker
                                                {...fields.flowRate}
                                                defaultValue={flowRate?.value}
                                                edit={edit}
                                                onSubmit={onSubmit}
                                            />
                                        </Grid>
                                    )}
                                </Grid>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <ExpansionPanel expanded={expanded.c === 'c'} onChange={handleChange('c')}>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon style={{ color: '#fff' }} />}>
                                <Typography variant="h6" component="h5">
                                    <Box fontWeight={900}>C</Box>
                                </Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Grid container wrap="nowrap" direction='column' spacing={2}>
                                    <Grid item md={12} >
                                        <WheelPicker
                                            {...fields.bloodPressure}
                                            defaultValue={bloodPressure?.value}
                                            onSubmit={onSubmit}
                                            edit={edit}
                                        />
                                    </Grid>
                                    <Grid item md={12} >
                                        <WheelPicker
                                            {...fields.pulseRate}
                                            onSubmit={onSubmit}
                                            defaultValue={pulseRate?.value}
                                            edit={edit}
                                        />
                                    </Grid>
                                </Grid>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>

                        <ExpansionPanel expanded={expanded.de === 'de'} onChange={handleChange('de')}>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon style={{ color: '#fff' }} />}>
                                <Typography variant="h6" component="h5">
                                    <Box fontWeight={900}>D + E</Box>
                                </Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Grid container wrap="nowrap" direction='column' spacing={2}>
                                    <Grid item md={12}>
                                        {edit === fields.consciousness.name ? (
                                            <Dialog
                                                title="Edit Consciousness"
                                                open
                                                bottomActions={
                                                    <Grid
                                                        container
                                                        direction="row"
                                                        justify="flex-end"
                                                        alignItems="flex-end"
                                                        spacing={2}
                                                    >
                                                        <Grid item>
                                                            <Button onClick={onCancel} color="secondary">
                                                                Cancel
                                                </Button>
                                                        </Grid>
                                                        <Grid item>
                                                            <Button
                                                                color="success"
                                                                variant="contained"
                                                                onClick={onSubmit}>
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
                                                        <RadioGroup
                                                            {...fields.consciousness}
                                                            defaultValue={consciousness?.value}
                                                            disabled={disableConsiciousness}
                                                        />
                                                    </Grid>
                                                </Box>
                                            </Dialog>

                                        ) : (
                                                <RadioGroup
                                                    {...fields.consciousness}
                                                    defaultValue={consciousness?.value}
                                                    disabled={disableConsiciousness}
                                                />
                                            )}

                                    </Grid>
                                    <Grid item md={12} >
                                        <WheelPicker
                                            {...fields.temperature}
                                            onSubmit={onSubmit}
                                            defaultValue={temperature?.value}
                                            edit={edit}
                                        />
                                    </Grid>
                                </Grid>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </Grid>
                )}
        </Grid>
    );
};
