import axios from "../../axiosConfig";
import { useState, useEffect } from "react";
import "typeface-inter";
import DismantleServiceTable from "../components/DismantleService";
import InputWithLabel from "../components/input";
import Navbar from "../components/navbar";

function DismantleHistory() {
  const [data, setData] = useState([]);
  const [batchid, setBatchId] = useState("");

  const handleInputChange = (event, setStateFunction) => {
    setStateFunction(event.target.value);
  };

  useEffect(() => {
    getDismantleData();
  }, []);

  const getDismantleDataByBatchID = () => {
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

  const getDismantleData = () => {
    axios
      .get("getBatchDismantle/" + 2 + "")
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching location data:", error);
      });
  };

  useEffect(() => {
    getDismantleDataByBatchID();
  }, [batchid]);

  return (
    <div className="container-fluid pt-3">
     <Navbar/>
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
            color: "#D83F31",
            fontWeight: "bold",
            fontSize: "6vh",
          }}
        >
          Dismantle Requests
        </h1>
      </div>
      <div className="container " style={{ width: "45%" }}>
        <InputWithLabel
          label="Enter Batch ID"
          value={batchid}
          name="pic"
          placeholder="Enter the installation location"
          onChange={(e) => handleInputChange(e, setBatchId)}
        />
      </div>
      <div className="my-5">
        <DismantleServiceTable batchdata={data}  />
      </div>
    </div>
  );
}

export default DismantleHistory;
