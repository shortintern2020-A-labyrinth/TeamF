// Author: Kota Ikehara
import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import SNSLogin from '../components/SNSLogin';
import User from './User';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 5),
  },
  link: {
    textDecoration: 'none',
  },
}));

export default function Login(props) {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const doSignin = async (e) => {
    e.preventDefault();
    await User.signin(email, password);
      if(localStorage.getItem('isLoggedIn') === 'true'){
        props.screenProps.setLoginStatus(true);
        props.screenProps.history.push({ pathname: '/' });
      }
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <ExitToAppIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          ログイン
        </Typography>
        <form className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="メールアドレス"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="パスワード"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e) => doSignin(e)}
          >
            ログイン
          </Button>
          <div>
            {/* TODO: Add reset password link */}
            <Link to="/" className={classes.link}>
              パスワードをお忘れですか？
            </Link>
          </div>
          <div>
            <Link to="/Signup" className={classes.link}>
              アカウントをお持ちでない方はこちら
            </Link>
          </div>
        </form>
        <SNSLogin />
      </div>
    </Container>
  );
}

export { useStyles };
