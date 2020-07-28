import React from "react";
import { Box, Typography } from "@material-ui/core";
import { formatAge, formatDate, formatTime, howManyDays } from '../../../utils/formatters';

export default ({ label, children, type = 'standard', days }) => (
    <Typography variant="subtitle1" component="div" noWrap>
        <Box component="div" display="inline" fontWeight="fontWeightBold">
            {label}:
        </Box>
        <Box component="div" display="inline" fontWeight="fontWeightRegular">
            {({
                'date': ` ${formatDate(children)}`,
                'time': ` ${formatTime(children)}`,
                'dob': ` ${formatDate(children)} ${formatAge(children)}`,
                'standard': ` ${children}`
            }[type])}{days && ` (${howManyDays(children)} days)`}
        </Box>
    </Typography>
);
