
import BackLogo from "../assets/Back-Sign.svg";
import bcaLogo from "../assets/white-bca.svg";
import axios from "axios";
import { useState, useEffect } from "react";
import RelocationBatchTable from "../components/relocationService";
import InputWithLabel from "../components/input";


function AdminRelocationHistory() {

  const [relocationData, setRelocationData] = useState([]);
  const [batchid, setBatchId] = useState("");

  const handleInputChange = (event, setStateFunction) => {
    setStateFunction(event.target.value);
  };

  useEffect(() => {
    getInstallationData();
  }, []);

  const getInstallationData = () => {
    axios.get('http://localhost:3333/bca-app/getBatchRelocation/'+ batchid + '')
      .then((response) => {
        console.log(response.data);
        setRelocationData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching location data:', error);
      });
  };

  useEffect(() => {
    getInstallationData();
  }, [batchid]);

  return (
    <div>
      <nav className="navbar" style={{ backgroundColor: '#0060AF' }}>
        <img className="px-3" src={bcaLogo} alt="Back" style={{ height: '20px' }} onClick={() => {
          localStorage.removeItem('isAuthorized')
          window.location.href = "/admin/login"
        }} />
        <img className="px-3" src={BackLogo} alt="Back" style={{ height: '20px' }} onClick={() => window.location.href = "admin/login"} />
      </nav>
      
      <div className="container my-3">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb breadcrumb-chevron p-3 bg-body-tertiary rounded-3">
                        <li className="breadcrumb-item">
                            <a className="link-body-emphasis" href="/admin/main">
                              Main
                            </a>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            History
                        </li>
                    </ol>
                </nav>
            </div>
      <div className="container my-5 text-center">
        <h1 style={{ fontFamily: 'Montserrat', color: '#E9B824', fontWeight: 'bold', fontSize: '6vh' }}>
          Relocation Requests
        </h1>
      </div>
      <div className="container w-50">
        <InputWithLabel
          label="Enter Batch ID"
          value={batchid}
          name="pic"
          placeholder="Enter the installation location"
          onChange={(e) => handleInputChange(e, setBatchId)}
        />
      </div>
      <div className="mt-5">
        <RelocationBatchTable batchdata={relocationData} isAdmin={true} />
      </div>

    </div>
  );
}

export default AdminRelocationHistory;
