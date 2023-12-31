import React from "react";
import { MdAccountCircle } from "react-icons/md";
import SidebarAdmin from "../components/sidebarAdmin";
import bcaLogo from "../assets/white-bca.svg";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import RelocationByBatchIdTable from "../components/relocationBatchService";
import "typeface-inter";
import AdminNavbar from "../components/adminNavbar";

function AdminRelocationBatch() {
  const [data, setData] = useState([]);
  const location = useLocation();
  const token = localStorage.getItem("token");
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
        "http://localhost:3333/bca-app/getRelocationsbyBatchID/" + batchid + "", {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        }
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
