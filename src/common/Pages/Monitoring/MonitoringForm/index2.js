/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { Divider, Grid, Box } from '@material-ui/core';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Tabs from '@bit/muicss.mui.tabs';
import Tab from '@bit/muicss.mui.tab';

import Typography from '@material-ui/core/Typography';
import { ExpansionPanelDetails, ExpansionPanelSummary, ExpansionPanel } from '../../../Components/ExpansionPanel';

import Card from '../../../Components/Card';
import PatientRecord from '../../../Components/PatientRecord';
import MultilineInput from '../../../Components/MultilineInput';
import RadioGroup from '../../../Components/RadioGroup';
import FullScreenInput from '../../../Components/FullScreenInput';
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
                            <Grid container wrap="nowrap" direction='column' spacing={2}>
                                <Grid item md={12} >
                                    <FullScreenInput
                                        onSubmit={onSubmit}
                                        name="ab.respirationRate.value"
                                        {...fields.respirationRate}
                                        defaultValue={respirationRate?.value}
                                        edit={edit} />
                                </Grid>
                                <Grid item md={12}>
                                    <FullScreenInput
                                        scale={scale}
                                        onSubmit={onSubmit}
                                        device={device?.value}
                                        {...fields.oxygenSaturation}
                                        defaultValue={oxygenSaturation?.value}
                                        edit={edit}
                                        {...(scale === '2' ?
                                            { ...fields.oxygenSaturation } : {
                                                ...fields.oxygenSaturationScale2
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
                                {supplementalO2 && (
                                    <Grid item md={12}>
                                        <FullScreenInput
                                            onSubmit={onSubmit}
                                            {...fields.flowRate}
                                            defaultValue={flowRate?.value}
                                            edit={edit}
                                        />
                                    </Grid>
                                )}
                            </Grid>
                        </Tab>
                        <Tab label='C'>
                            <Grid container wrap="nowrap" direction='column' spacing={2}>
                                <Grid item md={12} >
                                    <FullScreenInput
                                        onSubmit={onSubmit}
                                        {...fields.bloodPressure}
                                        defaultValue={bloodPressure?.value}
                                        edit={edit}
                                    />
                                </Grid>
                                <Grid item md={12} >
                                    <FullScreenInput
                                        onSubmit={onSubmit}
                                        {...fields.pulseRate}
                                        defaultValue={pulseRate?.value}
                                        edit={edit}
                                    />
                                </Grid>
                            </Grid>
                        </Tab>
                        <Tab label='D + E'>
                            <Grid container wrap="nowrap" direction='column' spacing={2}>
                                <Grid item md={12}>
                                    {edit === fields.consciousness.name ? (
                                        <Dialog
                                            title="Edit Consciousness"
                                            open
                                            fullScreen
                                            handleClose={onCancel}
                                            close
                                        >
                                            {/* <Box width={600} mb={4} pb={2} pt={2}>
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
                                        </Box> */}




                                            <Grid
                                                container
                                                direction="column"
                                                justify="center"
                                                alignItems="center"
                                                spacing={8}
                                            >

                                                <Grid item>
                                                    <RadioGroup
                                                        {...fields.consciousness}
                                                        defaultValue={consciousness?.value}
                                                        disabled={disableConsiciousness}
                                                    />
                                                </Grid>
                                                <Grid item>
                                                    <Box m={4}>
                                                        <Button
                                                            color="success"
                                                            variant="contained"
                                                            onClick={onSubmit}
                                                        >
                                                            Confirm Cconsciousness
                                                        </Button>
                                                    </Box>
                                                </Grid>
                                            </Grid>
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
                                    <FullScreenInput
                                        onSubmit={onSubmit}
                                        {...fields.temperature}
                                        defaultValue={temperature?.value}
                                        edit={edit}
                                    />
                                </Grid>
                            </Grid>
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
                                        <FullScreenInput
                                            onSubmit={onSubmit}
                                            name="ab.respirationRate.value"
                                            {...fields.respirationRate}
                                            defaultValue={respirationRate?.value}
                                            edit={edit} />
                                    </Grid>
                                    <Grid item md={12}>
                                        <FullScreenInput
                                            scale={scale}
                                            onSubmit={onSubmit}
                                            device={device?.value}
                                            {...fields.oxygenSaturation}
                                            defaultValue={oxygenSaturation?.value}
                                            edit={edit}
                                            {...(scale === '2' ?
                                                { ...fields.oxygenSaturation } : {
                                                    ...fields.oxygenSaturationScale2
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
                                    {supplementalO2 && (
                                        <Grid item md={12}>
                                            <FullScreenInput
                                                onSubmit={onSubmit}
                                                {...fields.flowRate}
                                                defaultValue={flowRate?.value}
                                                edit={edit}
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
                                        <FullScreenInput
                                            onSubmit={onSubmit}
                                            {...fields.bloodPressure}
                                            defaultValue={bloodPressure?.value}
                                            edit={edit}
                                        />
                                    </Grid>
                                    <Grid item md={12} >
                                        <FullScreenInput
                                            onSubmit={onSubmit}
                                            {...fields.pulseRate}
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
                                                fullScreen
                                                handleClose={onCancel}
                                                close
                                            >
                                                {/* <Box width={600} mb={4} pb={2} pt={2}>
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
                                        </Box> */}




                                                <Grid
                                                    container
                                                    direction="column"
                                                    justify="center"
                                                    alignItems="center"
                                                    spacing={8}
                                                >

                                                    <Grid item>
                                                        <RadioGroup
                                                            {...fields.consciousness}
                                                            defaultValue={consciousness?.value}
                                                            disabled={disableConsiciousness}
                                                        />
                                                    </Grid>
                                                    <Grid item>
                                                        <Box m={4}>
                                                            <Button
                                                                color="success"
                                                                variant="contained"
                                                                onClick={onSubmit}
                                                            >
                                                                Confirm Cconsciousness
                                                        </Button>
                                                        </Box>
                                                    </Grid>
                                                </Grid>
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
                                        <FullScreenInput
                                            onSubmit={onSubmit}
                                            {...fields.temperature}
                                            defaultValue={temperature?.value}
                                            edit={edit}
                                        />
                                    </Grid>
                                </Grid>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </Grid >
                )
            }
        </Grid >
    );
};
