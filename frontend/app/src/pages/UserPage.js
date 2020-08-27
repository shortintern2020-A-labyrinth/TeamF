// Author: Kota Ikehara
import { Typography, Divider, Grid, Box } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import TravelNote from '../components/TravelNote';
import UserProfile from '../components/UserProfile';

export default function UserPage() {
  const [userData, setUserData] = useState({});
  const { user_id } = useParams();
  const [travelNotes, setTravelNotes] = useState([]);

  const getTravelNotes = async () => {
    await fetch(`https://rakuten-intern-backend.herokuapp.com/user/${user_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setTravelNotes(data.travel_notes);
        setUserData(data);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  useEffect(() => {
    getTravelNotes();
  }, [user_id]);

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
          {travelNotes.length === 0 ? (
            <Box mt={5}>
              <Typography variant="h6" align="center">
                「旅行記」がありません．
              </Typography>
            </Box>
          ) : (
              travelNotes.map((travelNote) => (
                <Link
                  key={travelNote.id}
                  to={{
                    pathname: `/TravelNote/${travelNote.id}`,
                    state: { travelNote },
                  }}
                  style={{ textDecoration: 'none' }}
                >
                  <TravelNote {...travelNote} />
                </Link>
              ))
            )}
        </Grid>
      </Grid>
    </Box>
  );
}
