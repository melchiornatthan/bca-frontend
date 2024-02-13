import React, { useEffect } from "react";
import InputWithLabel from "../../components/input";
import { useState } from "react";
import axios from "../../axiosConfig";
import InstallationSearchTable from "../../components/searchInstallationTable";
import CustomButton from "../../components/button";
import { RiHome6Fill } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import { Container, Breadcrumb, Row, Col, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function DismantleRequest() {
  const [location, setLocation] = useState("");
  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState();
  const [batchId, setBatchId] = useState(generateBatchId());
  const [batchData, setBatchData] = useState([]);
  const [submittedRequests, setSubmittedRequests] = useState([]);
  const [isHoveredSecond, setIsHoveredSecond] = useState(false);
  const navigate = useNavigate();
  const handleSelect = (id) => {
    fetchInstallationbyId(id);
    console.log(batchId);
  };

  async function generateBatchId() {
    await axios
      .get("getDismantleBatchId")
      .then((response) => {
        if (response.data == null) {
          setBatchId(200000000);
        } else {
          const currentBatchId = parseInt(response.data.batchid, 10);
          setBatchId(currentBatchId + 1);
        }
      })
      .catch((error) => {
        console.error("Error fetching location data:", error);
      });
  }

  const handleInputChange = (event, setStateFunction) => {
    setStateFunction(event.target.value);
  };
  useEffect(() => {
    fetchInstallationData();
  }, [location]);

  const handleSubmit = () => {
    const requestData = {
      installation_id: selectedData.id,
      location: selectedData.location,
      address: selectedData.address,
      area: selectedData.area,
      branch_pic: selectedData.branch_pic,
      communication: selectedData.communication,
    };

    setBatchData([...batchData, requestData]);
    setSubmittedRequests([...submittedRequests, requestData]);
    setSelectedData();
    setData([]);
  };

  // Submit batch data
  const submitBatchData = async () => {
    if (batchData.length === 0) {
      return; // No data to submit
    }

    try {
      generateBatchId();
      let date = new Date();
      console.log(batchId);
      for (let i = 0; i < batchData.length; i++) {
        batchData[i].batchid = batchId;
        batchData[i].createdAt = date;
        const requestData = batchData[i];
        const body = {
          installation_id: requestData.installation_id,
          batchid: requestData.batchid,
          createdAt: requestData.createdAt,
        };
        console.log(batchId);
        await axios.post("dismantle-request", body);
      }
      toast.success("Request submitted successfully");
      setBatchData([]); // Clear the batch data
      setSubmittedRequests([]); // Clear the previous requests
      setBatchId(generateBatchId());
      setSelectedData(null);
      setData([]);
    } catch (error) {
      console.error("Error submitting batch data:", error);
      toast.error("Error submitting batch data");
    }
  };

  const fetchInstallationData = async () => {
    try {
      const response = await axios.get(`locationByArea/${location}`);
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
    <Container fluid className="pt-3">
      <Container className="my-3">
        <Breadcrumb className="breadcrumb-chevron p-3">
          <Breadcrumb.Item onClick={() => navigate("/user")}>
            <RiHome6Fill />
          </Breadcrumb.Item>
          <Breadcrumb.Item active aria-current="page">
            Dismantle Request
          </Breadcrumb.Item>
        </Breadcrumb>
      </Container>
      <Row className="py-5 w-75 mx-auto">
        <Col>
          <InputWithLabel
            label="Select Installation"
            value={location}
            name="pic"
            placeholder="Enter the installation location"
            onChange={(e) => handleInputChange(e, setLocation)}
          />
        </Col>
        <Col>
          <div className="mx-auto">
            <InstallationSearchTable batchdata={data} onSelect={handleSelect} />
          </div>
        </Col>
      </Row>

      {selectedData && (
        <div>
          <Row className="py-5 w-75 mx-auto">
            <Col>
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
            <Col>
              <div className="form-group">
                <InputWithLabel
                  isDisabled={true}
                  label="Branch PIC"
                  value={selectedData.branch_pic}
                  name="pic"
                />
                <InputWithLabel
                  isDisabled={true}
                  label="Communication"
                  value={selectedData.communication}
                  name="communication"
                />
                <InputWithLabel
                  isDisabled={true}
                  label="Provider"
                  value={selectedData.provider}
                  name="provider"
                />
              </div>
            </Col>
          </Row>

          <Row className="mx-auto text-center">
            <Col>
              <CustomButton
                text="Submit"
                color="primary"
                onClick={handleSubmit}
              />
            </Col>
          </Row>
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
          <Row className="py-4 mx-auto">
            <Col className="text-center">
              <h2>Submitted Requests</h2>
              <Table striped bordered hover className="my-3">
                <thead>
                  <tr>
                    <th>Location</th>
                    <th>Address</th>
                    <th>Area</th>
                    <th>Branch PIC</th>
                    <th>Communication</th>
                  </tr>
                </thead>
                <tbody>
                  {submittedRequests.map((request, index) => (
                    <tr key={index}>
                      <td>{request.location}</td>
                      <td>{request.address}</td>
                      <td>{request.area}</td>
                      <td>{request.branch_pic}</td>
                      <td>{request.communication}</td>
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

export default DismantleRequest;
