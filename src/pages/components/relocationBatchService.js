import React, { useState } from "react";
import { useEffect } from "react";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function RelocationByBatchIdTable({ batchdata, isAdmin = false }) {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [hasPending, setHasPending] = useState(false);
  const tableStyle = {
    maxHeight: "600px",
    overflowY: "auto",
  };

  useEffect(() => {
    setData(batchdata);
    setHasPending(batchdata.some((entry) => entry.status === "pending"));
  }, [batchdata]);

  

  const toDetails = (id) => {
    const path = isAdmin ? "/admin/relocationDetails" : navigate(`/user/relocationHistory/relocationDetails?id=${id}`);
   
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
        <Table striped bordered hover>
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
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {data.map((request, index) => (
              <tr key={index}>
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
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => toDetails(request.id)}
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default RelocationByBatchIdTable;
