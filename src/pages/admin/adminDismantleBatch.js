import React from "react";
import bcaLogo from "../assets/white-bca.svg";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { MdAccountCircle } from "react-icons/md";
import SidebarAdmin from "../components/sidebarAdmin";
import DismantleByBatchIdTable from "../components/dismantleBatchService";
import "typeface-inter";
import AdminNavbar from "../components/adminNavbar";

function AdminDismantleBatch() {
  const [data, setData] = useState([]);
  const location = useLocation();
  // Parse the URL parameters and extract the 'data' parameter
  const searchParams = new URLSearchParams(location.search);
  const batchid = parseInt(searchParams.get("batchid"), 10);
  const token = localStorage.getItem("token");

  useEffect(() => {
    getRelocationData();
    console.log(data);
  }, [batchid]);

  const getRelocationData = async () => {
    await axios
      .get(
        "http://localhost:3333/bca-app/getDismantlebyBatchID/" + batchid + ""
        ,{
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        })
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
      <AdminNavbar/>
      <div className="container">
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
                href="/dismantleHistory"
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
      <div className="text-center mt-5" style={{ fontFamily: "inter" }}>
        <h1>Dismantle Request</h1>
      </div>
      <DismantleByBatchIdTable batchdata={data} isAdmin={true} />
    </div>
  );
}

export default AdminDismantleBatch;
