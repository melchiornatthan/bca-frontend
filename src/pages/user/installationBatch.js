import axios from "../../axiosConfig";
import { useState, useEffect } from "react";
import BatchTable from "../components/installationBatchService";
import InputWithLabel from "../components/input";
import "typeface-inter";
import { RiHome6Fill } from "react-icons/ri";
import Navbar from "../components/navbar";
function InstallationBatch() {
  const [installationData, setInstallationData] = useState([]);
  const [batchid, setBatchId] = useState("");

  useEffect(() => {
    getInstallationData();
  }, []);

  const handleInputChange = (event, setStateFunction) => {
    setStateFunction(event.target.value);
  };

  const getInstallationDatabyBatchID = () => {
    axios
      .get("getBatchInstallations/" + batchid + "")
      .then((response) => {
        setInstallationData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching location data:", error);
      });
  };

  const getInstallationData = () => {
    axios
      .get("getBatchInstallations/" + 2 + "")
      .then((response) => {
        setInstallationData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching location data:", error);
      });
  };

  useEffect(() => {
    getInstallationDatabyBatchID();
  }, [batchid]);

  return (
    <div className="container-fluid py-3">
      <Navbar/>
      <div className="container my-3">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb breadcrumb-chevron p-3">
            <li className="breadcrumb-item">
              <RiHome6Fill onClick={() => window.location.href = "/main"}/>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              History
            </li>
          </ol>
        </nav>
      </div>
      <div className="container my-5 text-center">
        <h1
          style={{
            fontFamily: "inter",
            color: "#219C90",
            fontWeight: "bold",
            fontSize: "6vh",
          }}
        >
          Installation Requests
        </h1>
      </div>
      <div className="container" style={{ width: "45%" }}>
        <InputWithLabel
          label="Enter Batch ID"
          value={batchid}
          name="pic"
          placeholder="Enter the installation Batch ID"
          onChange={(e) => handleInputChange(e, setBatchId)}
        />
      </div>
      <div className="my-5">
        <BatchTable batchdata={installationData} isAdmin={false} />
      </div>
    </div>
  );
}

export default InstallationBatch;
