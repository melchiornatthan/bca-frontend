import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import axios from "../../axiosConfig";
import RelocationByBatchIdTable from "../components/relocationBatchService";
import "typeface-inter";
import { RiHome6Fill } from "react-icons/ri";
import Navbar from "../components/navbar";

function AdminRelocationBatch() {
  const [data, setData] = useState([]);
  const location = useLocation();
  // Parse the URL parameters and extract the 'data' parameter
  const searchParams = new URLSearchParams(location.search);
  const batchid = parseInt(searchParams.get("batchid"), 10);

  useEffect(() => {
    getRelocationData();
    console.log(data);
  }, [batchid]);

  const getRelocationData = async () => {
    await axios
      .get("getRelocationsbyBatchID/" + batchid + "")
      .then((response) => {
        setData(response.data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching location data:", error);
      });
  };

  return (
    <div>
       <Navbar/>
      <div className="container">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb breadcrumb-chevron p-3">
            <li className="breadcrumb-item">
               <RiHome6Fill onClick={() => window.location.href = "/admin/main"}/>
            </li>
            <li className="breadcrumb-item">
              <a
                className="link-body-emphasis fw-semibold text-decoration-none"
                href="/admin/relocationHistory"
              >
                History
              </a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Batch
            </li>
          </ol>
        </nav>
      </div>
      <h1
        className="mx-auto text-center"
        style={{
          fontFamily: "inter",
          color: "#E9B824",
          fontWeight: "bold",
          fontSize: "6vh",
        }}
      >
        Relocation Requests
      </h1>
      <RelocationByBatchIdTable batchdata={data} isAdmin={true} />
    </div>
  );
}

export default AdminRelocationBatch;
