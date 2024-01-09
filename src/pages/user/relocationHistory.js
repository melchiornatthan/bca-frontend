import axios from "../../axiosConfig";
import { useState, useEffect } from "react";
import RelocationBatchTable from "../components/relocationService";
import InputWithLabel from "../components/input";
import "typeface-inter";
import UserNavbar from "../components/userNavbar";
function RelocationHistory() {
  const [relocationData, setRelocationData] = useState([]);
  const [batchid, setBatchId] = useState("");
  const token = localStorage.getItem("token");

  const handleInputChange = (event, setStateFunction) => {
    setStateFunction(event.target.value);
  };

  useEffect(() => {
    getRelocationData();
  }, []);

  const getInstallationDataByBatchID = () => {
    axios
      .get("getBatchRelocation/" + batchid + "")
      .then((response) => {
        console.log(response.data);
        setRelocationData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching location data:", error);
      });
  };

  const getRelocationData = () => {
    axios
      .get("relocations")
      .then((response) => {
        console.log(response.data);
        setRelocationData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching location data:", error);
      });
  };

  useEffect(() => {
    getInstallationDataByBatchID();
  }, [batchid]);

  return (
    <div className="container-fluid pt-3">
     <UserNavbar/>
      <div className="container my-3">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb breadcrumb-chevron p-3">
            <li className="breadcrumb-item">
              <a className="link-body-emphasis" href="/main">
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
        <h1
          style={{
            fontFamily: "inter",
            color: "#E9B824",
            fontWeight: "bold",
            fontSize: "6vh",
          }}
        >
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
        <RelocationBatchTable batchdata={relocationData} isAdmin={false} />
      </div>
    </div>
  );
}

export default RelocationHistory;
