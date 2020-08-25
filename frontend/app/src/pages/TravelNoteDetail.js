// Editor: Satoshi Moro
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Avatar, Grid, Typography, Box, Container } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import RoomIcon from '@material-ui/icons/Room';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import Memory from '../components/Memory';
import NoImage from '../assets/images/no_image.png';

const useStyles = makeStyles((theme) => ({
    abstract: {
        display: 'flex',
    },
    date: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    like: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '30%',
    },
    location: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    user: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    topImage: {
        width: '40vh',
        height: '40vh',
        marginTop: theme.spacing(4),
    },
    spacing: {
        marginLeft: theme.spacing(1),
    },
    share: {
        marginTop: theme.spacing(3),
    },
    buttonTwitter: {
        backgroundColor: '#1DA1F2',
        margin: theme.spacing(2),
    },
    buttonInstagram: {
        backgroundColor: '#E1306C',
        margin: theme.spacing(2),
    },
}));

const memories = [
    {
        id: 1,
    },
    {
        id: 2,
    },
    {
        id: 3,
    }
];

export default function TravelNoteDetail() {
    const classes = useStyles();

    return (
        <>
            <img className={classes.topImage} src={NoImage} alt="travel top" />
            <Box mt={5}>
                <Container className={classes.abstract} maxWidth="md">
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography
                                variant="h4"
                                align="left"
                            >
                                旅行に行きました
                        </Typography>
                        </Grid>
                        <Grid item xs={4} className={classes.date}>
                            <CalendarTodayIcon />
                            <Typography className={classes.spacing}>2020/2/19~2020/2/22</Typography>
                        </Grid>
                        <Grid item xs={4} className={classes.location}>
                            <RoomIcon />
                            <Typography className={classes.spacing}>千葉県千葉市</Typography>
                        </Grid>
                        <Grid item xs={4} className={classes.user}>
                            <Avatar>H</Avatar>
                            <Typography className={classes.spacing}>takahashi</Typography>
                        </Grid>
                    </Grid>
                    <div className={classes.like}>
                        <FavoriteIcon color="secondary" fontSize="large" />
                        <span>11</span>
                    </div>
                </Container>
                <Container className={classes.content} maxWidth="md">
                    {memories.map(memory => (
                        <Memory key={memory.id} />
                    ))}
                    <Typography variant="h6" className={classes.share}>
                        外部アカウントでシェアする
                        </Typography>
                    {/* TODO: Add OAuth function */}
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.buttonTwitter}
                    >
                        <TwitterIcon color="default" />
                    </Button>
                    {/* TODO: Add OAuth function */}
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.buttonInstagram}
                    >
                        <InstagramIcon />
                    </Button>
                </Container>
            </Box>
        </>
    );
}
