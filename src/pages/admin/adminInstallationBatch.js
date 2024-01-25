import axios from "../../axiosConfig";
import { useState, useEffect } from "react";
import { Container, Breadcrumb, Row, Col } from "react-bootstrap";
import "typeface-inter";
import { RiHome6Fill } from "react-icons/ri";
import Navbar from "../components/navbar";
import BatchTable from "../components/installationBatchService";
import InputWithLabel from "../components/input";

function AdminInstallationReq() {
  const [installationData, setInstallationData] = useState([]);
  const [batchid, setBatchId] = useState("");

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
        setInstallationData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching location data:", error);
      });
  };

  const getInstallations = () => {
    axios
      .get("getBatchInstallations/" + 2 + "") // 'xxx/getBatchInstallations/2
      .then((response) => {
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
    <Container fluid className='pt-3'>
      <Navbar />
      <Container className='my-3'>
        <Breadcrumb className='breadcrumb-chevron p-3'>
          <Breadcrumb.Item>
            <RiHome6Fill
              onClick={() => (window.location.href = "/admin/main")}
            />
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
      <Container className='w-50'>
        <InputWithLabel
          label='Enter Batch ID'
          value={batchid}
          name='pic'
          placeholder='Enter the installation location'
          onChange={(e) => handleInputChange(e, setBatchId)}
        />
      </Container>
      <Row className='mt-5'>
        <Col>
          <BatchTable batchdata={installationData} isAdmin={true} />
        </Col>
      </Row>
    </Container>
  );
}

export default AdminInstallationReq;
