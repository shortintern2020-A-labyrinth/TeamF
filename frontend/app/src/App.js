// Editor: Kota Ikehara
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
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
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Nav />
        <Route exact path="/ListTravelNotes" component={ListTravelNotes} />
        <Route path="/Login" component={Login} />
        <Route path="/Signup" component={Signup} />
        <Route path="/CreateTravelNote" component={CreateTravelNote} />
        <Route path="/EditTravelNote" component={EditTravelNote} />
        <Route path="/TravelNoteDetail" component={TravelNoteDetail} />
        <Route path="/MyPage" component={MyPage} />
        <Route path="/UserPage" component={UserPage} />
        <Box mt={8}>
          <Copyright />
        </Box>
      </Router>
    </div>
  );
}

export default App;
