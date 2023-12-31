import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import RelocationDetailService from "../components/relocationDetailsService";
import "typeface-inter";
import UserSidebar from "../components/sidebarUser";
import { MdAccountCircle } from "react-icons/md";
import bcaLogo from '../assets/white-bca.svg';
import UserNavbar from "../components/userNavbar";

function RelocationDetails() {
  const [data, setData] = useState({});
  const location = useLocation();
  const token = localStorage.getItem("token");
  // Parse the URL parameters and extract the 'data' parameter
  const searchParams = new URLSearchParams(location.search);
  const int_id = parseInt(searchParams.get("id"), 10);

  useEffect(() => {
    getRelocationData();
    console.log(data);
  }, [int_id]);


  const getRelocationData = async () => {
    await axios
      .get("http://localhost:3333/bca-app/relocations/" + int_id + "", {
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
    <div className="container-fluid pt-3 pb-3">
      <UserNavbar/>
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
            <li className="breadcrumb-item">
              <a
                className="link-body-emphasis fw-semibold text-decoration-none"
                href={`/relocationBatch?batchid=${data.batchid}`}
              >
                Batch
              </a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Details
            </li>
          </ol>
        </nav>
      </div>
      <div
        className="text-center mt-2"
        style={{ fontFamily: "inter", fontSize: "6vh" }}
      >
        <h1>Relocation Request</h1>
      </div>
      <RelocationDetailService batchdata={data} isAdmin={false} />
    </div>
  );
}

export default RelocationDetails;
