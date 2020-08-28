// Author: Satoshi Moro
import React from 'react';
import { Avatar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircleTwoToneIcon from '@material-ui/icons/AccountCircleTwoTone';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: theme.spacing(4),
    },
    spacing: {
        marginLeft: theme.spacing(1),
    }
}));

export default function UserIcon({ src, name }) {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <AccountCircleTwoToneIcon />
            <Typography className={classes.spacing}>{name ? name : "name"}</Typography>
        </div>
    );
};