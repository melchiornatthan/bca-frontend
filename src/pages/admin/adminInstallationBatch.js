import axios from "../../axiosConfig";
import { useState, useEffect } from "react";
import BatchTable from "../components/installationBatchService";
import InputWithLabel from "../components/input";
import "typeface-inter";
import { RiHome6Fill } from "react-icons/ri";
import Navbar from "../components/navbar";

function AdminInstallationReq() {
  const [installationData, setInstallationData] = useState([]);
  const [batchid, setBatchId] = useState("");

  useEffect(() => {
    getInstallations();
  }, []);

  const handleInputChange = (event, setStateFunction) => {
    setStateFunction(event.target.value);
  };

  const getInstallationByBatchID = () => {
    axios
      .get("getBatchInstallations/" + batchid + "")
      .then((response) => {
        console.log(response.data);
        setInstallationData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching location data:", error);
      });
  };

  const getInstallations= () => {
    axios
      .get("getBatchInstallations/" + 2 + "")
      .then((response) => {
        console.log(response.data);
        setInstallationData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching location data:", error);
      });
  };

  useEffect(() => {
    getInstallationByBatchID();
  }, [batchid]);

  return (
    <div>
     <Navbar/>
      <div className="container">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb breadcrumb-chevron p-3">
            <li className="breadcrumb-item">
               <RiHome6Fill onClick={() => window.location.href = "/admin/main"}/>
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
