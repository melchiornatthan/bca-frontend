import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table } from "react-bootstrap";

function DismantleByBatchIdTable({ batchdata }) {
  const [data, setData] = useState([]);
  const [hasPending, setHasPending] = useState(false);
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const navigate = useNavigate();
  const tableStyle = {
    maxHeight: "600px",
    overflowY: "auto",
  };

  useEffect(() => {
    setData(batchdata);
    setHasPending(batchdata.some((entry) => entry.status === "pending"));
  }, [batchdata]);


  const toDetails = (int_id, dismatle_id, batchid) => {
    const path = isAdmin
      ? `/admin/dismantleHistory/dismantleDetails?id=${int_id}&dismantle_id=${dismatle_id}&batchid=${batchid}`
      : `/user/dismantleHistory/dismantleDetails?id=${int_id}&batchid=${batchid}`;
    navigate(path);
  };

  return (
    <div
      style={{
        borderRadius: "17px",
        padding: "20px",
      }}
     
      className="text-center w-75 mx-auto px-5"
    >
      <div style={tableStyle}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Installation ID</th>
              <th>Location</th>
              <th>Provider</th>
              {(isAdmin || !hasPending) && <th>Status</th>}
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {data.map((request, index) => (
              <tr key={index}>
                <td>{request.installation_id}</td>
                <td>{request.location}</td>
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
                    onClick={() =>
                      toDetails(
                        request.installation_id,
                        request.id,
                        request.batchid
                      )
                    }
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

export default DismantleByBatchIdTable;
