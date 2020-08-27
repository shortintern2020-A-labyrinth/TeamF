// Author: Satoshi Moro
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Avatar, Typography } from '@material-ui/core';
import FlagIcon from '@material-ui/icons/Flag';
import NoImage from '../assets/images/no_image.png';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        marginTop: theme.spacing(4),
        padding: theme.spacing(2),
        justifyContent: 'space-between',
        height: '30vh',
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '40%',
    },
    icon: {
        width: '20%',
        margin: 'auto 0',
        marginLeft: theme.spacing(4),
    },
    image: {
        width: '30%',
    },
}));

export default function Memory({ place, images, description, lat, lng }) {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <div className={classes.icon}>
                <Avatar>
                    <FlagIcon />
                </Avatar>
            </div>
            <div className={classes.content}>
                <Typography variant="h6" color="primary">{place ? place : "場所名"}</Typography>
                <Typography>{description ? description : "説明"}</Typography>
            </div>
            <img className={classes.image} src={images[0] ? images[0] : NoImage} alt="memory" />
        </Card>
    );
};