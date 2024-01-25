import axios from "../../axiosConfig";
import { useState, useEffect } from "react";
import { Container, Breadcrumb, Row, Col, Form, Button } from "react-bootstrap";
import { RiHome6Fill } from "react-icons/ri";
import Navbar from "../components/navbar";
import BatchTable from "../components/installationBatchService";
import InputWithLabel from "../components/input";
import "typeface-inter";

function InstallationBatch() {
  const [installationData, setInstallationData] = useState([]);
  const [batchid, setBatchId] = useState("");

  useEffect(() => {
    getInstallationData();
  }, []);

  const handleInputChange = (event, setStateFunction) => {
    setStateFunction(event.target.value);
  };

  const getInstallationDatabyBatchID = () => {
    axios
      .get("getBatchInstallations/" + batchid + "")
      .then((response) => {
        setInstallationData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching location data:", error);
      });
  };

  const getInstallationData = () => {
    axios
      .get("getBatchInstallations/" + 2 + "")
      .then((response) => {
        setInstallationData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching location data:", error);
      });
  };

  useEffect(() => {
    getInstallationDatabyBatchID();
  }, [batchid]);

  return (
    <Container fluid className='py-3'>
      <Navbar />
      <Container className='my-3'>
        <Breadcrumb className='breadcrumb-chevron p-3'>
          <Breadcrumb.Item>
            <RiHome6Fill onClick={() => (window.location.href = "/main")} />
          </Breadcrumb.Item>
          <Breadcrumb.Item active aria-current='page'>
            History
          </Breadcrumb.Item>
        </Breadcrumb>
      </Container>
      <Container className='my-5 text-center'>
        <h1
          style={{
            fontFamily: "inter",
            color: "#219C90",
            fontWeight: "bold",
            fontSize: "6vh",
          }}
        >
          Installation Requests
        </h1>
      </Container>
      <Container style={{ width: "45%" }}>
        <InputWithLabel
          label='Enter Batch ID'
          value={batchid}
          placeholder='Enter the installation Batch ID'
          onChange={(e) => handleInputChange(e, setBatchId)}
        />
      </Container>
      <Container className='my-5'>
        <BatchTable batchdata={installationData} isAdmin={false} />
      </Container>
    </Container>
  );
}

export default InstallationBatch;
