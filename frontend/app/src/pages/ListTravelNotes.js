// Makoto Naruse
import React, { useState, useEffect } from 'react';
import TravelNote from '../components/TravelNote'
import SearchCountries from '../components/SearchCountries'
import { Typography, Divider, Grid, Box, IconButton } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Link } from 'react-router-dom';

export async function get(url = "", params = {}) {
    // URLオブジェクトを作成
    let queryUrl = new URL(url);
    // クエリパラメータを追加
    queryUrl.search = new URLSearchParams(params);
    // GETリクエスト
    const response = await fetch(queryUrl, {
        headers: {
            "Content-Type": "application/json"
        }
    });
    return response.json();
}

export default function ListTravelNotes(props) {

    const [travelNotes, setTravelNotes] = useState([]);
    const [offset, setOffset] = useState(0);
    const limit = 5;
    const { country } = props.location.state;
    const onNextButtonClicked = () => {
        setOffset(offset + limit);
    };

    var params = {};
    if( country && country !== "世界" ){
        params = { offset, limit, country };
    } else {
        params = { offset, limit }
    }
    useEffect(() => {
        window.scrollTo(0, 0);
        get('http://localhost:4000/travel_notes', params)
            .then(res => {
                setTravelNotes(res);
            })
            .catch(e => {
                console.error(e);
            })
    // eslint-disable-next-line
    }, [offset, country]); 

    return (
        <Box my={10} mx={30}>
            <Grid container spacing={3}>
                <Grid item xs={8}>
                    <Typography variant="h4" align="left" >旅行記一覧</Typography>
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
                </Grid>
                <Grid item xs={4}>
                    <SearchCountries />
                </Grid>
            </Grid>
        </Box>
    );
};


