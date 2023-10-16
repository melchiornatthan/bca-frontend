
import './App.css';
import React, { Component } from 'react';
import Login from './pages/login';
import InstallationReq from './pages/installationRequest';
import Main from './pages/main';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route exact path='/login' element={< Login />}></Route>
          <Route exact path='/main' element={< Main />}></Route>
          <Route exact path='/installationRequest' element={< InstallationReq />}></Route>
        </Routes>
      </Router>
    );
    }
}

export default App;
