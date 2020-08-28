// Author: Satoshi Moro
import React from 'react';
import { Container, Typography, Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import UserIcon from './UserIcon';

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

export default function Comment({ body, likes, user_name, created_date }) {
    const classes = useStyles();

    return (
        <Card className={classes.root} variant="outlined">
            <div className={classes.info}>
                <UserIcon name={user_name} />
                <Typography className={classes.date}>{created_date ? created_date : "コメント日"}</Typography>
            </div>
            <Container className={classes.comment}>
                <Typography>{body ? body : "コメント"}</Typography>
            </Container>
        </Card>
    );
}