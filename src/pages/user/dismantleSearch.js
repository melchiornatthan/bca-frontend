import axios from "../../axiosConfig";
import { useState, useEffect } from "react";
import { Container, Breadcrumb, Form } from "react-bootstrap";
import "typeface-inter";
import DismantleServiceTable from "../components/dismantleService";
import InputWithLabel from "../components/input";
import { useNavigate } from "react-router-dom";
import { RiHome6Fill } from "react-icons/ri";

function DismantleSearch() {
  const [data, setData] = useState([]);
  const [batchid, setBatchId] = useState("");
  const navigate = useNavigate();
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
    <Container fluid>
      <Container className="my-3">
        <Breadcrumb className="breadcrumb-chevron p-3">
          <Breadcrumb.Item>
            <RiHome6Fill onClick={() => navigate("/user")} />
          </Breadcrumb.Item>
          <Breadcrumb.Item active aria-current="page">
            History
          </Breadcrumb.Item>
        </Breadcrumb>
      </Container>
      <Container style={{ width: "45%" }}>
        <Form>
          <InputWithLabel
            label="Enter Batch ID"
            value={batchid}
            name="pic"
            placeholder="Enter the dismantle Batch ID"
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

export default DismantleSearch;
