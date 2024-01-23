import axios from "../../axiosConfig";
import { useState, useEffect } from "react";
import "typeface-inter";
import DismantleServiceTable from "../components/DismantleService";
import InputWithLabel from "../components/input";
import Navbar from "../components/navbar";
import { RiHome6Fill } from "react-icons/ri";

function AdminDismantleHistory() {
  const [data, setData] = useState([]);
  const [batchid, setBatchId] = useState("");

  const handleInputChange = (event, setStateFunction) => {
    setStateFunction(event.target.value);
  };

  useEffect(() => {
    getDismantles();
  }, []);

  const getDismantleByBatchID = () => {
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

  const getDismantles = () => {
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
    getDismantleByBatchID();
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
