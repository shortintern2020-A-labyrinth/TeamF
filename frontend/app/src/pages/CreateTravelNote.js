//Written by Lisa Shinoda
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import CreateForm from '../components/CreateForm';
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
    margin: {
        margin: theme.spacing(1),
      },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
    paper: {
        margin: theme.spacing(1),
    },
    svg: {
        width: 100,
        height: 100,
    },
    polygon: {
        fill: theme.palette.common.white,
        stroke: theme.palette.divider,
        strokeWidth: 1,
    },
   
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
    noLabel: {
        marginTop: theme.spacing(3),
    },
  },
}));

export default function BasicTextFields() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    country: '',
    name: 'hai',
  });

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };
  
  const [checked, setChecked] = React.useState(false);
  



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
                <option value={20}>グアム・サイパン</option>
                <option value={30}>ハワイ</option>
                <option value={40}>アメリカ</option>
                <option value={50}>カナダ</option>
                <option value={60}>中国</option>
                <option value={70}>タイ</option>
                <option value={80}>ベトナム</option>
                <option value={80}>オーストラリア</option>
                <option value={90}>イタリア</option>
                <option value={100}>フランス</option>
                <option value={110}>イギリス</option>
                </NativeSelect>
            </FormControl>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField id="standard-basic" label="都市名" />
            </form>
            
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
        <h2>思い出の追加</h2>

        <CreateForm/>
        <div className={classes.root}>
            <Button variant="contained" color="primary">
                投稿
            </Button>
        </div>
            
    </div>
    
  );
}