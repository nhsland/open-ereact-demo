import React from "react";
import { Box } from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

const patientStateArrow = description =>
    ({
        worse: <ArrowDownwardIcon />,
        better: <ArrowUpwardIcon />,
        same: <ArrowBackIcon />
    }[description]);

const mapCircleColors = score => {
    if (score >= 7) {
        return "#F40013";
    }
    if (score < 0) {
        return "#fbf184";
    }
    return ({
        "6": "#FBC384",
        "5": "#FBC384",
        "4": "#2E7D32",
        "3": "#2E7D32",
        "2": "#2E7D32",
        "1": "#2E7D32",
        "0": "#2E7D32"
    }[score]);
};

const mapScoreColors = score => {
    if ((score >= 0 && score <= 4) || (score >= 7)) {
        return '#fff';
    }
    return '#000';
};

const mapCirleParametrColor = score => {
    if (score >= 7) {
        return "#F40013";
    }
    return ({
        "3": "#F40013",
        "2": "#FBC384",
        "1": "#fbf184",
    }[score]);
};


const mapScoreParametrColor = score => score === 3 ? '#fff' : '#000';

const useStyles = (backgroundColor, color, double) => ({
    outside: {
        display: "inline-block",
        lineHeight: "0px",
        borderRadius: "50%",
        backgroundColor,
        fontSize: "25px"
    },
    inside: {
        display: "inline-block",
        paddingTop: "50%",
        paddingBottom: "50%",
        color,
        marginLeft: double ? "6px" : "12px",
        marginRight: double ? "6px" : "12px"
    }
});

export default ({ score, isParametr }) => {
    const { ammount, description } = score;
    const circleColor = isParametr ? mapCirleParametrColor(ammount) : mapCircleColors(ammount);
    const scoreColor = isParametr ? mapScoreParametrColor(ammount) : mapScoreColors(ammount);
    const double = ammount.toString().length === 2;
    const classes = useStyles(
        circleColor,
        scoreColor,
        double);
    return (
        <div style={{ width: '100%' }}>
            <Box
                display="flex"
                flexWrap="nowrap"
                alignItems="center"
            >
                <Box width={1 / 2}>
                    {patientStateArrow(description)}
                </Box>
                <Box >
                    <span style={classes.outside}>
                        <span style={classes.inside}>{Math.abs(score.ammount)}</span>
                    </span>
                </Box>
            </Box>
        </div>
    );
};
