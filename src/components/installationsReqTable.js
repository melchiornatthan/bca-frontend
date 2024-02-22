import React from "react";
import Table from "react-bootstrap/Table";
import "typeface-inter";

/**
 * InstallationReqTable component renders a table displaying installation request data.
 * @param {Array} installationData - Array of objects containing installation request data.
 * @returns {JSX.Element} - A table component displaying installation request data.
 */
function InstallationReqTable({ installationData }) {
  const tableStyle = {
    maxHeight: "600px", // Set maximum height for table
    overflowY: "auto", // Add vertical scrollbar if content exceeds maxHeight
  };

  return (
    <div className="text-center w-75 mx-auto">
      <h1 style={{ fontFamily: "inter" }}>Service Requests</h1>
      <div style={tableStyle}>
        {/* Render a table to display installation request data */}
        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th style={{ fontFamily: "inter" }}>Location</th>
              <th style={{ fontFamily: "inter" }}>Address</th>
              <th style={{ fontFamily: "inter" }}>Branch PIC</th>
              <th style={{ fontFamily: "inter" }}>Area</th>
              <th style={{ fontFamily: "inter" }}>Communication</th>
              <th style={{ fontFamily: "inter" }}>Status</th>
              {/* <th style={{ fontFamily: 'inter' }}>Details</th> New column for the Details button */}
            </tr>
          </thead>
          <tbody>
            {/* Map through installationData array and render each installation entry */}
            {installationData.map((entry, index) => (
              <tr key={index}>
                <td style={{ fontFamily: "inter" }}>{entry.location}</td>
                <td style={{ fontFamily: "inter" }}>{entry.address}</td>
                <td style={{ fontFamily: "inter" }}>{entry.branch_pic}</td>
                <td style={{ fontFamily: "inter" }}>{entry.area}</td>
                <td style={{ fontFamily: "inter" }}>{entry.communication}</td>
                <td style={{ fontFamily: "inter" }}>{entry.status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default InstallationReqTable; // Export the InstallationReqTable component for use in other files
