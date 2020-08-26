// Author: Satoshi Moro
import React from 'react';
import Comment from './Comment';

const comments = [
    {
        id: 1,
        body: 'comment',
        likeCnt: 333,
    },
    {
        id: 2,
        body: 'comment',
        likeCnt: 333,
    },
    {
        id: 3,
        body: 'comment',
        likeCnt: 333,
    }
];


export default function CommentList() {
    return (
        <div>
            {comments.map(comment => <Comment key={comment.id} />)}
        </div>
    );
}
