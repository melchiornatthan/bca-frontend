import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import axios from "../../axiosConfig";
import DismantleDetailsService from "../components/dismantleDetailsService";
import "typeface-inter";
import AdminNavbar from "../components/adminNavbar";

function AdminDismantleDetails() {
  const [data, setData] = useState({});
  const location = useLocation();
  // Parse the URL parameters and extract the 'data' parameter
  const searchParams = new URLSearchParams(location.search);
  const int_id = parseInt(searchParams.get("id"), 10);
  const dismantle_id = parseInt(searchParams.get("dismantle_id"), 10);
  const batchid = parseInt(searchParams.get("batchid"), 10);

  useEffect(() => {
    getRelocationData();
  }, [int_id]);

  const getRelocationData = async () => {
    await axios
      .get("installationsById/" + int_id + "")
      .then((response) => {
        setData(response.data[0]);
      })
      .catch((error) => {
        console.error("Error fetching location data:", error);
      });
  };

  const updateRequestStatus = async () => {
    // Display a confirmation dialog
    const confirmed = window.confirm(
      "Are you sure you want to approve this request?"
    );

    if (confirmed) {
      const body = {
        id: dismantle_id,
        installation_id: data.id,
      };
      // User clicked "OK" in the confirmation dialog, proceed with the request
      await axios
        .put(`update-dismantle/`, body)
        .then((response) => {
          window.location.href =
            "/admin/dismantleBatch?batchid=" + batchid + "";
        })
        .catch((error) => {
          console.error("Error updating installation data:", error);
        });
    }
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
                href="/admin/dismantleHistory"
              >
                History
              </a>
            </li>
            <li className="breadcrumb-item">
              <a
                className="link-body-emphasis fw-semibold text-decoration-none"
                href={`/admin/dismantleBatch?batchid=${batchid}`}
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
      <div className="text-center mt-5" style={{ fontFamily: "inter" }}>
        <h1>Dismantle Request</h1>
      </div>
      <DismantleDetailsService
        batchdata={data}
        isAdmin={true}
        updateRequestStatus={updateRequestStatus}
      />
    </div>
  );
}

export default AdminDismantleDetails;
