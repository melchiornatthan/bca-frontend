
import BackLogo from "../assets/Back-Sign.svg";
import bcaLogo from "../assets/white-bca.svg";
import axios from "axios";
import { useState, useEffect } from "react";
import BatchTable from "../components/installationBatchService";
import InputWithLabel from "../components/input";
import 'typeface-inter';


function AdminInstallationReq() {
  const [installationData, setInstallationData] = useState([]);
  const [batchid, setBatchId] = useState("");

  useEffect(() => {
    getInstallationData();
  }, []);

  const handleInputChange = (event, setStateFunction) => {
    setStateFunction(event.target.value);
  };

  const getInstallationData = () => {
    axios.get('http://localhost:3333/bca-app/getBatchInstallations/'+ batchid + '')
      .then((response) => {
        console.log(response.data);
        setInstallationData(response.data);
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
      <div className="container my-3">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb breadcrumb-chevron p-3">
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
        <h1 style={{ fontFamily: 'inter', color: '#219C90', fontWeight: 'bold', fontSize: '6vh' }}>
          Installation Requests
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
        <BatchTable batchdata={installationData} isAdmin={true} />
      </div>

    </div>
  );
}

export default AdminInstallationReq;
