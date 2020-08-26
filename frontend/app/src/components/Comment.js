// Author: Satoshi Moro
import React from 'react';
import { Container, Typography, Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import UserIcon from '../components/UserIcon';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(4),
    },
    info: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginTop: theme.spacing(4),
    },
    date: {
        marginRight: theme.spacing(4),
    },
    comment: {
        margin: theme.spacing(4),
    },
}));

export default function Comment({ comment, name, src, date }) {
    const classes = useStyles();

    return (
        <Card className={classes.root} variant="outlined">
            <div className={classes.info}>
                <UserIcon name="tanaka" />
                <Typography className={classes.date}>2020/11/20 18:69</Typography>
            </div>
            <Container className={classes.comment}>
                <Typography>コメント</Typography>
            </Container>
        </Card>
    );
}