// Makoto Naruse
import React from 'react';
import RoomIcon from '@material-ui/icons/Room';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';


export default function County({ country }) {

    return (
        <ListItem>
            <ListItemAvatar>
            <Avatar>
                <RoomIcon />
            </Avatar>
            </ListItemAvatar>
            {country}
        </ListItem>
    );
};