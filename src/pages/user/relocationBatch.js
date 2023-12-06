import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import RelocationByBatchIdTable from "../components/relocationBatchService";
import "typeface-inter";

function RelocationBatch() {
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
      .get(
        "http://localhost:3333/bca-app/getRelocationsbyBatchID/" + batchid + ""
      )
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
      <div className="container my-3">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb breadcrumb-chevron p-3">
            <li className="breadcrumb-item">
              <a className="link-body-emphasis" href="/main">
                Main
              </a>
            </li>
            <li className="breadcrumb-item">
              <a
                className="link-body-emphasis fw-semibold text-decoration-none"
                href="/relocationHistory"
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
      <div className="text-center mt-5">
        <h1
          style={{
            fontFamily: "inter",
            color: "#E9B824",
            fontWeight: "bold",
            fontSize: "4vh",
          }}
        >
          Relocation Batch
        </h1>
      </div>
      <RelocationByBatchIdTable batchdata={data} isAdmin={false} />
    </div>
  );
}

export default RelocationBatch;
