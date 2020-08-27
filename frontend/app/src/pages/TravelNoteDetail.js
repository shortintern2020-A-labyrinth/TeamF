// Editor: Satoshi Moro
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, Typography, Box, Container, TextField } from '@material-ui/core';
import RoomIcon from '@material-ui/icons/Room';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import Memory from '../components/Memory';
import NoImage from '../assets/images/no_image.png';
import { useParams, useHistory, Link } from 'react-router-dom';
import User from './User';
import Comment from '../components/Comment';

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
    comment: {
        width: '40vw',
    },
    commentButton: {
        marginTop: theme.spacing(2),

    }
}));

export default function TravelNoteDetail(props) {
    const classes = useStyles();
    const { travel_note_id } = useParams();
    const [memories, setMemories] = useState([]);
    const [comments, setComments] = useState([]);
    const { title, start_date, end_date, country, city, image } = props.location.state.travelNote;

    const [commentInput, setCommentInput] = useState('');
    const [reloading, setReloading] = useState(false);

    const isLoggedIn = User.getLocalStorage("isLoggedIn");
    const history = useHistory();



    async function postData(endpoint = "", params = {}) {
        const url = "http://localhost:4000" + endpoint;

        const token = User.getLocalStorage("token");

        if (!token) {
            history.push("/Login");
        }

        const response = await fetch(url, {
            method: "POST",
            mode: "cors",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(params),
        });

        if (response.status === 401) {
            history.push("/Login");
        }

        return response.json();
    }

    useEffect(() => {
        get(`http://localhost:4000/travel_note/${travel_note_id}/comments`)
            .then(res => {
                setComments(res.comments);
            })
            .catch(e => {
                console.error(e);
            });
    }, [reloading, travel_note_id]);

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
                            <Typography>usernameを入れる</Typography>
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
                </Container>
                <Box m={6}>
                    <Container maxWidth="md">
                        {isLoggedIn !== "false" ?
                            <div>
                                <div className={classes.form}>
                                    <form>
                                        <TextField
                                            className={classes.comment}
                                            id="outlined-multiline-static"
                                            name="comment"
                                            label="コメント"
                                            multiline
                                            rows={4}
                                            variant="outlined"
                                            value={commentInput}
                                            onChange={(e) => setCommentInput(e.target.value)}
                                        />
                                    </form>
                                </div>
                                <Button
                                    className={classes.commentButton}
                                    variant="contained"
                                    color="primary"
                                    onClick={() => {
                                        if (commentInput === "") {
                                            return;
                                        }
                                        postData(`/travel_note/${travel_note_id}/comment/create`, {
                                            travel_note_id,
                                            body: commentInput,
                                        }).then((res) => {
                                            setReloading(!reloading);
                                            setCommentInput("");
                                        });
                                    }}
                                >
                                    投稿
                            </Button>
                            </div> :
                            <Button
                                className={classes.commentButton}
                                variant="contained"
                                color="primary"
                                component={Link}
                                to="/Login"
                            >
                                ログインしてコメントする
                            </Button>
                        }
                        {comments.map(comment => <Comment key={comment.id} {...comment} />)}
                    </Container>
                </Box>
            </Box>
        </>
    );
}
