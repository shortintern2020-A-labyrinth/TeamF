import TravelNote from '../components/TravelNote.js';
import React from 'react';
import Container from '@material-ui/core/Container';

const travelNotes = [
    {
        id: '1',
        title: '千葉への旅行',
        description: '楽しかった',
        place: '千葉県千葉市',
        likeNumber: '6',
        userName: '田中',
    },
    {
        id: '2',
        title: '千葉への旅行',
        description: '楽しかった',
        place: '千葉県千葉市',
        likeNumber: '6',
        userName: '田中',
    },
    {
        id: '3',
        title: '千葉への旅行',
        description: '楽しかった',
        place: '千葉県千葉市',
        likeNumber: '6',
        userName: '田中',
    },
];

export default function ListTravelNotes() {
    return (
        <Container maxWidth="sm">
            <h1>旅行記一覧</h1>
            {travelNotes.map(travelNote => (
                <TravelNote
                    key={travelNote.id}
                    title={travelNote.title}
                    description={travelNote.description}
                    place={travelNote.place}
                    likeNumber={travelNote.likeNumber}
                    userName={travelNote.userName}
                />
            ))}
        </Container>
    );
};


