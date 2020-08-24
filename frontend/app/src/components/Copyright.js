// Editor: KotaIkehara
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

export default function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" to={'/ListTravelNotes'}>
        トラベルノーツ
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
