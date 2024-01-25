import axios from "../../axiosConfig";
import { useState, useEffect } from "react";
import "typeface-inter";
import { Container, Breadcrumb, Row, Col } from "react-bootstrap";
import { RiHome6Fill } from "react-icons/ri";
import Navbar from "../components/navbar";
import DismantleServiceTable from "../components/DismantleService";
import InputWithLabel from "../components/input";

function AdminDismantleHistory() {
  const [data, setData] = useState([]);
  const [batchid, setBatchId] = useState("");

  const handleInputChange = (event, setStateFunction) => {
    setStateFunction(event.target.value);
  };

  useEffect(() => {
    getDismantles();
  }, []);

  const getDismantleByBatchID = () => {
    axios
      .get("getBatchDismantle/" + batchid + "")
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching location data:", error);
      });
  };

  const getDismantles = () => {
    axios
      .get("getBatchDismantle/" + 2 + "")
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching location data:", error);
      });
  };

  useEffect(() => {
    getDismantleByBatchID();
  }, [batchid]);

  return (
    <Container fluid className="pt-3">
      <Navbar />
      <Container className="my-3">
        <Breadcrumb className="breadcrumb-chevron p-3">
          <Breadcrumb.Item>
            <RiHome6Fill onClick={() => window.location.href = "/admin/main"}/>
          </Breadcrumb.Item>
          <Breadcrumb.Item active aria-current="page">
            History
          </Breadcrumb.Item>
        </Breadcrumb>
      </Container>
      <Container className="my-5 text-center">
        <h1
          style={{
            fontFamily: "inter",
            color: "#D83F31",
            fontWeight: "bold",
            fontSize: "6vh",
          }}
        >
          Dismantle Requests
        </h1>
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
          <DismantleServiceTable batchdata={data} isAdmin={true} />
        </Col>
      </Row>
    </Container>
  );
}

export default AdminDismantleHistory;
