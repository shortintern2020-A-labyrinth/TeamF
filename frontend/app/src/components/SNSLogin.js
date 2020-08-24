// Editor: Kota Ikehara
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  title:{
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

export default function SNSLogin() {
  const classes = useStyles();

  return (
    <div>
      <Typography variant="h6" className={classes.title}>
        外部アカウントでログインする
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
    </div>
  );
}
