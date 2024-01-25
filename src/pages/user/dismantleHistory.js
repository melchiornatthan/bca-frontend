import axios from "../../axiosConfig";
import { useState, useEffect } from "react";
import { Container, Breadcrumb, Form } from "react-bootstrap";
import "typeface-inter";
import DismantleServiceTable from "../components/DismantleService";
import InputWithLabel from "../components/input";
import Navbar from "../components/navbar";
import { RiHome6Fill } from "react-icons/ri";

function DismantleHistory() {
  const [data, setData] = useState([]);
  const [batchid, setBatchId] = useState("");

  const handleInputChange = (event, setStateFunction) => {
    setStateFunction(event.target.value);
  };

  useEffect(() => {
    getDismantleData();
  }, []);


  useEffect(() => {
    getDismantleDataByBatchID();
  }, [batchid]);

  const getDismantleDataByBatchID = () => {
    axios
      .get(`getBatchDismantle/${batchid}`)
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching location data:", error);
      });
  };

  const getDismantleData = () => {
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

  return (
    <Container fluid className="pt-3">
      <Navbar />
      <Container className="my-3">
        <Breadcrumb>
          <Breadcrumb.Item onClick={() => window.location.href = "/main"}>
            <RiHome6Fill />
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

      <Container style={{ width: "45%" }}>
        <Form>
          <InputWithLabel
            label="Enter Batch ID"
            value={batchid}
            name="pic"
            placeholder="Enter the installation location"
            onChange={(e) => handleInputChange(e, setBatchId)}
          />
        </Form>
      </Container>

      <Container className="my-5">
        <DismantleServiceTable batchdata={data} />
      </Container>
    </Container>
  );
}

export default DismantleHistory;
