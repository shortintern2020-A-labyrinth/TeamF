import React from "react";
import "./CreateForm.css";
import "./ToDoListItem.css";
import { makeStyles } from "@material-ui/core/styles";
import ToDoListItem from "./ToDoListItem.js";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import Button from "@material-ui/core/Button";
import { Card, Grid, Typography } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import NoImage from "../assets/images/no_image.png";

const useStyles = makeStyles((theme) => ({
  // root: {
  //   "& > *": {
  //     margin: theme.spacing(1),
  //     width: "50ch",
  //   },
  //   formControl: {
  //     margin: theme.spacing(5),
  //     minWidth: 120,
  //   },
  //   selectEmpty: {
  //     marginTop: theme.spacing(2),
  //   },
  //   container: {
  //     display: "flex",
  //     flexWrap: "wrap",
  //   },
  //   textField: {
  //     marginLeft: theme.spacing(1),
  //     marginRight: theme.spacing(1),
  //     width: 200,
  //   },
  //   margin: {
  //     margin: theme.spacing(1),
  //   },
  //   extendedIcon: {
  //     marginRight: theme.spacing(1),
  //   },
  //   paper: {
  //     margin: theme.spacing(1),
  //   },
  //   svg: {
  //     width: 100,
  //     height: 100,
  //   },
  //   polygon: {
  //     fill: theme.palette.common.white,
  //     stroke: theme.palette.divider,
  //     strokeWidth: 1,
  //   },

  //   chips: {
  //     display: "flex",
  //     flexWrap: "wrap",
  //   },
  //   chip: {
  //     margin: 2,
  //   },
  //   noLabel: {
  //     marginTop: theme.spacing(3),
  //   },
  // },
  container: {
    "& > *": {
      margin: theme.spacing(1),
      width: "100%",
    },
    width: "50%",
    display: "flex",
  },
  outer: {
    border: "solid 1px",
    borderColor: "black",
    width: "90%",
  },
  card: {
    "& > *": {
      margin: theme.spacing(1),
    },
    display: "flex",
    flexDirection: "column",
    minHeight: "30vh",
  },
  textField: {
    width: "80%",
  },
  imageContainer: {
    margin: theme.spacing(2),
  },
  image: {
    width: "100%",
  },
  location: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  spacing: {
    marginLeft: theme.spacing(4),
  },
}));

export default function MemoryForm(props) {
  const classes = useStyles();

  const [place, setPlace] = React.useState("");
  const [lat, setLat] = React.useState(null);
  const [lng, setLng] = React.useState(null);
  const [images, setImages] = React.useState([]);
  const [description, setDescription] = React.useState("");

  return (
    <div className={classes.container}>
      <Card className={classes.card}>
        <Grid container>
          <Grid container item xs={4} direction="column" className={classes.spacing}>
            <Grid item>
              <img className={classes.image} src={NoImage} alt="travel top" />
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary">
                Upload
              </Button>
            </Grid>
          </Grid>
          <Grid container item xs={7} justify="center" alignItems="center">
            <Grid item xs={12}>
              <TextField
                label="施設・場所名"
                variant="outlined"
                value={place}
                className={classes.textField}
                onChange={(e) => {
                  const newPlace = e.target.value;
                  setPlace(newPlace);
                  props.handleMemory("place", newPlace);
                }}
              />
            </Grid>
            {/* </form> */}
            {/* <div className={classes.container}>
          <form className={classes.root} noValidate autoComplete="off"> */}
            <Grid item xs={12}>
              <TextField
                id="outlined-basic"
                label="概要"
                variant="outlined"
                multiline
                rows={6}
                className={classes.textField}
                value={description}
                onChange={(e) => {
                  const newDescription = e.target.value;
                  setDescription(newDescription);
                  props.handleMemory("description", newDescription);
                }}
              />
            </Grid>
            {/* </form>
        </div> */}
            {/* <div className={classes.container}>
          <div className="ToDoListItem-description">{description}</div>
        </div> */}
            {/* todoList配列の要素数分ToDoListItemコンポーネントを展開
          {this.state.todoList.map(todo => (
            <ToDoListItem
              key={todo.title}
              title={todo.title}
              description={todo.description}
            />
          ))} */}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <IconButton
            className={classes.removeButton}
            variant="contained"
            color="primary"
            onClick={props.onClick}
          >
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Card>
    </div>
  );
}
