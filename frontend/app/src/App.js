// Author: Kota Ikehara
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Copyright from './components/Copyright';
import Nav from './components/Nav';
import CreateTravelNote from './pages/CreateTravelNote';
import ListTravelNotes from './pages/ListTravelNotes';
import EditTravelNote from './pages/EditTravelNote';
import TravelNoteDetail from './pages/TravelNoteDetail';
import MyPage from './pages/MyPage';
import UserPage from './pages/UserPage';
import Auth from './pages/Auth';
import './App.css';

const App = () => {
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
        <Nav screenProps={{ loginStatus, setLoginStatus }} />
        <Switch>
          <Route exact path="/" component={ListTravelNotes} />
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
          <Route path="/TravelNoteDetail" component={TravelNoteDetail} />
          <Route path="/UserPage" component={UserPage} />
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
