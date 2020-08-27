//Written by Lisa Shinoda
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import MemoryForm from "../components/MemoryForm";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import NoImage from "../assets/images/no_image.png";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "50ch",
    },
    formControl: {
      margin: theme.spacing(5),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    container: {
      display: "flex",
      flexWrap: "wrap",
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
      display: "flex",
      flexWrap: "wrap",
    },
    chip: {
      margin: 2,
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
  },
  memoryContainer: {
    "& > *": {
      margin: theme.spacing(1),
    },
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  removeButton: {
    height: "50%",
  },
  imageContainer: {
    "& > *": {
      padding: theme.spacing(1),
    },
    margin: theme.spacing(3),
    height: "15vh",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: "100%",
  },
  hiddenInput: {
    display: "none",
  },
}));

export default function BasicTextFields() {
  const classes = useStyles();

  // Author: Shitaro Ichikawa -------------------------
  const [title, setTitle] = React.useState("");
  const [country, setCountry] = React.useState("日本");
  const [city, setCity] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [startDate, setStartDate] = React.useState("");
  const [image, setImage] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [memories, setMemories] = React.useState([]);
  const [cnt, setCnt] = React.useState(0);
  const ref = React.createRef();

  const createMemory = () => {
    setCnt(cnt + 1);
    return {
      id: cnt,
      place: "",
      lat: null,
      lng: null,
      description: "",
      images: [],
    };
  };

  const uploadImage = () => {
    const input = ref.current;
    input.click();
  };

  const loadImage = (e) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target.result;
      setImage(result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleMemory = (index) => (field, value) => {
    memories[index][field] = value;
    setMemories([...memories]);
  };
  // -------------------------------------------------

  return (
    <div>
      <h2>旅行記の作成</h2>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          label="タイトル"
          variant="outlined"
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
        />
      </form>
      <div>
        <FormControl className={classes.formControl}>
          <InputLabel shrink htmlFor="age-native-label-placeholder">
            国名
          </InputLabel>
          <NativeSelect
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            inputProps={{
              name: "age",
              id: "age-native-label-placeholder",
            }}
          >
            <option value="日本">日本</option>
            <option value="グアム・サイパン">グアム・サイパン</option>
            <option value="ハワイ">ハワイ</option>
            <option value="アメリカ">アメリカ</option>
            <option value="カナダ">カナダ</option>
            <option value="中国">中国</option>
            <option value="タイ">タイ</option>
            <option value="ベトナム">ベトナム</option>
            <option value="オーストラリア">オーストラリア</option>
            <option value="イタリア">イタリア</option>
            <option value="フランス">フランス</option>
            <option value="イギリス">イギリス</option>
          </NativeSelect>
        </FormControl>
        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            label="都市名"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </form>

        <form className={classes.container} noValidate>
          <TextField
            label="出発日"
            type="date"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <TextField
            label="帰宅日"
            type="date"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </form>
      </div>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          label="概要"
          variant="outlined"
          multiline
          rows={6}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </form>
      <Grid container justify="center" alignItems="center">
        <Grid item xs={12}>
          <p>表紙画像</p>
        </Grid>
        <Grid item xs={6} className={classes.imageContainer}>
          <img
            className={classes.image}
            src={image ? image : NoImage}
            alt="travel top"
          />
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={uploadImage}
          >
            Upload
          </Button>
        </Grid>
        <Grid item xs={2} />
      </Grid>
      <h2>思い出の追加</h2>
      <div>
        {memories.map((e, index) => (
          <div key={e.id} className={classes.memoryContainer}>
            <MemoryForm
              key={e.id}
              place={e.place}
              lat={e.lat}
              lng={e.lng}
              description={e.description}
              images={e.images}
              handleMemory={handleMemory(index)}
              onClick={() => {
                memories.splice(index, 1);
                setMemories([...memories]);
              }}
            />
          </div>
        ))}
      </div>
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setMemories([...memories, createMemory()]);
          }}
        >
          +
        </Button>
      </div>
      <div className={classes.root}>
        <Button
          variant="contained"
          color="primary"
          onClick={() =>
            console.log({
              title,
              country,
              city,
              startDate,
              endDate,
              description,
              memories,
              image
            })
          }
        >
          投稿
        </Button>
      </div>
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
