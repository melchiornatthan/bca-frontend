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
import AdminRelocationHistory from './pages/admin/adminRelocationHistory';
import AdminRelocationBatch from './pages/admin/adminRelocationBatch';
import AdminDismantleBatch from './pages/admin/adminDismantleBatch';
import RelocationHistory from './pages/user/relocationHistory';
import RelocationBatch from './pages/user/relocationBatch';
import DismantleBatch from './pages/user/dismantleBatch';
import AdminMain from './pages/admin/adminMain';
import AdminLogin from './pages/admin/adminLogin';
import RelocationReq from './pages/user/relocationRequest';
import AdminRelocationDetails from './pages/admin/adminRelocationDetails';
import RelocationDetails from './pages/user/relocationDetails';
import DismantleRequest from './pages/user/dismantleRequest';
import DismantleHistory from './pages/user/dismantleHistory';
import AdminDismantleHistory from './pages/admin/adminDismantleHistory';
import DismantleDetails from './pages/user/dismantleDetails';
import AdminDismantleDetails from './pages/admin/adminDismantleDetails';
import axios from 'axios';



class App extends Component {
  render() {
    // Check if the user is authorized (logged in) and isAdmin by inspecting localStorage
    const isAuthorized = localStorage.getItem("token") !== null;


    if (!isAuthorized) {
      return (
        <Router>
          <Navigate to="/login" />
          <Routes>
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      );
    }

    

    return (
      
      <Router>
        
          <Routes>
            <Route path='' element={<Login />} /> /* Check */
            <Route path='/login' element={<Login />} /> /* Check */
            <Route path='/main' element={<Main />} /> /* Check */
            <Route path='/installationRequest' element={<InstallationReq />} />/* Check */
            <Route path='/installationBatch' element={<InstallationBatch />} />/* Check */
            <Route path='/dismantleBatch' element={<DismantleBatch />} />/* Check */
            <Route path='/relocationHistory' element={<RelocationHistory />} />/* Check */
            <Route path='/installationDetails' element={<BatchDetails />} />/* Check */
            <Route path='/relocationBatch' element={<RelocationBatch />} />/* Check */
            <Route path='/relocationDetails' element={<RelocationDetails />} />/* Check */
            <Route path='/relocationRequest' element={<RelocationReq />} />/* Check */
            <Route path='/dismantleRequest' element={<DismantleRequest />} />/* Check */
            <Route path='/dismantleHistory' element={<DismantleHistory />} />/* Check */
            <Route path='/dismantleDetails' element={<DismantleDetails />} />/* Check */
           

            <Route path='/admin/installationBatch' element={<AdminInstallationReq />} />/* Check */
            <Route path='/admin/main' element={<AdminMain />} />/* Check */
            <Route path='/admin/login' element={<AdminLogin />} />
            <Route path='/admin/installationDetails' element={<AdminBatchDetails />} />/* Check */
            <Route path='/admin/installationOverride' element={<InstallationOverride />} />/* Check */
            <Route path='/admin/relocationHistory' element={<AdminRelocationHistory />} />/* Check */
            <Route path='/admin/relocationBatch' element={<AdminRelocationBatch />} />/* Check */
            <Route path='/admin/dismantleBatch' element={<AdminDismantleBatch />} />/* Check */
            <Route path='/admin/dismantleHistory' element={<AdminDismantleHistory />} />/* Check */
            <Route path='/admin/dismantleDetails' element={<AdminDismantleDetails />} />/* Check */
            <Route path='/admin/relocationDetails' element={<AdminRelocationDetails />} />/* Check */

          </Routes>
        
      </Router>
    );
  }
}

export default App;
