// Author: Kota Ikehara
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Copyright from './components/Copyright';
import Nav from './components/Nav';
import CreateTravelNote from './pages/CreateTravelNote';
import ListTravelNotes from './pages/ListTravelNotes'
import EditTravelNote from './pages/EditTravelNote'
import TravelNoteDetail from './pages/TravelNoteDetail'
import MyPage from './pages/MyPage'
import UserPage from './pages/UserPage'
import Auth from './pages/Auth';
import ScrollToTop from './components/ScrollToTop';
import './App.css';

const App = (props) => {
  const [loginStatus, setLoginStatus] = useState(null);

  useEffect(() => {
    // check if user is logged in (device is present with a token)
    async function checkToken() {
      const token = await localStorage.getItem('token');
      if (token) {
        setLoginStatus(true);
      } else {
        setLoginStatus(false);
      }
    }
    checkToken();
  }, []);

  return (
    <div className="App">
      <Router>
        <ScrollToTop />
        <Nav screenProps={{ loginStatus, setLoginStatus }} location={props.location}/>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/TravelNotes" />} />
          <Route path="/TravelNotes" component={ListTravelNotes} />
          <Route
            path="/Login"
            render={(props) => (
              <Login screenProps={{ ...props, loginStatus, setLoginStatus }} />
            )}
          />
          <Route
            path="/Signup"
            render={(props) => (
              <Signup screenProps={{ ...props, loginStatus, setLoginStatus }} />
            )}
          />
          <Route path="/TravelNote/:travel_note_id" component={TravelNoteDetail} />
          <Redirect exact from="/" to="/TravelNotes" />
          <Route path="/TravelNoteDetail" component={TravelNoteDetail} />
          <Route path="/UserPage/:user_id" component={UserPage} />
          <Auth screenProps={{ loginStatus, setLoginStatus }}>
            <Route path="/CreateTravelNote" component={CreateTravelNote} />
            <Route path="/EditTravelNote" component={EditTravelNote} />
            <Route path="/MyPage" component={MyPage} />
          </Auth>
          <Box mt={8}>
            <Copyright />
          </Box>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
