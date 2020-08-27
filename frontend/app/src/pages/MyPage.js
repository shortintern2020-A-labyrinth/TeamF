// Author: Kota Ikehara
import React, { useState, useEffect } from 'react';
import { Typography, Divider, Grid, Box } from '@material-ui/core';
import UserProfile from '../components/UserProfile';
import TravelNote from '../components/TravelNote';
import { Link } from 'react-router-dom';


export default function MyPage() {
  const [myTravelNotes, setMyTravelNotes] = useState([]);
  const [userData, setUserData] = useState({});

  const getMyTravelNotes = async () => {
    const token = localStorage.getItem('token');
    await fetch('http://localhost:4000/mypage', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : '',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMyTravelNotes(data.travel_notes);
        setUserData(data);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  useEffect(() => {
    getMyTravelNotes();
  }, []);

  return (
    <Box my={10} mx={5}>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <UserProfile {...userData} />
        </Grid>
        <Grid item xs={8}>
          <Typography variant="h4" align="left">
            旅行記一覧
          </Typography>
          <Divider />
          {myTravelNotes === [] ? (
            <Box mt={5}>
              <Typography variant="h6" align="center">
                「旅行記作成」から旅行記を作ってみよう！
              </Typography>
            </Box>
          ) : (
                myTravelNotes.map(travelNote => (
                    <Link key={travelNote.id} to={{ pathname: `/TravelNote/${travelNote.id}`, state: { travelNote } }} style={{ textDecoration: 'none' }}>
                        <TravelNote
                            {...travelNote}
                        />
                    </Link>
                ))
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
