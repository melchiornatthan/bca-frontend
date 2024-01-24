import React from "react";
import "typeface-inter";
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

function InstallationReqTable({ installationData }) {
  const tableStyle = {
    maxHeight: "600px",
    overflowY: "auto",
  };

  return (
    <div className="text-center w-75 mx-auto">
      <h1 style={{ fontFamily: "inter" }}>Service Requests</h1>
      <div style={tableStyle}>
        <Table striped bordered hover className=" mt-3">
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

export default InstallationReqTable;
