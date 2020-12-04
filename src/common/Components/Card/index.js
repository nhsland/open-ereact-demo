import React, { useState } from "react";
import {
    CardContent,
    CardHeader,
    CardActions,
    Box,
    Grid,
    Typography,
    IconButton,
    Divider
} from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { makeStyles } from "@material-ui/styles";
import clsx from 'clsx';
import ScoreIcon from '../ScoreIcon';
import NewCareEvent from "../Dialog/NewEventCare";

const useStyles = makeStyles(() => ({
    card: props => ({
        width: "100%",
        minHeight: "100%",
        marginBottom: "0.5em",
        display: "inline-block",
        verticalAlign: "top",
        backgroundColor: props.backgroundColor,
        border: '1px solid #666666',
        boxShadow: '10px 11px 7px -7px rgba(102,102,102,0.45);',
        color: '#4D4D4D'

    }),
    roundedCorners: () => ({
        borderRadius: '5px'
    }),
    button: () => ({
        cursor: 'pointer'
    })
}));

const ClickAbleContent = ({ children, onClick }) => {
    const classes = useStyles();
    return onClick ? <div
        onClick={onClick}
        onKeyPress={onClick}
        role="button"
        tabIndex="0"
        className={classes.button}
    >
        {children}
    </div> : children;
};


export default ({
    title,
    subheader,
    taskName,
    content,
    action,
    handleClick,
    headerBackgroundColor = '#fff',
    backgroundColor = '#fff',
    onRedirect,
    patientId,
    roundedCorners,
    score
}) => {
    const classes = useStyles({ backgroundColor });
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleRedirect = (event) => {
        const path = `/${event}/${patientId}`;
        onRedirect(path);
    };
    return (
        <>
            <Box
                className={clsx(classes.card, roundedCorners && classes.roundedCorners)}
            >
                {title && (<Grid container direction='row' style={{ backgroundColor: headerBackgroundColor }}>
                    <Grid item xs={12} sm={9}>
                        <ClickAbleContent
                            onClick={handleClick}>
                            {taskName &&
                                <Box ml={2}>
                                    <Typography
                                        style={{ color: '#4D4D4D' }} variant="h6"
                                        component="h2"
                                    >
                                        <Box fontWeight="fontWeightBold">
                                            {taskName}
                                        </Box>
                                    </Typography>
                                </Box>}

                            <CardHeader
                                disableTypography
                                title={
                                    <Typography
                                        style={{ color: '#4D4D4D' }} variant="h6"
                                        component="h2"
                                    >
                                        <Box fontWeight="fontWeightBold">
                                            {title}
                                        </Box>
                                    </Typography>}
                                subheader={
                                    <Typography
                                        style={{ color: '#4D4D4D' }}
                                        variant="h6"
                                        component="h2"
                                    >
                                        <Box fontWeight="fontWeightBold">
                                            NHS: {subheader}
                                        </Box>
                                    </Typography>
                                } />
                        </ClickAbleContent>
                    </Grid>
                    <Grid item xs={3}>
                        <Box pr={2}>
                            <CardActions>
                                {score && action ? (
                                    <Box display="flex" flexDirection='row'>
                                        <Box p={1} width={2 / 3}>
                                            <ClickAbleContent onClick={handleClick}>
                                                <ScoreIcon score={score} />
                                            </ClickAbleContent>
                                        </Box>
                                        <Divider orientation='vertical' flexItem />
                                        <Box width={1 / 3}>
                                            <IconButton edge={false} onClick={handleOpen}>
                                                <MoreVertIcon />
                                            </IconButton>
                                        </Box>
                                    </Box>
                                ) : (
                                        score &&
                                        <Box display="flex" flexDirection='row'>
                                            <Box p={1} width={3 / 3}>
                                                <ClickAbleContent onClick={handleClick}>
                                                    <ScoreIcon score={score} />
                                                </ClickAbleContent>
                                            </Box>
                                        </Box>
                                    )}

                            </CardActions>
                        </Box>
                    </Grid>
                </Grid >)
                }
                {
                    handleClick ?
                        <ClickAbleContent
                            onClick={handleClick}>
                            <CardContent >
                                {content}
                            </CardContent>
                        </ClickAbleContent>
                        :
                        <CardContent >
                            {content}
                        </CardContent>
                }
            </Box >
            <NewCareEvent title={title} open={open} handleClose={handleClose} onRedirect={handleRedirect} />
        </>
    );
};
