import React from "react";
import { useNavigate } from "react-router-dom";

/**
 * RelocationBatchTable Component renders a table displaying relocation batch data.
 * @param {Object} props - The component's props.
 * @param {Array} props.batchdata - An array containing relocation batch data.
 * @returns {JSX.Element} - RelocationBatchTable component.
 */
function RelocationBatchTable({ batchdata }) {
  const navigate = useNavigate();

  // Inline style for the table
  const tableStyle = {
    maxHeight: "600px",
    overflowY: "auto",
  };

  // Function to format date string
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

  // Function to navigate to details page
  const toDetails = (batchid) => {
    navigate(`relocationBatch?batchid=${batchid}`);
  };

  return (
    <div
      style={{
        borderRadius: "5px",
        padding: "20px",
      }}
      className="text-center w-75 mx-auto px-5"
    >
      <div style={tableStyle}>
        {/* Table to display relocation batch data */}
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
            {/* Map through batchdata array to render each entry */}
            {batchdata.map((entry, index) => (
              <tr key={index}>
                <td>{formatCustomDate(entry.createdAt)}</td>
                <td>{entry.batchid}</td>
                <td
                  style={{
                    color:
                      entry.status === "pending"
                        ? "#FFA500"
                        : entry.status === "approved"
                        ? "green"
                        : "black",
                  }}
                >
                  <strong>{entry.status}</strong>
                </td>
                {/* Button to navigate to details page */}
                <td>
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => toDetails(entry.batchid)}
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

export default RelocationBatchTable; // Export the RelocationBatchTable component for use in other files
