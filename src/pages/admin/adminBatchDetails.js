import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { MdAccountCircle } from "react-icons/md";
import SidebarAdmin from "../components/sidebarAdmin";
import bcaLogo from "../assets/white-bca.svg";
import axios from "axios";
import InstallationService from "../components/installationService";
import AdminNavbar from "../components/adminNavbar";

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
      .get(
        "http://localhost:3333/bca-app/getInstallationsbyBatchID/" +
          batchid +
          ""
      )
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching location data:", error);
      });
  };

  return (
    <div>
      <AdminNavbar/>
      <div className="container">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb breadcrumb-chevron p-3">
            <li className="breadcrumb-item">
              <a className="link-body-emphasis" href="/admin/main">
                Main
              </a>
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
