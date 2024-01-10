import React, { useState } from "react";
import { useEffect } from "react";

function DismantleByBatchIdTable({ batchdata, isAdmin = false }) {
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

  const toDetails = (int_id, dismatle_id, batchid) => {
    const path = isAdmin
      ? `/admin/dismantleDetails?id=${int_id}&dismantle_id=${dismatle_id}&batchid=${batchid}`
      : `/dismantleDetails?id=${int_id}&batchid=${batchid}`;
    window.location.href = path;
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
        <table className="table">
          <thead>
            <tr>
              <th>Installation ID</th>
              <th>Location</th>
              {(isAdmin || !hasPending) && <th>Status</th>}
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {data.map((request, index) => (
              <tr key={index}>
                <td>{request.installation_id}</td>
                <td>{request.location}</td>
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
        </table>
      </div>
    </div>
  );
}

export default DismantleByBatchIdTable;
