import axios from "../../axiosConfig";
import { useState, useEffect } from "react";
import { Container, Breadcrumb, Row, Col } from "react-bootstrap";
import "typeface-inter";
import { RiHome6Fill } from "react-icons/ri";
import Navbar from "../components/navbar";
import BatchTable from "../components/installationBatchService";
import InputWithLabel from "../components/input";
import { useNavigate } from "react-router-dom";

function AdminInstallationSearch() {
  const [installationData, setInstallationData] = useState([]);
  const [batchid, setBatchId] = useState("");
  const navigate = useNavigate(); 
  useEffect(() => {
    getInstallations();
  }, []);

  const handleInputChange = (event, setStateFunction) => {
    setStateFunction(event.target.value);
  };

  const getInstallationByBatchID = () => {
    axios
      .get("getBatchInstallations/" + batchid + "")
      .then((response) => {
        console.log(response.data);
        setInstallationData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching location data:", error);
      });
  };

  const getInstallations = () => {
    axios
      .get("getBatchInstallations/" + 2 + "")
      .then((response) => {
        console.log(response.data);
        setInstallationData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching location data:", error);
      });
  };

  useEffect(() => {
    getInstallationByBatchID();
  }, [batchid]);

  return (
    <Container fluid className="pt-3">
      <Container className="my-3">
        <Breadcrumb className="breadcrumb-chevron p-3">
          <Breadcrumb.Item>
            <RiHome6Fill onClick={() =>navigate("/admin")}/>
          </Breadcrumb.Item>
          <Breadcrumb.Item active aria-current="page">
            History
          </Breadcrumb.Item>
        </Breadcrumb>
      </Container>
      <Container className="w-50">
        <InputWithLabel
          label="Enter Batch ID"
          value={batchid}
          name="pic"
          placeholder="Enter the installation location"
          onChange={(e) => handleInputChange(e, setBatchId)}
        />
      </Container>
      <Row className="mt-5">
        <Col>
          <BatchTable batchdata={installationData} />
        </Col>
      </Row>
      </Container>
  );
}

export default AdminInstallationSearch;
