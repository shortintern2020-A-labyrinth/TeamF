// Author: Kota Ikehara
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import WorkIcon from '@material-ui/icons/Work';
import PublicIcon from '@material-ui/icons/Public';
import FavoriteIcon from '@material-ui/icons/Favorite';
import TodayIcon from '@material-ui/icons/Today';
import NoImage from '../assets/images/no_image.png';
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    width: '50%',
    margin: theme.spacing(2, 'auto'),
  },
  name: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
}));


export default function UserEachProfile({user_name, travel_days, travel_counts, travel_countries, travel_likes}) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <img className={classes.media} src={NoImage} alt="user" />
      <CardContent>
        <div className={classes.name}>
          <Typography variant="h5" component="h2">
            {user_name ? user_name : '名無し'}
          </Typography>
          <Typography variant="subtitle1" component="h6">
            さんのページ
          </Typography>
        </div>
        <List>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <TodayIcon />
              </Avatar>
            </ListItemAvatar>
            
            <ListItemText primary="旅行日数" secondary={travel_days ? travel_days : 0} />
          </ListItem>

          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <WorkIcon />
              </Avatar>
            </ListItemAvatar>
            
            <ListItemText primary="旅行回数" secondary={travel_counts ? travel_counts : 0} />
          </ListItem>

          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <PublicIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="訪れた国の数"
              
              secondary={travel_countries ? travel_countries : 0}
            />
          </ListItem>

          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <FavoriteIcon />
              </Avatar>
            </ListItemAvatar>
            
            <ListItemText primary="いいね" secondary={travel_likes ? travel_likes : 0} />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
}