// Author: Kota Ikehara
import React from 'react';
import { Typography, Divider, Grid, Box } from '@material-ui/core';
import UserProfile from '../components/UserProfile';
import TravelNote from '../components/TravelNote';

const travelNotes = [
  {
    id: 1,
    title: '千葉への旅行',
    description: '楽しかった',
    image: '',
    country: '千葉県',
    city: '千葉市',
    startDate: '',
    endDate: '',
    // optional
    likeNumber: 6,
    userName: '田中',
  },
  {
    id: 2,
    title: '千葉への旅行',
    description: '楽しかった',
    image: '',
    country: '千葉県',
    city: '千葉市',
    startDate: '',
    endDate: '',
    // optional
    likeNumber: 7,
    userName: '田中',
  },
  {
    id: 3,
    title: '千葉への旅行',
    description: '楽しかった',
    image: '',
    country: '千葉県',
    city: '千葉市',
    startDate: '',
    endDate: '',
    // optional
    likeNumber: 10,
    userName: '田中',
  },
];

export default function UserPage() {
  return (
    <Box my={10} mx={5}>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <UserProfile />
        </Grid>
        <Grid item xs={8}>
          <Typography variant="h4" align="left">
            旅行記一覧
          </Typography>
          <Divider />
          {travelNotes.map((travelNote) => (
            <TravelNote key={travelNote.id} {...travelNote} />
          ))}
        </Grid>
      </Grid>
    </Box>
  );
}
