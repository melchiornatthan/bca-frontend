import React, { useEffect } from "react";

import InputWithLabel from "../components/input";
import { useState } from "react";
import axios from "../../axiosConfig";
import InstallationSearchTable from "../components/searchInstallationTable";
import UneditableInputWithLabel from "../components/uneditableInput";
import SelectLocation from "../components/locations";
import CustomButton from "../components/button";
import { ToastContainer, toast } from "react-toastify";

import Navbar from "../components/navbar";

function RelocationReq() {
  const [location, setLocation] = useState("");
  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState();
  const [newLocation, setNewLocation] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [area, setArea] = useState("Jakarta");
  const [newPic, setNewPic] = useState("");
  const [newCommunication, setNewCommunication] = useState("VSAT");
  const [areas, setAreas] = useState([]);
  const [specialData, setSpecialData] = useState([]);
  const [batchId, setBatchId] = useState(200000000);
  const [areaId, setAreaId] = useState(1);
  const [batchData, setBatchData] = useState([]);
  const [submittedRequests, setSubmittedRequests] = useState([]);
  const [isHoveredSecond, setIsHoveredSecond] = useState(false);
  const [province, setProvince] = useState("Jakarta");

  useEffect(() => {
    fetchInstallationData();
  }, [location]);

  useEffect(() => {
    fetchLocationData();
    fetchSpecialLocationData();
  }, []);

  useEffect(() => {
    getAreaId();
  }, [area]);

  const handleSelect = (id) => {
    fetchInstallationbyId(id);
    generateBatchId();
  };

  async function generateBatchId() {
    await axios
      .get("getRelocationBatchId")
      .then((response) => {
        const currentBatchId = parseInt(response.data.batchid, 10);
        const newBatchId = currentBatchId + 1;
        setBatchId(newBatchId);
        console.log(batchId);
      })
      .catch((error) => {
        console.error("Error fetching location data:", error);
      });
  }

  const handleInputChange = (event, setStateFunction) => {
    setStateFunction(event.target.value);
  };

  const getAreaId = async () => {
    await axios
      .get("locationByArea/" + area + "")
      .then((response) => {
        setAreaId(response.data[0].id);
      })
      .catch((error) => {
        console.error("Error fetching location data:", error);
      });
  };

  const handleSubmit = () => {
    if (area === "NA") {
      const requestData = {
        installation_id: selectedData.id,
        old_location: selectedData.location,
        new_location: newLocation,
        old_address: selectedData.address,
        new_address: newAddress,
        old_area: selectedData.area,
        new_area: province,
        old_branch_pic: selectedData.branch_pic,
        old_area_id: selectedData.area_id,
        new_area_id: areaId,
        new_branch_pic: newPic,
        old_communication: selectedData.communication,
        new_communication: selectedData.communication,
      };

      setBatchData([...batchData, requestData]);
      setSubmittedRequests([...submittedRequests, requestData]);
      setNewAddress("");
      setNewLocation("");
      setNewPic("");
      setNewCommunication("VSAT");
      setArea("Jakarta");
      setSelectedData(null);
      setData([]);
    } else {
      const requestData = {
        installation_id: selectedData.id,
        old_location: selectedData.location,
        new_location: newLocation,
        old_address: selectedData.address,
        new_address: newAddress,
        old_area: selectedData.area,
        new_area: area,
        old_branch_pic: selectedData.branch_pic,
        old_area_id: selectedData.area_id,
        new_area_id: areaId,
        new_branch_pic: newPic,
        old_communication: selectedData.communication,
        new_communication: selectedData.communication,
      };

      setBatchData([...batchData, requestData]);
      setSubmittedRequests([...submittedRequests, requestData]);
      setNewAddress("");
      setNewLocation("");
      setNewPic("");
      setNewCommunication("VSAT");
      setArea("Jakarta");
      setSelectedData(null);
      setData([]);
    }
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
        await axios.post(
          "relocation-request",
          requestData
        );
      }
      toast.success("Request submitted successfully");
      setBatchData([]); // Clear the batch data
      setSubmittedRequests([]); // Clear the previous requests
      setBatchId(generateBatchId());
    } catch (error) {
      console.error("Error submitting batch data:", error);
      toast.error("Error submitting batch data");
    }
  };

  const fetchLocationData = async () => {
    await axios
      .get("locations")
      .then((response) => {
        setAreas(response.data.list);
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

  const fetchInstallationData = async () => {
    try {
      const response = await axios.get(
        "locationByArea/"+ location
      );
      const filteredData = response.data.filter((installation) => {
        // Check if the installation_id is not present in batchData
        return !batchData.some(
          (request) => request.installation_id === installation.id
        );
      });
      setData(filteredData);
    } catch (error) {
      console.error("Error fetching location data:", error);
    }
  };

  const fetchInstallationbyId = async (id) => {
    await axios
      .get("installationsById/" + id + "")
      .then((response) => {
        console.log(response.data[0]);
        setSelectedData(response.data[0]);
      })
      .catch((error) => {
        console.error("Error fetching location data:", error);
      });
  };

  return (
    <div className="container-fluid pt-3">
     <Navbar/>
      <div className="container my-3">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb breadcrumb-chevron p-3 rounded-3">
            <li className="breadcrumb-item">
              <a className="link-body-emphasis" href="/main">
                Main
              </a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Relocation Request
            </li>
          </ol>
        </nav>
      </div>
      <div className="text-center my-5">
        <h1 style={{ color: "#E9B824", fontWeight: "bold" }}>
          Relocation Request
        </h1>
      </div>
      <div className="row py-5 w-75 mx-auto">
        <div className="col-md">
          <InputWithLabel
            label="Enter Location"
            value={location}
            name="pic"
            placeholder="Enter the installation location"
            onChange={(e) => handleInputChange(e, setLocation)}
          />
        </div>
        <div className="col-md">
          <div className=" mx-auto">
            <InstallationSearchTable batchdata={data} onSelect={handleSelect} />
          </div>
        </div>
      </div>
      {selectedData && (
        <div id="form">
          <div className="row py-5 w-75 mx-auto">
            <div className="col-md">
              <div className="form-group">
                <UneditableInputWithLabel
                  label="Location"
                  value={selectedData.location}
                  name="location"
                />
                <UneditableInputWithLabel
                  label="Address"
                  value={selectedData.address}
                  name="address"
                />
              </div>
              <div>
                <UneditableInputWithLabel
                  label="Area"
                  value={selectedData.area}
                  name="area"
                />
              </div>
            </div>
            <div className="col-md">
              <div className="form-group">
                <UneditableInputWithLabel
                  label="Branch PIC"
                  value={selectedData.branch_pic}
                  name="pic"
                />
                <div>
                  <UneditableInputWithLabel
                    label="Communication"
                    value={selectedData.communication}
                    name="communication"
                  />
                </div>
                <div>
                  <UneditableInputWithLabel
                    label="Provider"
                    value={selectedData.provider}
                    name="provider"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row w-75 mx-auto">
            <div className="col-lg">
              <InputWithLabel
                label="New Location"
                value={newLocation}
                name="newLocation"
                placeholder="Enter the new location"
                onChange={(e) => handleInputChange(e, setNewLocation)}
              />
              <InputWithLabel
                label="New Address"
                value={newAddress}
                name="newAddress"
                placeholder="Enter the new address"
                onChange={(e) => handleInputChange(e, setNewAddress)}
              />
              <div className="row">
                <div className="col mx-auto">
                  <div>
                    <SelectLocation
                      options={specialData}
                      label="Select the City"
                      value={area}
                      onChange={(e) => handleInputChange(e, setArea)}
                    />
                  </div>
                </div>
                {area === "NA" && (
                  <div className="col-sm mx-auto">
                    <SelectLocation
                      options={areas}
                      label="Select the Province"
                      value={province}
                      onChange={(e) => handleInputChange(e, setProvince)}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="col-lg">
              <div className="form-group">
                <InputWithLabel
                  label="Branch PIC"
                  value={newPic}
                  name="pic"
                  placeholder="Enter the Branch PIC"
                  onChange={(e) => handleInputChange(e, setNewPic)}
                />
                <div>
                  <UneditableInputWithLabel
                    label="Communication"
                    value={selectedData.communication}
                    name="communication"
                  />
                </div>
                <div>
                  <UneditableInputWithLabel
                    label="Provider"
                    value={selectedData.provider}
                    name="communication"
                  />
                </div>
                <div className="row py-4 mx-auto text-center">
                  <div className="col-md">
                    <CustomButton
                      text="Add"
                      color="primary"
                      onClick={handleSubmit}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {submittedRequests.length > 0 && (
        <div
          className="my-5 w-75 mx-auto"
          style={{
            borderRadius: "33px",
            padding: "20px",
            boxShadow: isHoveredSecond
              ? "10px 10px 20px rgba(33, 156, 144, 0.3)"
              : "none",
            transition: "box-shadow 0.3s",
          }}
          onMouseEnter={() => setIsHoveredSecond(true)}
          onMouseLeave={() => setIsHoveredSecond(false)}
        >
          <div className="row py-4 mx-auto">
            <div className="col-md text-center">
              <h2>Submitted Requests</h2>
              <table className="table">
                <thead>
                  <tr>
                    <th>Old Location</th>
                    <th>New Location</th>
                    <th>New Address</th>
                    <th>New Area</th>
                    <th>New Branch PIC</th>
                    <th>New Communication</th>
                  </tr>
                </thead>
                <tbody>
                  {submittedRequests.map((request, index) => (
                    <tr key={index}>
                      <td>{request.old_location}</td>
                      <td>{request.new_location}</td>
                      <td>{request.new_address}</td>
                      <td>{request.new_area}</td>
                      <td>{request.new_branch_pic}</td>
                      <td>{request.new_communication}</td>
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

export default RelocationReq;
