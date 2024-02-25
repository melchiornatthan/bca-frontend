import React, { useEffect } from "react";

import InputWithLabel from "../../components/input";
import { useState } from "react";
import axios from "../../axiosConfig";
import InstallationSearchTable from "../../components/searchInstallationTable";
import SelectLocation from "../../components/locations";
import CustomButton from "../../components/button";
import { RiHome6Fill } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import { Container, Breadcrumb, Row, Col, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function RelocationRequest() {
  const [location, setLocation] = useState("");
  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState();
  const [newLocation, setNewLocation] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [area, setArea] = useState("Jakarta");
  const [newPic, setNewPic] = useState("");
  const [areas, setAreas] = useState([]);
  const [specialData, setSpecialData] = useState([]);
  const [batchId, setBatchId] = useState(200000000);
  const [areaId, setAreaId] = useState(1);
  const [batchData, setBatchData] = useState([]);
  const [submittedRequests, setSubmittedRequests] = useState([]);
  const [province, setProvince] = useState("Jakarta");
  const navigate = useNavigate();

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
    // Check if all required fields are filled
    if (
      newLocation.trim() === "" ||
      newAddress.trim() === "" ||
      newPic.trim() === ""
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    const requestData = {
      installation_id: selectedData.id,
      old_location: selectedData.location,
      new_location: newLocation,
      old_address: selectedData.address,
      new_address: newAddress,
      old_area: selectedData.area,
      new_area: area === "NA" ? province : area,
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
    setArea("Jakarta");
    setSelectedData(null);
    setData([]);
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
        await axios.post("relocation-request", requestData);
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
      const response = await axios.get("locationByArea/" + location);
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
      .get("atmById/" + id + "")
      .then((response) => {
        console.log(response.data[0]);
        setSelectedData(response.data[0]);
      })
      .catch((error) => {
        console.error("Error fetching location data:", error);
      });
  };

  return (
    <Container fluid className="pt-3">
      
      <Container className="my-3">
        <Breadcrumb className="breadcrumb-chevron p-3 rounded-3">
          <Breadcrumb.Item onClick={() => navigate("/user")}>
            <RiHome6Fill />
          </Breadcrumb.Item>
          <Breadcrumb.Item active aria-current="page">
            Relocation Request
          </Breadcrumb.Item>
        </Breadcrumb>
      </Container>


      <Row className="py-1 w-50 mx-auto">
          <InputWithLabel
            label="Enter Location"
            value={location}
            name="pic"
            placeholder="Enter the installation location"
            onChange={(e) => handleInputChange(e, setLocation)}
          />
         <div className="mx-auto mt-2">
            <InstallationSearchTable batchdata={data} onSelect={handleSelect} />
          </div>
      </Row>

      {selectedData && (
        <div id="form">
          <Row className="py-1 w-75 mx-auto">
            <Col md>
              <div className="form-group">
                <InputWithLabel
                  isDisabled={true}
                  label="Location"
                  value={selectedData.location}
                  name="location"
                />
                <InputWithLabel
                  isDisabled={true}
                  label="Address"
                  value={selectedData.address}
                  name="address"
                />
                <InputWithLabel
                  isDisabled={true}
                  label="Area"
                  value={selectedData.area}
                  name="area"
                />
              </div>
            </Col>
            <Col md>
              <div className="form-group">
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
                <Row className="mt-2">
                  <Col md mx-auto>
                    <SelectLocation
                      options={specialData}
                      label="Select the City"
                      value={area}
                      onChange={(e) => handleInputChange(e, setArea)}
                    />
                  </Col>

                  {area === "NA" && (
                    <Col md mx-auto>
                      <SelectLocation
                        options={areas}
                        label="Select the Province"
                        value={province}
                        onChange={(e) => handleInputChange(e, setProvince)}
                      />
                    </Col>
                  )}
                </Row>
              </div>
            </Col>
          </Row>

          <Row className="w-75 mx-auto">
            <Col lg>
              <InputWithLabel
                isDisabled={true}
                label="Branch PIC"
                value={selectedData.branch_pic}
                name="pic"
              />
              <div>
                <InputWithLabel
                  isDisabled={true}
                  label="Communication"
                  value={selectedData.communication}
                  name="communication"
                />
              </div>
              <div>
                <InputWithLabel
                  isDisabled={true}
                  label="Provider"
                  value={selectedData.provider}
                  name="Provider"
                />
              </div>
            </Col>
            <Col lg>
              <div className="form-group">
                <InputWithLabel
                  label="Branch PIC"
                  value={newPic}
                  name="pic"
                  placeholder="Enter the Branch PIC"
                  onChange={(e) => handleInputChange(e, setNewPic)}
                />
                <div>
                  <InputWithLabel
                    isDisabled={true}
                    label="Communication"
                    value={selectedData.communication}
                    name="communication"
                  />
                </div>
                <div>
                  <InputWithLabel
                    isDisabled={true}
                    label="Provider"
                    value={selectedData.provider}
                    name="Provider"
                  />
                </div>
              </div>
            </Col>
          </Row>
          <Row className=" mx-auto my-5" style={{ width: "15%" }}>
            <CustomButton
              text="Add"
              color="primary"
              onClick={handleSubmit}
              style={{ width: "50%" }}
              className="mx-auto"
            />
          </Row>
        </div>
      )}

      {submittedRequests.length > 0 && (
        <div
          className="my-5 mx-auto"
          style={{ borderRadius: "33px", padding: "20px" }}
        >
          <Row className="py-4 mx-auto">
            <Col md className="text-center">
              <h2>Submitted Requests</h2>
              <Table striped bordered hover className="my-3">
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
              </Table>
              <div className="text-center mx-auto">
                <CustomButton
                  text="Submit Batch"
                  color="primary"
                  onClick={() => submitBatchData()}
                />
              </div>
            </Col>
          </Row>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </Container>
  );
}

export default RelocationRequest;
