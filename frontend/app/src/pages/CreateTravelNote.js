//Written by Lisa Shinoda
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';

import FormControl from '@material-ui/core/FormControl';

import NativeSelect from '@material-ui/core/NativeSelect
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
        margin: theme.spacing(1),
        width: '50ch',
    },
    formControl: {
        margin: theme.spacing(5),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
  },
}));

export default function BasicTextFields() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    age: '',
    name: 'hai',
  });

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  return (
    <div>
        <h2>旅行記の作成</h2>
        <form className={classes.root} noValidate autoComplete="off">
            <TextField id="outlined-basic" label="タイトル" variant="outlined" />
        </form>
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel shrink htmlFor="age-native-label-placeholder">
                国名
                </InputLabel>
                <NativeSelect
                value={state.age}
                onChange={handleChange}
                inputProps={{
                    name: 'age',
                    id: 'age-native-label-placeholder',
                }}
                >
                <option value="">None</option>
                <option value={10}>日本</option>
                <option value={20}>イギリス</option>
                <option value={30}>ハワイ</option>
                </NativeSelect>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel shrink htmlFor="age-native-label-placeholder">
                都市名
                </InputLabel>
                <NativeSelect
                value={state.age}
                onChange={handleChange}
                inputProps={{
                    name: 'age',
                    id: 'age-native-label-placeholder',
                }}
                >
                <option value="">None</option>
                <option value={10}>東京</option>
                <option value={20}>大阪</option>
                <option value={30}>名古屋</option>
                </NativeSelect>
            </FormControl>
            <form className={classes.container} noValidate>
                <TextField
                    id="date"
                    label="出発日"
                    type="date"
                    defaultValue="2017-05-24"
                    className={classes.textField}
                    InputLabelProps={{
                    shrink: true,
                    }}
                />
                <TextField
                    id="date"
                    label="帰宅日"
                    type="date"
                    defaultValue="2017-05-24"
                    className={classes.textField}
                    InputLabelProps={{
                    shrink: true,
                    }}
                />
            </form>
        </div>
        <form className={classes.root} noValidate autoComplete="off">
            <TextField id="outlined-basic" label="概要" variant="outlined" multiline　rows={6}/>
        </form>
        <h2>思い出の編集</h2>
        <form className={classes.root} noValidate autoComplete="off">
            <TextField id="outlined-basic" label="施設・場所名" variant="outlined" />
        </form>
        <form className={classes.root} noValidate autoComplete="off">
            <TextField id="outlined-basic" label="概要" variant="outlined" multiline　rows={6} />
        </form>
        <div className={classes.root}>
            <Button variant="contained" color="primary">
                投稿
            </Button>
        </div>
    </div>
    
  );
}