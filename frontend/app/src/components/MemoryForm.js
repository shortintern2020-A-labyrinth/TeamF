import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Card, Grid } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import NoImage from "../assets/images/no_image.png";

const useStyles = makeStyles((theme) => ({
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
  hiddenInput: {
    display: "none",
  },
}));

export default function MemoryForm(props) {
  const classes = useStyles();

  const [place, setPlace] = React.useState("");
  // const [lat, setLat] = React.useState(null);
  // const [lng, setLng] = React.useState(null);
  const [images, setImages] = React.useState([]);
  const [description, setDescription] = React.useState("");
  const ref = React.createRef();

  const uploadImage = () => {
    const input = ref.current;
    input.click();
  };

  const loadImage = (e) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target.result;
      const newImages= [result];
      setImages(newImages);
      props.handleMemory("images", newImages);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div className={classes.container}>
      <Card className={classes.card}>
        <Grid container>
          <Grid
            container
            item
            xs={4}
            direction="column"
            className={classes.spacing}
          >
            <Grid item>
              <img className={classes.image} src={images.length !== 0 ? images[0] : NoImage} alt="travel top" />
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" onClick={uploadImage}>
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
      <input
        type="file"
        className={classes.hiddenInput}
        ref={ref}
        accept="image/png,image/jpeg"
        onChange={(e) => loadImage(e)}
      />
    </div>
  );
}
