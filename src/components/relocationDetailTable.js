import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

/**
 * RelocationByBatchIdTable Component displays relocation details based on batch ID.
 * @param {Object} props - The component's props.
 * @param {Array} props.batchdata - Data for relocation batch.
 * @returns {JSX.Element} - RelocationByBatchIdTable component.
 */
function RelocationByBatchIdTable({ batchdata }) {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [hasPending, setHasPending] = useState(false);
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const tableStyle = {
    maxHeight: "600px",
    overflowY: "auto",
  };

  useEffect(() => {
    setData(batchdata);
    setHasPending(batchdata.some((entry) => entry.status === "pending"));
  }, [batchdata]);

  /**
   * Handle navigation to relocation details based on user role.
   * @param {string} id - The relocation ID.
   */
  const toDetails = (id) => {
    const path = isAdmin ? `/admin/relocationHistory/relocationDetails?id=${id}` : `/user/relocationHistory/relocationDetails?id=${id}`;
    navigate(path);
  };

  return (
    <div
      style={{
        borderRadius: "17px",
        padding: "20px",
      }}
      className="text-center mx-auto px-3"
    >
      <div style={tableStyle}>
        <Table hover>
          <thead>
            <tr>
              <th>Old Location</th>
              <th>New Location</th>
              <th>New Address</th>
              <th>New Area</th>
              <th>New Branch PIC</th>
              <th>New Communication</th>
              <th>Provider</th>
              {(isAdmin || !hasPending) && <th>Status</th>}
            </tr>
          </thead>
          <tbody>
            {data.map((request, index) => (
              <tr key={index} onClick={() => toDetails(request.id)}>
                <td>{request.old_location}</td>
                <td>{request.new_location}</td>
                <td>{request.new_address}</td>
                <td>{request.new_area}</td>
                <td>{request.new_branch_pic}</td>
                <td>{request.new_communication}</td>
                <td>{request.provider}</td>
                {(isAdmin || !hasPending) && (
                  <td
                    style={{
                      color:
                        request.status === "pending"
                          ? "#FFA500"
                          : request.status === "approved"
                          ? "green"
                          : "black",
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

export default RelocationByBatchIdTable; // Export RelocationByBatchIdTable component
