import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table } from "react-bootstrap";

/**
 * DismantleByBatchIdTable component renders a table displaying dismantling requests filtered by batch ID.
 * @param {Array} batchdata - Array of objects containing dismantling requests data.
 * @returns {JSX.Element} - A table component displaying dismantling requests.
 */
function DismantleByBatchIdTable({ batchdata }) {
  const [data, setData] = useState([]); // State to store batch data
  const [hasPending, setHasPending] = useState(false); // State to track if there are pending requests
  const isAdmin = localStorage.getItem("isAdmin") === "true"; // Check if user is an admin
  const navigate = useNavigate(); // Hook for navigation to different routes
  const tableStyle = {
    maxHeight: "600px", // Set maximum height for table
    overflowY: "auto", // Add vertical scrollbar if content exceeds maxHeight
  };

  // Update data state and check for pending requests when batchdata prop changes
  useEffect(() => {
    setData(batchdata);
    setHasPending(batchdata.some((entry) => entry.status === "pending")); // Check if there are pending requests
  }, [batchdata]);

  /**
   * Function to navigate to the details page of a specific request.
   * @param {string} int_id - The installation ID of the request.
   * @param {string} dismatle_id - The dismantle ID of the request.
   * @param {string} batchid - The batch ID of the request.
   */
  const toDetails = (int_id, dismatle_id, batchid) => {
    const path = isAdmin
      ? `/admin/dismantleHistory/dismantleDetails?id=${int_id}&dismantle_id=${dismatle_id}&batchid=${batchid}`
      : `/user/dismantleHistory/dismantleDetails?id=${int_id}&batchid=${batchid}`;
    navigate(path); // Navigate to dismantleDetails page with parameters
  };

  return (
    <div
      style={{
        borderRadius: "17px", // Add border radius to the container
        padding: "20px", // Add padding to the container
      }}
      className="text-center w-75 mx-auto px-5" // Center align and set width of the container
    >
      <div style={tableStyle}>
        {/* Render a table to display dismantling requests */}
        <Table hover>
          <thead>
            <tr>
              <th>Installation ID</th>
              <th>Location</th>
              <th>Provider</th>
              {(isAdmin || !hasPending) && <th>Status</th>} {/* Render Status column if user is admin or there are no pending requests */}
            </tr>
          </thead>
          <tbody>
            {/* Map through batchdata array and render each dismantling request */}
            {data.map((request, index) => (
              <tr key={index} onClick={() =>
                toDetails(
                  request.installation_id,
                  request.id,
                  request.batchid
                )
              }>
                <td>{request.installation_id}</td>
                <td>{request.location}</td>
                <td>{request.provider}</td>
                {/* Render Status cell if user is admin or there are no pending requests */}
                {(isAdmin || !hasPending) && (
                  <td
                    style={{
                      color:
                        request.status === "pending"
                          ? "#FFA500" // Set color to orange for pending status
                          : request.status === "approved"
                          ? "green" // Set color to green for approved status
                          : "black", // Set default color to black
                    }}
                  >
                    {request.status}
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

export default DismantleByBatchIdTable; // Export the DismantleByBatchIdTable component for use in other files
