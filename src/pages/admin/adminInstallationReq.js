import AdminBatchTable from "../components/adminBatchTable";
import axios from "axios";
import BackLogo from "../assets/Back-Sign.svg";
import bcaLogo from "../assets/white-bca.svg";
import { useState, useEffect } from "react";
import React from 'react';
function AdminInstallationReq() {

    const [installationData, setInstallationData] = useState([]);

    useEffect(() => {
      getInstallationData();
    }, []);
  
    const getInstallationData = async () => {
      await axios.get('http://localhost:3333/bca-app/getBatchInstallations')
        .then((response) => {
          console.log(response.data);
          setInstallationData(response.data);
        })
        .catch((error) => {
          console.error('Error fetching location data:', error);
        });
    };

    return (
      <div>
        <nav className="navbar" style={{ backgroundColor: '#0060AF' }}>
                <img className="px-3" src={bcaLogo} alt="Back" style={{ height: '20px' }} />
                <img className="px-3" src={BackLogo} alt="Back" style={{ height: '20px' }} onClick={() => window.location.href = "/login"} />
            </nav>
            <div className='py-5 mx-auto text-center'>
        <AdminBatchTable batchdata={installationData}/>
        </div>
      </div>
    );
  }
  
  export default AdminInstallationReq;
  