import React, { useState, useEffect } from "react";
import axios from "../../axiosConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomButton from "../components/button";
import InputWithLabel from "../components/input";
import VsatSelect from "../components/communication";
import SelectLocation from "../components/locations";
import "typeface-inter";

import UserNavbar from "../components/userNavbar";
function InstallationReq() {
  // State variables
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [pic, setPic] = useState("");
  const [data, setData] = useState([]);
  const [area, setArea] = useState("Jakarta");
  const [specialData, setSpecialData] = useState([]);
  const [communication, setCommunication] = useState("VSAT");
  const [batchId, setBatchId] = useState(200000000);
  const [batchData, setBatchData] = useState([]);
  const [submittedRequests, setSubmittedRequests] = useState([]);
  const [isHoveredFirst, setIsHoveredFirst] = useState(false);
  const [province, setProvince] = useState("Jawa Barat");

  useEffect(() => {
    console.log(communication);
  }, [communication]);

  // Fetch data from the server
  useEffect(() => {
    generateBatchId();
    fetchLocationData();
    fetchSpecialLocationData();
  }, []);

  // Batch ID generator
  async function generateBatchId() {
    await axios
      .get("getInstallationBatchId")
      .then((response) => {
        const currentBatchId = parseInt(response.data.batchid, 10);
        const newBatchId = currentBatchId + 1;
        setBatchId(newBatchId);
      })
      .catch((error) => {
        console.error("Error fetching location data:", error);
      });
  }

  // Reusable input change handler
  const handleInputChange = (event, setStateFunction) => {
    setStateFunction(event.target.value);
  };

  const fetchLocationData = async () => {
    await axios
      .get("locations")
      .then((response) => {
        setData(response.data.list);
      })
      .catch((error) => {
        console.error("Error fetching location data:", error);
      });
  };

  const fetchSpecialLocationData = async () => {
    await axios
      .get("special-locations")
      .then((response) => {
        console.log(response.data.list);
        setSpecialData([...response.data.list, { location: "NA" }]);
        setArea(response.data.list[0].location);
      })
      .catch((error) => {
        console.error("Error fetching location data:", error);
      });
  };
  // Handle form submission
  const handleSubmit = () => {
    // Validate that all required fields are filled
    if (!location || !address || !pic || !area || !communication) {
      // Show a toast message if the form is not valid
      toast.error("Please fill in all input fields.");
      return;
    }

    if (area === "NA") {
      const requestData = {
        location,
        address,
        branch_pic: pic,
        area: province,
        communication,
      };

      setBatchData([...batchData, requestData]);
      setSubmittedRequests([...submittedRequests, requestData]);
      setLocation("");
      setAddress("");
      setPic("");
    } else {
      const requestData = {
        location,
        address,
        branch_pic: pic,
        area,
        communication,
      };

      setBatchData([...batchData, requestData]);
      setSubmittedRequests([...submittedRequests, requestData]);

      setLocation("");
      setAddress("");
      setPic("");
    }
  };

  const specialAreaRequest = () => {
    // Display a confirmation dialog
    const confirmed = window.confirm(
      "Apakah lokasi instalasi termasuk dalam daerah ini ? Bekasi, Depok, Tangerang, Bogor"
    );
  };

  const handleDeleteRow = (index) => {
    // Remove the row from submittedRequests
    const updatedSubmittedRequests = [...submittedRequests];
    updatedSubmittedRequests.splice(index, 1);
    setSubmittedRequests(updatedSubmittedRequests);

    // Remove the corresponding row from batchData
    const updatedBatchData = [...batchData];
    updatedBatchData.splice(index, 1);
    setBatchData(updatedBatchData);
  };

  // Submit batch data
  const submitBatchData = async () => {
    if (batchData.length === 0) {
      return; // No data to submit
    }

    try {
      setBatchId(generateBatchId());
      let date = new Date();
      for (let i = 0; i < batchData.length; i++) {
        batchData[i].batchid = batchId;
        batchData[i].createdAt = date;
        const requestData = batchData[i];
        console.log(batchId);
        const response = await axios.post("installation-request", requestData);
        if (response.data.message === "No provider available") {
          toast.error(
            "Threshold limit reached for " +
              requestData.area +
              ", please contact the Administrator."
          );
        } else {
          toast.success("Installation request submitted successfully.");
        }
      }
      setBatchData([]); // Clear the batch data
      setSubmittedRequests([]); // Clear the previous requests
      setBatchId(generateBatchId());
    } catch (error) {
      console.error("Error submitting batch data:", error);
      toast.error("Error submitting batch data");
    }
  };

  return (
    <div className="container-fluid pt-3">
      <UserNavbar />
      <div className="container my-3">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb breadcrumb-chevron p-3 rounded-3">
            <li className="breadcrumb-item">
              <a className="link-body-emphasis" href="/main">
                Main
              </a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Installation Request
            </li>
          </ol>
        </nav>
      </div>
      <div className="text-center my-5">
        <h1
          style={{ color: "#219C90", fontWeight: "bold", fontFamily: "inter" }}
        >
          Installation Request
        </h1>
      </div>
      <div
        style={{
          borderRadius: "5px",
          width: "90%",
          padding: "3vh",
          boxShadow: isHoveredFirst
            ? "5px 5px 10px rgba(33, 156, 144, 0.3)"
            : "none",
          transition: "box-shadow 0.3s",
        }}
        className="mx-auto"
        onMouseEnter={() => setIsHoveredFirst(true)}
        onMouseLeave={() => setIsHoveredFirst(false)}
      >
        <div className="row mx-auto">
          <div className="col-sm mx-auto my-auto">
            <InputWithLabel
              label="Location"
              value={location}
              name="location"
              placeholder="Enter the location"
              onChange={(e) => handleInputChange(e, setLocation)}
            />
          </div>
          <div className="col-sm mx-auto my-auto">
            <InputWithLabel
              label="Address"
              value={address}
              name="address"
              placeholder="Enter the address"
              onChange={(e) => handleInputChange(e, setAddress)}
            />
          </div>
          <div className="col-sm mx-auto my-auto">
            <SelectLocation
              options={specialData}
              label="Select the City"
              value={area}
              onChange={(e) => handleInputChange(e, setArea)}
            />
          </div>
          {area === "NA" && (
            <div className="col-sm mx-auto my-auto">
              <SelectLocation
                options={data}
                label="Select the Province"
                value={province}
                onChange={(e) => handleInputChange(e, setProvince)}
              />
            </div>
          )}
          <div className="col-sm mx-auto my-auto">
            <InputWithLabel
              label="Branch PIC"
              value={pic}
              name="pic"
              placeholder="Enter the Branch PIC"
              onChange={(e) => handleInputChange(e, setPic)}
            />
          </div>
          <div className="col-sm mx-auto my-auto">
            <label htmlFor="communication" style={{ fontFamily: "inter" }}>
              Communication
            </label>
            <VsatSelect
              value={communication}
              onChange={(e) => handleInputChange(e, setCommunication)}
            />
          </div>
          <div className="col-sm mx-auto my-auto">
            <CustomButton text="Add" color="primary" onClick={handleSubmit} />
          </div>
        </div>
      </div>
      {submittedRequests.length > 0 && (
        <div
          className="mx-auto mt-3"
          style={{
            borderRadius: "5px",
            padding: "2vh",
            width: "90%",
          }}
        >
          <div className="row mx-auto">
            <div className="col-md">
              <table className="table">
                <thead>
                  <tr>
                    <th>Location</th>
                    <th>Address</th>
                    <th>Area</th>
                    <th>Branch PIC</th>
                    <th>Communication</th>
                    <th>Action</th> {/* New column for delete button */}
                  </tr>
                </thead>
                <tbody>
                  {submittedRequests
                    .slice()
                    .reverse()
                    .map((request, index) => (
                      <tr key={index}>
                        <td>{request.location}</td>
                        <td>{request.address}</td>
                        <td>{request.area}</td>
                        <td>{request.branch_pic}</td>
                        <td>{request.communication}</td>
                        <td>
                          <button
                            className="btn btn-danger btn-md"
                            onClick={() => handleDeleteRow(index)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <div className="text-center mx-auto">
                <CustomButton
                  text="Submit Batch"
                  color="primary"
                  onClick={() => submitBatchData()}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
}

export default InstallationReq;
