// Author: Satoshi Moro
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Grid, Typography } from '@material-ui/core';
import NoImage from '../assets/images/no_image.png';
import FavoriteIcon from '@material-ui/icons/Favorite';
import RoomIcon from '@material-ui/icons/Room';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '15px',
    },
    card: {
        display: 'flex',
    },
    image: {
        width: '30%',
        padding: '10px',
    },
    like: {
        display: 'flex',
    },
}));

export default function TravelNote({ title, description, place, likeNumber, userName }) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Card className={classes.card} m={2}>
                <img className={classes.image} src={NoImage} />
                <Grid container justify="center" alignItems="center">
                    <Grid item xs={12}>
                        <Typography component="div">{title ? title : 'タイトル'}</Typography>
                    </Grid>
                    <Grid item xs={10}>
                        <p>{description ? description : '説明'}</p>
                    </Grid>
                    <Grid item xs={2} className={classes.like} >
                        <FavoriteIcon />
                        <span>{likeNumber ? likeNumber : 'いいね数'}</span>
                    </Grid>
                    <Grid item xs={4}>
                        <RoomIcon />
                    </Grid>
                    <Grid item xs={4}>
                        <p>{place ? place : '場所'}</p>
                    </Grid>
                    <Grid item xs={4}>
                        <p>{userName ? userName : 'ユーザ名'}</p>
                    </Grid>
                </Grid>
            </Card>
        </div>
    );
};