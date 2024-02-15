import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomButton from "../../components/button";
import InputWithLabel from "../../components/input";
import VsatSelect from "../../components/communication";
import { RiHome6Fill } from "react-icons/ri";
import SelectLocation from "../../components/locations";
import { MdDeleteForever } from "react-icons/md";
import {
  Container,
  Breadcrumb,
  Row,
  Col,
  Table,
  Button,
} from "react-bootstrap";
import "typeface-karma";
import { useNavigate } from "react-router-dom";
import { getInstallationBatchId } from "../../service/getInstallationBatchID";
import { getLocationData } from "../../service/getLocationData";
import { getSpecialLocationData } from "../../service/getSpecialLocationData";
import { submitInstallationRequest } from "../../service/submitInstallationRequest";

function InstallationRequest() {
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [pic, setPic] = useState("");
  const [area, setArea] = useState("Jakarta");
  const [specialLocations, setSpecialLocations] = useState([]);
  const [locationData, setLocationData] = useState([]);
  const [communication, setCommunication] = useState("VSAT");
  const [batchData, setBatchData] = useState([]);
  const [submittedRequests, setSubmittedRequests] = useState([]);
  const [province, setProvince] = useState("Jawa Barat");
  const [batchId, setBatchId] = useState(200000000);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const newBatchId = await getInstallationBatchId();
        setBatchId(newBatchId);

        const locationData = await getLocationData();
        setLocationData(locationData);

        const specialLocationData = await getSpecialLocationData();
        setSpecialLocations([...specialLocationData, { location: "NA" }]);
        setArea(specialLocationData[0].location);
      } catch (error) {
        console.error("Error initializing data:", error);
      }
    }

    fetchData();
  }, []);

  const handleInputChange = (event, setStateFunction) => {
    setStateFunction(event.target.value);
  };

  const handleSubmit = () => {
    // Validation logic
    if (!location || !address || !pic || !area || !communication) {
      toast.error("Please fill in all input fields.");
      return;
    }

    const requestData = {
      location,
      address,
      branch_pic: pic,
      area: area === "NA" ? province : area,
      communication,
    };

    setBatchData([...batchData, requestData]);
    setSubmittedRequests([...submittedRequests, requestData]);
    setLocation("");
    setAddress("");
    setPic("");
  };

  const handleDeleteRow = (requestToDelete) => {
    const updatedSubmittedRequests = submittedRequests.filter(
      (request) => request !== requestToDelete
    );
    setSubmittedRequests(updatedSubmittedRequests);

    const updatedBatchData = batchData.filter(
      (request) => request !== requestToDelete
    );
    setBatchData(updatedBatchData);
  };

  const submitBatchData = async () => {
    try {
      if (batchData.length === 0) {
        toast.error("No data to submit.");
        return;
      }

      for (const data of batchData) {
        data.batchid = batchId;
        const response = await submitInstallationRequest(data);

        if (response.message === "No provider available") {
          throw new Error(
            `Threshold limit reached for ${data.area}, please contact the Administrator.`
          );
        }
      }

      toast.success("Installation requests submitted successfully.");
      setBatchData([]);
      setSubmittedRequests([]);
      setBatchId(await getInstallationBatchId());
    } catch (error) {
      console.error("Error submitting batch data:", error);
      toast.error("Error submitting installation requests.");
    }
  };

  return (
    <Container fluid className="pt-3">
      <Container className="my-3">
        <Breadcrumb className="breadcrumb-chevron p-3 rounded-3">
          <Breadcrumb.Item onClick={() => navigate("/user")}>
            <RiHome6Fill />
          </Breadcrumb.Item>
          <Breadcrumb.Item active aria-current="page">
            Installation Request
          </Breadcrumb.Item>
        </Breadcrumb>
      </Container>

      <div
        style={{ borderRadius: "5px", width: "90%", padding: "3vh" }}
        className="mx-auto"
      >
        <Row className="mx-auto">
          <Col sm className="mx-auto my-auto">
            <InputWithLabel
              label="Location"
              value={location}
              name="location"
              placeholder="Enter the location"
              onChange={(e) => handleInputChange(e, setLocation)}
            />
          </Col>
          <Col sm className="mx-auto my-auto">
            <InputWithLabel
              label="Address"
              value={address}
              name="address"
              placeholder="Enter the address"
              onChange={(e) => handleInputChange(e, setAddress)}
            />
          </Col>
          <Col sm className="mx-auto my-auto">
            <SelectLocation
              options={specialLocations}
              label="Select the City"
              value={area}
              onChange={(e) => handleInputChange(e, setArea)}
            />
          </Col>
          {area === "NA" && (
            <Col sm className="mx-auto my-auto">
              <SelectLocation
                options={locationData}
                label="Select the Province"
                value={province}
                onChange={(e) => handleInputChange(e, setProvince)}
              />
            </Col>
          )}
          <Col sm className="mx-auto my-auto">
            <InputWithLabel
              label="Branch PIC"
              value={pic}
              name="pic"
              placeholder="Enter the Branch PIC"
              onChange={(e) => handleInputChange(e, setPic)}
            />
          </Col>
          <Col sm className="mx-auto my-auto">
            <label htmlFor="communication" style={{ fontFamily: "karma" }}>
              Communication
            </label>
            <VsatSelect
              value={communication}
              onChange={(e) => handleInputChange(e, setCommunication)}
            />
          </Col>
          <Col sm className="mx-auto" style={{ marginTop: "3vh" }}>
            <CustomButton text="Add" color="primary" onClick={handleSubmit} />
          </Col>
        </Row>
      </div>

      {submittedRequests.length > 0 && (
        <div
          className="mx-auto mt-3"
          style={{ borderRadius: "5px", padding: "2vh", width: "90%" }}
        >
          <Row className="mx-auto">
            <Col md>
              <Table
                striped
                bordered
                hover
                className="table table-hover mx-auto"
              >
                <thead>
                  <tr>
                    <th>Location</th>
                    <th>Address</th>
                    <th>Area</th>
                    <th>Branch PIC</th>
                    <th>Communication</th>
                    <th>Delete</th>
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
                          <Button
                            variant="danger"
                            size="md"
                            onClick={() => handleDeleteRow(request)}
                          >
                            <MdDeleteForever style={{ fontSize: "2vh" }} />
                          </Button>
                        </td>
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

export default InstallationRequest;
