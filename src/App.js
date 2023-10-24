
import './App.css';
import React, { Component } from 'react';
import Login from './pages/user/login';
import InstallationReq from './pages/user/installationRequest';
import Invoice from './pages/user/clientInstallationReq';
import Main from './pages/user/main';
import AdminInstallationReq from './pages/admin/adminInstallationReq';
import BatchDetails from './pages/user/batchDetails';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import AdminBatchDetails from './pages/admin/adminBatchDetails';
import InstallationOverride from './pages/admin/adminInstallationOverride';
class App extends Component {
  render() {
    return (
      <Router>
        <div>
        <Routes>
          <Route exact path='/login' element={< Login />}></Route>
          <Route exact path='/main' element={< Main />}></Route>
          <Route exact path='/installationRequest' element={< InstallationReq />}></Route>
          <Route exact path='/installationBatch' element={< Invoice />}></Route>
          <Route exact path='/installationDetails' element={< BatchDetails />}></Route>
          <Route exact path='/admin/installationBatch' element={< AdminInstallationReq />}></Route>
          <Route exact path='/admin/installationDetails' element={< AdminBatchDetails />}></Route>
          <Route exact path='/admin/installationOverride' element={< InstallationOverride />}></Route>
        </Routes>
        </div>
        
      </Router>
    );
    }
}

export default App;
