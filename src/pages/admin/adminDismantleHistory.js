import axios from "../../axiosConfig";
import { useState, useEffect } from "react";
import "typeface-inter";
import DismantleServiceTable from "../components/DismantleService";
import InputWithLabel from "../components/input";
import AdminNavbar from "../components/adminNavbar";

function AdminDismantleHistory() {
  const [data, setData] = useState([]);
  const [batchid, setBatchId] = useState("");

  const handleInputChange = (event, setStateFunction) => {
    setStateFunction(event.target.value);
  };

  useEffect(() => {
    getInstallationData();
  }, []);

  const getInstallationData = () => {
    axios
      .get("getBatchDismantle/" + batchid + "")
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching location data:", error);
      });
  };

  useEffect(() => {
    getInstallationData();
  }, [batchid]);

  return (
    <div>
      <AdminNavbar />
      <div className="container">
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
        <h1
          style={{
            fontFamily: "inter",
            color: "#D83F31",
            fontWeight: "bold",
            fontSize: "6vh",
          }}
        >
          Dismantle Requests
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
        <DismantleServiceTable batchdata={data} isAdmin={true} />
      </div>
    </div>
  );
}

export default AdminDismantleHistory;
