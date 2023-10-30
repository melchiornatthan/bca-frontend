
import BackLogo from "../assets/Back-Sign.svg";
import bcaLogo from "../assets/white-bca.svg";
import axios from "axios";
import { useState, useEffect } from "react";
import BatchTable from "../components/installationBatchService";



function InstallationBatch() {
  const [installationData, setInstallationData] = useState([]);

  useEffect(() => {
    getInstallationData();
  }, []);

  const getInstallationData = () => {
    axios.get('http://localhost:3333/bca-app/getBatchInstallations')
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
      <div className="container my-5 text-center">
      <h1 style={{ fontFamily: 'Montserrat', color: '#219C90', fontWeight: 'bold' }}>
        Installation Requests
      </h1>
      </div>
      <div className="mt-5">
        <BatchTable batchdata={installationData} isAdmin={false} />
      </div>

    </div>
  );
}

export default InstallationBatch;
