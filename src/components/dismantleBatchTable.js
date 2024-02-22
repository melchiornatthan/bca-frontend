import React from "react";
import { useNavigate } from "react-router-dom";

/**
 * DismantleServiceTable component renders a table displaying dismantling service batch data.
 * @param {Array} batchdata - Array of objects containing batch data.
 * @returns {JSX.Element} - A table component displaying batch data.
 */
function DismantleServiceTable({ batchdata }) {
  const navigate = useNavigate(); // Hook for navigating to different routes
  const tableStyle = {
    maxHeight: "600px", // Set maximum height for table
    overflowY: "auto", // Add vertical scrollbar if content exceeds maxHeight
  };

  /**
   * Function to format a date string into a custom date format.
   * @param {string} dateString - The date string to be formatted.
   * @returns {string} - Formatted date string.
   */
  function formatCustomDate(dateString) {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleString(undefined, options);
  }

  /**
   * Function to navigate to the details page of a specific batch.
   * @param {string} batchid - The ID of the batch to view details.
   */
  const toDetails = (batchid) => {
    navigate(`dismantleBatch?batchid=${batchid}`); // Navigate to dismantleBatch page with batchid parameter
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
        {/* Render a table to display batch data */}
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Requested at</th>
              <th>Batch ID</th>
              <th>Status</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {/* Map through batchdata array and render each batch entry */}
            {batchdata.map((entry, index) => (
              <tr key={index}>
                <td>{formatCustomDate(entry.createdAt)}</td>
                <td>{entry.batchid}</td>
                <td
                  style={{
                    color:
                      entry.status === "pending"
                        ? "#FFA500" // Set color to orange for pending status
                        : entry.status === "approved"
                        ? "green" // Set color to green for approved status
                        : "black", // Set default color to black
                  }}
                >
                  <strong>{entry.status}</strong>
                </td>
                <td>
                  {/* Button to view details of the batch */}
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => toDetails(entry.batchid)} // Call toDetails function when button is clicked
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DismantleServiceTable; // Export the DismantleServiceTable component for use in other files
