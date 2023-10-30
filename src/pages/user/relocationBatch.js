
import BackLogo from "../assets/Back-Sign.svg";
import bcaLogo from "../assets/white-bca.svg";
import axios from "axios";
import { useState, useEffect } from "react";
import RelocationBatchTable from "../components/relocationService";


function RelocationBatch() {

  const [relocationData, setRelocationData] = useState([]);

  useEffect(() => {
    getInstallationData();
  }, []);

  const getInstallationData = () => {
    axios.get('http://localhost:3333/bca-app/relocations')
      .then((response) => {
        console.log(response.data);
        setRelocationData(response.data);
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
        Relocation Requests
      </h1>
      </div>
      <div className="mt-5">
      <RelocationBatchTable batchdata={relocationData} isAdmin={false} />
      </div>

    </div>
  );
}

export default RelocationBatch;
