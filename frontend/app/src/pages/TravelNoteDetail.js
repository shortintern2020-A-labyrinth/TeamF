// Editor: Satoshi Moro
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Avatar, Grid, Typography, Box, Container, TextField } from '@material-ui/core';
import RoomIcon from '@material-ui/icons/Room';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import Memory from '../components/Memory';
import NoImage from '../assets/images/no_image.png';
import CommentList from '../components/CommentList';
import UserIcon from '../components/UserIcon';
import { useParams } from 'react-router-dom';
import { get } from './ListTravelNotes';

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
    form: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%'
    },
}));

export default function TravelNoteDetail(props) {
    const classes = useStyles();
    const { travel_note_id } = useParams();
    const [memories, setMemories] = useState([]);
    const { title, start_date, end_date, country, city, image } = props.location.state.travelNote;

    useEffect(() => {
        get(`http://localhost:4000/travel_note/${travel_note_id}`)
            .then(res => {
                setMemories(res);
            })
            .catch(e => {
                console.error(e);
            });
    }, [travel_note_id]);

    return (
        <>
            <img className={classes.topImage} src={image ? image : NoImage} alt="travel top" />
            <Box mt={5}>
                <Container className={classes.abstract} maxWidth="md">
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography
                                variant="h4"
                                align="left"
                            >
                                {title ? title : "タイトル"}
                            </Typography>
                        </Grid>
                        <Grid item xs={4} className={classes.date}>
                            <CalendarTodayIcon />
                            <Typography className={classes.spacing}>{start_date && end_date ? `${start_date} ~ ${end_date}` : "start end"}</Typography>
                        </Grid>
                        <Grid item xs={4} className={classes.location}>
                            <RoomIcon />
                            <Typography className={classes.spacing}>{country && city ? `${country} ${city}` : "国名 都市名"}</Typography>
                        </Grid>
                        <Grid item xs={4} className={classes.user}>
                            <UserIcon name={""} />
                        </Grid>
                    </Grid>
                </Container>
                <Container className={classes.content} maxWidth="md">
                    {memories.map((memory, index) => {
                        return (
                            <Memory
                                key={index}
                                {...memory}
                            />
                        );
                    })}
                    <Typography variant="h6" className={classes.share}>
                        外部アカウントでシェアする
                        </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.buttonTwitter}
                    >
                        <TwitterIcon />
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.buttonInstagram}
                    >
                        <InstagramIcon />
                    </Button>
                </Container>
                <Box mt={5}>
                    <Container maxWidth="md">
                        <div className={classes.form}>
                            <Avatar >H</Avatar>
                            <TextField
                                className={classes.spacing}
                                id="outlined-multiline-static"
                                label="Comment here."
                                multiline
                                rows={4}
                                variant="outlined"
                            />
                        </div>
                        <CommentList />
                    </Container>
                </Box>
            </Box>
        </>
    );
}
