// InstallationSearchTable.js

import React, { useState } from "react";

function InstallationSearchTable({ batchdata, onSelect }) {
  const [isHovered, setIsHovered] = useState(false);
  const tableStyle = {
    maxHeight: "20vh",
    overflowY: "auto",
  };

  // Handle the "Select" button click and call the onSelect callback with the ID
  const handleSelectClick = (id) => {
    onSelect(id);
  };

  return (
    <div
      style={{
        borderRadius: "17px",
        padding: "20px",
        boxShadow: isHovered ? "10px 10px 20px rgba(0, 96, 175, 0.3)" : "none",
        transition: "box-shadow 0.5s",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="text-center mx-auto px-5"
    >
      <div style={tableStyle}>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Location</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {batchdata.map((entry, index) => (
              <tr key={index}>
                <td>{entry.location}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleSelectClick(entry.id)}
                  >
                    Select
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

export default InstallationSearchTable;
