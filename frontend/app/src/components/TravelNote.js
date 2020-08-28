// Editor: Satoshi Moro
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Grid, Typography } from '@material-ui/core';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import NoImage from '../assets/images/no_image.png';
import RoomIcon from '@material-ui/icons/Room';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(4),
    },
    card: {
        display: 'flex',
        height: '30vh'
    },
    image: {
        width: '40%',
        margin: theme.spacing(2),
    },
    location: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    spacing: {
        marginRight: theme.spacing(4),
        marginLeft: theme.spacing(1),
    }
}));

export default function TravelNote({ title, description, image, country, city, start_date, end_date }) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Card className={classes.card} m={2}>
                <img className={classes.image} src={image ? image : NoImage} alt="travel top" />
                <Grid container justify="center" alignItems="center">
                    <Grid item xs={12}>
                        <Typography variant='h6'>{title ? title : 'タイトル'}</Typography>
                    </Grid>
                    <Grid item xs={10}>
                        <Typography>{description ? description : '説明'}</Typography>
                    </Grid>
                    <Grid item xs={8} className={classes.location}>
                        <RoomIcon />
                        <Typography variant="body2" className={classes.spacing}>{country && city ? `${country} ${city}` : "国名 都市名"}</Typography>
                        <CalendarTodayIcon />
                        <Typography variant="body2" className={classes.spacing}>{start_date && end_date ? `${start_date} ~ ${end_date}` : "start end"}</Typography>
                    </Grid>
                </Grid>
            </Card>
        </div>
    );
};