// Author: Kota Ikehara
import React from 'react';
import { Redirect } from 'react-router-dom';

const Auth = (props) =>
  props.screenProps.loginStatus ? props.children : <Redirect to="/login" />;

export default Auth;
