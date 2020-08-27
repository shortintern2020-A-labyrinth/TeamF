// Author: Kota Ikehara

import { Typography, Divider, Grid, Box } from '@material-ui/core';
import UserEachProfile from '../components/UserEachProfile';
import TravelNote from '../components/TravelNote';
import React, { useState, useEffect } from 'react';
import { Container, IconButton } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export default function UserPage() {
  const [userData, setUserData] = useState({});
  const { user_id } = useParams();
  const [travelNotes, setTravelNotes] = useState([]);
  const [offset, setOffset] = useState(0);
  const limit = 5;
  const onNextButtonClicked = () => {
      setOffset(offset + limit);
  };

  const getMyTravelNotes = async () => {
    const token = localStorage.getItem('token');
    await fetch(`http://localhost:4000/user/${user_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : '',
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
    getMyTravelNotes();
  }, []);

  return (
    <Box my={10} mx={5}>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <UserEachProfile {...userData} />
        </Grid>
        <Grid item xs={8}>
          <Typography variant="h4" align="left">
            旅行記一覧
          </Typography>
          <Divider />
          <Box mt={10}>
            <Container maxWidth="md">
                <Divider />
                {travelNotes.map(travelNote => (
                    <Link key={travelNote.id} to={{ pathname: `/TravelNote/${travelNote.id}`, state: { travelNote } }} style={{ textDecoration: 'none' }}>
                        <TravelNote
                            {...travelNote}
                        />
                    </Link>
                ))}
                <IconButton aria-label="next" onClick={onNextButtonClicked}>
                    <ExpandMoreIcon />
                </IconButton>
            </Container>
        </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
