import React, { useEffect } from "react";
import InputWithLabel from "../components/input";
import { useState } from "react";
import axios from "../../axiosConfig";
import InstallationSearchTable from "../components/searchInstallationTable";
import CustomButton from "../components/button";
import { RiHome6Fill } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "../components/navbar";
import Table from "react-bootstrap/Table";

function DismantleRequest() {
  const [location, setLocation] = useState("");
  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState();
  const [batchId, setBatchId] = useState(generateBatchId());
  const [batchData, setBatchData] = useState([]);
  const [submittedRequests, setSubmittedRequests] = useState([]);
  const [isHoveredSecond, setIsHoveredSecond] = useState(false);

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
    <div className="container-fluid pt-3">
     <Navbar/>
      <div className="container my-3">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb breadcrumb-chevron p-3">
            <li className="breadcrumb-item">
               <RiHome6Fill onClick={() => window.location.href = "/main"}/>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Dismantle Request
            </li>
          </ol>
        </nav>
      </div>
      <div className="text-center my-5">
        <h1 style={{ color: "#D83F31", fontWeight: "bold" }}>
          Dismantle Request
        </h1>
      </div>
      <div className="row py-5 w-75 mx-auto">
        <div className="col-md">
          <InputWithLabel
            label="Select Instalation"
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
        <div>
          <div className="row py-5 w-75 mx-auto">
            <div className="col-md">
              <div className="form-group">
                <InputWithLabel isDisabled={true}
                  label="Location"
                  value={selectedData.location}
                  name="location"
                />
                <InputWithLabel isDisabled={true}
                  label="Address"
                  value={selectedData.address}
                  name="address"
                />
              </div>
              <div>
                <InputWithLabel isDisabled={true}
                  label="Area"
                  value={selectedData.area}
                  name="area"
                />
              </div>
            </div>
            <div className="col-md">
              <div className="form-group">
                <InputWithLabel isDisabled={true}
                  label="Branch PIC"
                  value={selectedData.branch_pic}
                  name="pic"
                />
                <div>
                  <InputWithLabel isDisabled={true}
                    label="Communication"
                    value={selectedData.communication}
                    name="communication"
                  />
                </div>
                <div>
                  <InputWithLabel isDisabled={true}
                    label="Provider"
                    value={selectedData.provider}
                    name="provider"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row mx-auto text-center">
            <div className="col-md">
              <CustomButton
                text="Submit"
                color="primary"
                onClick={handleSubmit}
              />
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
            </div>
          </div>
        </div>
      )}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
}

export default DismantleRequest;
