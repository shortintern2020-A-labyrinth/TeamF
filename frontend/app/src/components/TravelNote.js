// Editor: Satoshi Moro
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Grid, Typography } from '@material-ui/core';
import NoImage from '../assets/images/no_image.png';
import FavoriteIcon from '@material-ui/icons/Favorite';
import RoomIcon from '@material-ui/icons/Room';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(4),
    },
    card: {
        display: 'flex',
    },
    image: {
        width: '30%',
        margin: theme.spacing(2),
    },
    like: {
        display: 'flex',
    },
    location: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
}));

export default function TravelNote({ title, description, image, country, city, likeNumber, userName }) {
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
                    <Grid item xs={2} className={classes.like} >
                        <FavoriteIcon color="secondary" />
                        <span>{likeNumber ? likeNumber : 'いいね数'}</span>
                    </Grid>
                    <Grid item xs={8} className={classes.location}>
                        <RoomIcon />
                        <Typography variant="body2">{country && city ? `${country} ${city}` : "国名都市名"}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="body2">{userName ? userName : 'ユーザ名'}</Typography>
                    </Grid>
                </Grid>
            </Card>
        </div>
    );
};