import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
function BatchTable({ batchdata }) {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  useEffect(() => {
    setData(batchdata);
  }, [batchdata]);

  const tableStyle = {
    maxHeight: "600px",
    overflowY: "auto",
  };

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

  const toDetails = (batchid) => {
     navigate("installationDetails?batchid=" + batchid + "");
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
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Requested at</th>
              <th>Request ID</th>
              <th>Status</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry, index) => (
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

export default BatchTable;