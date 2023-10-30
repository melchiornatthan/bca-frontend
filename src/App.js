
import './App.css';
import React, { Component } from 'react';
import Login from './pages/user/login';
import InstallationReq from './pages/user/installationRequest';
import InstallationBatch from './pages/user/installationBatch';
import Main from './pages/user/main';
import AdminInstallationReq from './pages/admin/adminInstallationReq';
import BatchDetails from './pages/user/installationDetails';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import AdminBatchDetails from './pages/admin/adminBatchDetails';
import InstallationOverride from './pages/admin/adminInstallationOverride';
import Select from './pages/user/installationSelect';
import RelocationReq from './pages/user/relocationRequest';
import AdminRelocationBatch from './pages/admin/adminRelocationBatch';
import AdminRelocationDetails from './pages/admin/adminRelocationDetails';
import AdminDismantleBatch from './pages/admin/adminDismantleBatch';
import RelocationBatch from './pages/user/relocationBatch';
import RelocationDetails from './pages/user/relocationDetails';
import DismantleBatch from './pages/user/dismantleBatch'
class App extends Component {
  render() {
    return (
      <Router>
        <div>
        <Routes>
          <Route exact path='/login' element={< Login />}></Route>
          <Route exact path='/main' element={< Main />}></Route>
          <Route exact path='/installationRequest' element={< InstallationReq />}></Route>
          <Route exact path='/installationBatch' element={< InstallationBatch />}></Route>
          <Route exact path='/dismantleBatch' element={< DismantleBatch />}></Route>
          <Route exact path='/relocationBatch' element={< RelocationBatch />}></Route>
          <Route exact path='/installationDetails' element={< BatchDetails />}></Route>
          <Route exact path='/relocationDetails' element={< RelocationDetails />}></Route>
          <Route exact path='/admin/installationBatch' element={< AdminInstallationReq />}></Route>
          <Route exact path='/admin/installationDetails' element={< AdminBatchDetails />}></Route>
          <Route exact path='/admin/installationOverride' element={< InstallationOverride />}></Route>
          <Route exact path='/installationSelect' element={< Select />}></Route>
          <Route exact path='/relocationRequest' element={< RelocationReq />}></Route>
          <Route exact path='/admin/relocationBatch' element={< AdminRelocationBatch />}></Route>
          <Route exact path='/admin/relocationDetails' element={< AdminRelocationDetails />}></Route>
          <Route exact path='/admin/dismantleBatch' element={< AdminDismantleBatch />}></Route>
        </Routes>
        </div>
        
      </Router>
    );
    }
}

export default App;
