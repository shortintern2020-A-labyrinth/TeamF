import React, { Component } from 'react';
import ToDoListItem from "./ToDoListItem.js"
import { makeStyles } from '@material-ui/core/styles';
import BasicTextFields from '../components/CreateForm';


const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
}));



class ListShow extends Component {


  // ToDoListをstateに定義、初期値は []
  

  render() {
    return (
      <BasicTextFields/>
    )}
}

export default ListShow;
