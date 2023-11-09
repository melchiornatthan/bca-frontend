
import BackLogo from "../assets/Back-Sign.svg";
import bcaLogo from "../assets/white-bca.svg";
import axios from "axios";
import { useState, useEffect } from "react";

import DismantleServiceTable from "../components/DismantleService";


function AdminDismantleHistory() {

  const [data, setData] = useState([]);

  useEffect(() => {
    getInstallationData();
  }, []);

  const getInstallationData = () => {
    axios.get('http://localhost:3333/bca-app/getBatchDismantle')
      .then((response) => {
        console.log(response.data);
        setData(response.data);
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
      <div className="container my-5 text-center">
      <h1 style={{ fontFamily: 'Montserrat', color: '#E9B824', fontWeight: 'bold' }}>
        Dismantle Requests
      </h1>
      </div>
      <div className="mt-5">
      <DismantleServiceTable batchdata={data} isAdmin={true} />
      </div>

    </div>
  );
}

export default AdminDismantleHistory;
