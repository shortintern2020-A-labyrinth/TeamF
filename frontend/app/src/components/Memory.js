// Author: Satoshi Moro
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Avatar, Typography, Button } from '@material-ui/core';
import FlagIcon from '@material-ui/icons/Flag';
import NoImage from '../assets/images/no_image.png';
import HotelIcon from '@material-ui/icons/Hotel';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        marginTop: theme.spacing(4),
        padding: theme.spacing(2),
        justifyContent: 'space-between',
        height: '30vh',
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '40%',
    },
    icon: {
        width: '20%',
        margin: 'auto 0',
        marginLeft: theme.spacing(4),
    },
    image: {
        width: '30%',
    },
}));

const validateHotelDetail = (hotel_detail) => {
    const ok =
      hotel_detail &&
      hotel_detail.hotels &&
      hotel_detail.hotels.length > 0 &&
      hotel_detail.hotels[0].hotel &&
      hotel_detail.hotels[0].hotel.length > 0 &&
      hotel_detail.hotels[0].hotel[0].hotelBasicInfo &&
      hotel_detail.hotels[0].hotel[0].hotelBasicInfo.hotelInformationUrl;
    return ok;
}

export default function Memory({ place, images, description, lat, lng, hotel_no, hotel_detail }) {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <div className={classes.icon}>
                <Avatar>
                    <FlagIcon />
                </Avatar>
            </div>
            <div className={classes.content}>
                <Typography variant="h6" color="primary">{place ? place : "場所名"}</Typography>
                <Typography variant="body1">{description ? description : "説明"}</Typography>
          {validateHotelDetail(hotel_detail) && (
            <a
              href={
                hotel_detail.hotels[0].hotel[0].hotelBasicInfo
                  .hotelInformationUrl
              }
              target="_blank"
            >
              <Button
                variant="contained"
                color="primary"
                className={classes.buttonInstagram}
              >
                <HotelIcon />
              </Button>
            </a>
          )}
            </div>
            <img className={classes.image} src={images[0] ? images[0] : NoImage} alt="memory" />
        </Card>
    );
};