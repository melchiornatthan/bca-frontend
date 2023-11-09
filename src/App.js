import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import your components
import Login from './pages/user/login';
import InstallationReq from './pages/user/installationRequest';
import InstallationBatch from './pages/user/installationBatch';
import Main from './pages/user/main';
import AdminInstallationReq from './pages/admin/adminInstallationReq';
import BatchDetails from './pages/user/installationDetails';
import AdminBatchDetails from './pages/admin/adminBatchDetails';
import InstallationOverride from './pages/admin/adminInstallationOverride';
import Select from './pages/user/installationSelect';
import AdminRelocationBatch from './pages/admin/adminRelocationBatch';
import AdminRelocationDetails from './pages/admin/adminRelocationDetails';
import AdminDismantleBatch from './pages/admin/adminDismantleBatch';
import RelocationBatch from './pages/user/relocationBatch';
import RelocationDetails from './pages/user/relocationDetails';
import DismantleBatch from './pages/user/dismantleBatch';
import AdminMain from './pages/admin/adminMain';
import AdminLogin from './pages/admin/adminLogin';
import RelocationReq from './pages/user/relocationRequest';


class App extends Component {
  render() {
    // Check if the user is authorized (logged in) and isAdmin by inspecting localStorage
    const isAuthorized = localStorage.getItem('isAuthorized') === 'true';
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    
    return (
      <Router>
        <div>
          {/* Check for authorization and isAdmin, and redirect if not authorized */}
          {!isAuthorized && <Navigate to="/login" />}
          <Routes>
          <Route path='' element={<Login />} />
            <Route path='/login' element={<Login />} />
            <Route path='/main' element={<Main />} />
            <Route path='/installationRequest' element={<InstallationReq />} />
            <Route path='/installationBatch' element={<InstallationBatch />} />
            <Route path='/dismantleBatch' element={<DismantleBatch />} />
            <Route path='/relocationBatch' element={<RelocationBatch />} />
            <Route path='/installationDetails' element={<BatchDetails />} />
            <Route path='/relocationDetails' element={<RelocationDetails />} />
            <Route path='/installationSelect' element={<Select />} />
            <Route path='/relocationRequest' element={<RelocationReq />} />

            {/* {isAdmin && (
              // These routes are only accessible if isAdmin is true
              <> */}
                <Route path='/admin/installationBatch' element={<AdminInstallationReq />} />
                <Route path='/admin/main' element={<AdminMain />} />
                <Route path='/admin/login' element={<AdminLogin />} />
                <Route path='/admin/installationDetails' element={<AdminBatchDetails />} />
                <Route path='/admin/installationOverride' element={<InstallationOverride />} />
                <Route path='/admin/relocationBatch' element={<AdminRelocationBatch />} />
                <Route path='/admin/relocationDetails' element={<AdminRelocationDetails />} />
                <Route path='/admin/dismantleBatch' element={<AdminDismantleBatch />} />
              {/* </> */}
            {/* )} */}
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
