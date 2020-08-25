// Editor: Satoshi Moro
import React from 'react';
import TravelNote from '../components/TravelNote'
import { Container, Typography, Divider, Box, IconButton } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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

export default function ListTravelNotes() {
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
                <IconButton aria-label="next">
                    <ExpandMoreIcon />
                </IconButton>
            </Container>
        </Box>
    );
};


