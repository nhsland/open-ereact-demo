import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles(() => ({
    root: ({ color }) => ({
        color,
        backgroundColor: 'transparent',
        borderColor: color,
        borderStyle: 'solid',
    })
}));

export default ({ name, color = '#fff' }) => {
    const classes = useStyles({ color });
    const { first, surname } = name;
    return (
        <Avatar className={classes.root}>{first[0]}{surname[0]}</Avatar>
    );
};
