// Author: Satoshi Moro
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Avatar, Grid, Typography, Box, Container } from '@material-ui/core';
import FlagIcon from '@material-ui/icons/Flag';
import NoImage from '../assets/images/no_image.png';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        marginTop: theme.spacing(4),
        padding: theme.spacing(2),
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '40%',
    },
    icon: {
        width: '20%',
        margin: 'auto 0',
        marginLeft: theme.spacing(2),
    },
    image: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '40%',
    },
}));

export default function Memory() {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <div className={classes.icon}>
                <Avatar>
                    <FlagIcon />
                </Avatar>
            </div>
            <div className={classes.content}>
                <Typography variant="h6" color="primary">ディズニーランド</Typography>
                <Typography>綺麗で楽しかった</Typography>
            </div>
            <img className={classes.image} src={NoImage} alt="memory" />
        </Card>
    );
};