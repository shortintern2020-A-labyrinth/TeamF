// Makoto Naruse
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import Country from '../components/Country';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  name: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
}));

const countries = [
  "世界",
  "日本",
  "グアム・サイパン",
  "ハワイ",
  "アメリカ",
  "カナダ",
  "中国",
  "タイ",
  "ベトナム",
  "オーストラリア",
  "イタリア",
  "フランス",
  "イギリス"
];


export default function SearchCountries() {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent>
        <div className={classes.name}>
          <Typography variant="subtitle1" component="h6">
            国から絞り込む
          </Typography>
        </div>
        <List>
          {countries.map((country, index) => (
            <Link key={index} to={{ pathname: `/TravelNotes`, state: { country } }} style={{ textDecoration: 'none' }}>
              <Country
                {...{ country }}
              />
            </Link>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}
