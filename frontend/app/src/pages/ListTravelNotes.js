// Editor: Satoshi Moro
import React, { useState, useEffect } from 'react';
import TravelNote from '../components/TravelNote'
import { Container, Typography, Divider, Box, IconButton } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

async function getData(endpoint = '', params = {}) {
    console.log("fetch")
    const searchParams = new URLSearchParams();

    for (const property in params) {
        searchParams.set(property, params[property]);
    }
    if (params) {
        endpoint += '?'
    }
    const url = 'http://localhost:4000' + endpoint + searchParams.toString()
    console.log(url)
    const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    return response.json();
};

export default function ListTravelNotes() {

    const [travelNotes, setTravelNotes] = useState([]);
    const [offset, setOffset] = useState(0);
    const limit = 5;
    const onNextButtonClicked = () => { setOffset(offset + limit) };

    useEffect(() => {
        getData('/travel_notes', { offset, limit })
            .then(res => {
                console.log(res);
                setTravelNotes(res);
            })
            .catch(e => {
                console.error(e);
            })
    }, [offset]);

    return (
        <Box mt={10}>
            <Container maxWidth="md">
                <Typography variant="h4" align="left" >旅行記一覧</Typography>
                <Divider />
                {travelNotes.map(travelNote => (
                    <TravelNote
                        key={travelNote.id}
                        {...travelNote}
                    />
                ))}
                <IconButton aria-label="next" onClick={onNextButtonClicked}>
                    <ExpandMoreIcon />
                </IconButton>
            </Container>
        </Box>
    );
};


