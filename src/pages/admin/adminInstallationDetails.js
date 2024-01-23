import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import axios from "../../axiosConfig";
import InstallationService from "../components/installationService";
import Navbar from "../components/navbar";
import { RiHome6Fill } from "react-icons/ri";

function AdminBatchDetails() {
  const [data, setData] = useState([]);
  const location = useLocation();

  // Parse the URL parameters and extract the 'data' parameter
  const searchParams = new URLSearchParams(location.search);
  const batchid = parseInt(searchParams.get("batchid"), 10);

  useEffect(() => {
    getInstallationData();
  }, [batchid]);

  const getInstallationData = async () => {
    await axios
      .get("getInstallationsbyBatchID/" + batchid + "")
      .then((response) => {
        setData(response.data);
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
                href="/admin/installationBatch"
              >
                History
              </a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Details
            </li>
          </ol>
        </nav>
      </div>
      <div className="py-5 mx-auto text-center">
        <InstallationService installationData={data} isAdminView={true} />
      </div>
    </div>
  );
}

export default AdminBatchDetails;
