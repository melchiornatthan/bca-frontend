import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import "typeface-inter";
import { useNavigate } from "react-router-dom";

/**
 * InstallationService component renders a table displaying installation service data with options for admins to approve or override requests.
 * @param {Array} installationData - Array of objects containing installation service data.
 * @returns {JSX.Element} - A table component displaying installation service data.
 */
function InstallationService({ installationData }) {
  const token = localStorage.getItem("token"); // Get token from local storage
  const [data, setData] = useState([]); // State to store installation service data
  const [hasPending, setHasPending] = useState(false); // State to track if there are pending requests
  const isAdmin = localStorage.getItem("isAdmin") === "true"; // Check if user is an admin
  const navigate = useNavigate(); // Hook for navigation to different routes

  // Update data state and check for pending requests when installationData prop changes
  useEffect(() => {
    setData(installationData);
    setHasPending(installationData.some((entry) => entry.status === "pending"));
  }, [installationData]);

  const tableStyle = {
    maxHeight: "600px", // Set maximum height for table
    overflowY: "auto", // Add vertical scrollbar if content exceeds maxHeight
  };

  /**
   * Function to navigate to the details page or admin override page of a specific installation.
   * @param {string} id - The ID of the installation to view details or override.
   */
  const toDetails = (id) => {
    // Handle navigation logic here based on isAdmin prop
    if (isAdmin) {
      // Redirect to admin override page
      navigate("/admin/installationHistory/installationOverride?id=" + id + "");
    } else {
      // Redirect to user details page
      // Add logic for user details navigation here
    }
  };

  /**
   * Function to update the status of an installation request.
   * @param {string} id - The ID of the installation request to update.
   */
  const updateRequestStatus = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to approve this request?"
    );

    if (confirmed) {
      try {
        // Update the request status based on the context
        const response = await axios.put(
          isAdmin
            ? `http://localhost:3333/bca-app/update-installations/${id}`
            : `http://localhost:3333/user-app/update-installations/${id}`,
          null, // Pass null as the second parameter since you are making a PUT request
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(response.status);

        // Update the data based on the context
        setData((installation) =>
          installation.map((entry) =>
            entry.id === id ? { ...entry, status: "approved" } : entry
          )
        );
      } catch (error) {
        console.error("Error updating installation data:", error);
      }
    }
  };

  return (
    <div className="text-center mx-auto">
      <div style={tableStyle}>
        {/* Render a table to display installation service data */}
        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th style={{ fontFamily: "inter" }}>Location</th>
              <th style={{ fontFamily: "inter" }}>Address</th>
              <th style={{ fontFamily: "inter" }}>Branch PIC</th>
              <th style={{ fontFamily: "inter" }}>Area</th>
              <th style={{ fontFamily: "inter" }}>Communication</th>
              {/* Render Provider column if user is admin or there are no pending requests */}
              {(isAdmin || !hasPending) && (
                <th style={{ fontFamily: "inter" }}>Provider</th>
              )}
              {/* Render Status column if user is admin or there are no pending requests */}
              {(isAdmin || !hasPending) && (
                <th style={{ fontFamily: "inter" }}>Status</th>
              )}
              {/* Render Approve or Override column if user is admin */}
              {isAdmin && (
                <th style={{ fontFamily: "inter" }}>Approve or Override</th>
              )}
            </tr>
          </thead>
          <tbody>
            {/* Map through installationData array and render each installation entry */}
            {data.map((entry, index) => (
              <tr key={index}>
                <td style={{ fontFamily: "inter" }}>{entry.location}</td>
                <td style={{ fontFamily: "inter" }}>{entry.address}</td>
                <td style={{ fontFamily: "inter" }}>{entry.branch_pic}</td>
                <td style={{ fontFamily: "inter" }}>{entry.area}</td>
                <td style={{ fontFamily: "inter" }}>{entry.communication}</td>
                {/* Render Provider cell if user is admin or there are no pending requests */}
                {(isAdmin || !hasPending) && (
                  <td style={{ fontFamily: "inter" }}>{entry.provider}</td>
                )}
                {/* Render Status cell if user is admin or there are no pending requests */}
                {(isAdmin || !hasPending) && (
                  <td style={{ fontFamily: "inter" }}>{entry.status}</td>
                )}
                {/* Render Approve or Override buttons if user is admin */}
                {isAdmin && (
                  <td>
                    <div className="row">
                      <div className="col">
                        {/* Render Approve button for pending requests */}
                        {entry.status === "pending" && (
                          <button
                            className="btn btn-success"
                            onClick={() => updateRequestStatus(entry.id)}
                          >
                            Approve
                          </button>
                        )}
                      </div>
                      {/* Render Override button for VSAT communication and pending requests */}
                      {entry.status === "pending" &&
                        entry.communication === "VSAT" && (
                          <div className="col">
                            <button
                              className="btn btn-danger"
                              onClick={() => toDetails(entry.id)}
                            >
                              Override
                            </button>
                          </div>
                        )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default InstallationService; // Export the InstallationService component for use in other files
