import React from "react";
import axios from "axios";
import { useEffect } from "react";
import Table from "react-bootstrap/Table";
import "typeface-inter";
import { useNavigate } from "react-router-dom";
function InstallationService({ installationData }) {
  const token = localStorage.getItem("token");
  const [data, setData] = React.useState(installationData);
  const [hasPending, setHasPending] = React.useState(false);
  const isAdmin = localStorage.getItem("isAdmin") === "true"; 
  const navigate = useNavigate();

  useEffect(() => {
    setData(installationData);
    setHasPending(installationData.some((entry) => entry.status === "pending"));
  }, [installationData]);

  useEffect(() => {
    console.log(hasPending);
  }, [hasPending]);

  const tableStyle = {
    maxHeight: "600px",
    overflowY: "auto",
  };

  const toDetails = (id) => {
    // Handle navigation logic here based on isAdmin prop
    if (isAdmin) {
      // Redirect to admin override page
      navigate("/admin/installationHistory/installationOverride?id=" + id + "");
    } else {
      // Redirect to user details page
      // Add logic for user details navigation here
    }
  };

  const updateRequestStatus = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to approve this request?"
    );

    if (confirmed) {
      try {
        // Update the request status based on the context
        const response = await axios.put(
          isAdmin
            ? `http://localhost:3333/bca-app/update-installations/${id}`
            : `http://localhost:3333/user-app/update-installations/${id}`,
          null, // Pass null as the second parameter since you are making a PUT request
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(response.status);

        // Update the data based on the context
        setData((installation) =>
          installation.map((entry) =>
            entry.id === id ? { ...entry, status: "approved" } : entry
          )
        );
      } catch (error) {
        console.error("Error updating installation data:", error);
      }
    }
  };

  return (
    <div className="text-center mx-auto">
      <div style={tableStyle}>
        <Table striped bordered hover className=" mt-3">
          <thead>
            <tr>
              <th style={{ fontFamily: "inter" }}>Location</th>
              <th style={{ fontFamily: "inter" }}>Address</th>
              <th style={{ fontFamily: "inter" }}>Branch PIC</th>
              <th style={{ fontFamily: "inter" }}>Area</th>
              <th style={{ fontFamily: "inter" }}>Communication</th>
              {(isAdmin || !hasPending) && (
                <th style={{ fontFamily: "inter" }}>Provider</th>
              )}
              {(isAdmin || !hasPending) && (
                <th style={{ fontFamily: "inter" }}>Status</th>
              )}
              {isAdmin && (
                <th style={{ fontFamily: "inter" }}>Approve or Override</th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((entry, index) => (
              <tr key={index} >
                <td style={{ fontFamily: "inter" }}>{entry.location}</td>
                <td style={{ fontFamily: "inter" }}>{entry.address}</td>
                <td style={{ fontFamily: "inter" }}>{entry.branch_pic}</td>
                <td style={{ fontFamily: "inter" }}>{entry.area}</td>
                <td style={{ fontFamily: "inter" }}>{entry.communication}</td>
                {(isAdmin || !hasPending) && (
                  <td style={{ fontFamily: "inter" }}>{entry.provider}</td>
                )}
                {(isAdmin || !hasPending) && (
                  <td style={{ fontFamily: "inter" }}>{entry.status}</td>
                )}
                {isAdmin && (
                  <td>
                    <div className="row">
                      <div className="col">
                        {entry.status === "pending" && (
                          <button
                            className="btn btn-success"
                            onClick={() => updateRequestStatus(entry.id)}
                          >
                            Approve
                          </button>
                        )}
                      </div>
                      {entry.status === "pending" &&
                        entry.communication === "VSAT" && (
                          <div className="col">
                            <button
                              className="btn btn-danger"
                              onClick={() => toDetails(entry.id)}
                            >
                              Override
                            </button>
                          </div>
                        )}
                    </div>
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

export default InstallationService;
