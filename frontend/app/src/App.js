// Author: Kota Ikehara
import React from 'react';
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

function App() {
  return (
    <div className="App">
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/" component={ListTravelNotes} />
          <Route  path="/Login" component={Login} />
          <Route  path="/Signup" component={Signup} />
          <Route  path="/TravelNoteDetail" component={TravelNoteDetail} />
          <Route  path="/UserPage" component={UserPage} />
          <Auth>
            <Route
              path="/CreateTravelNote"
              component={CreateTravelNote}
            />
            <Route  path="/EditTravelNote" component={EditTravelNote} />
            <Route  path="/MyPage" component={MyPage} />
          </Auth>
          <Box mt={8}>
            <Copyright />
          </Box>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
