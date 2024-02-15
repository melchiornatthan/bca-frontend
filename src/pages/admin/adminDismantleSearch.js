import axios from "../../axiosConfig";
import { useState, useEffect } from "react";
import "typeface-inter";
import { Container, Breadcrumb, Row, Col } from "react-bootstrap";
import { RiHome6Fill } from "react-icons/ri";
import Navbar from "../../components/navbar";
import DismantleServiceTable from "../../components/dismantleBatchTable";
import InputWithLabel from "../../components/input";
import { useNavigate } from "react-router-dom";
import { getBatchDismantle } from "../../service/getBatchDismantle";

function AdminDismantleSearch() {
  const [data, setData] = useState([]);
  const [batchid, setBatchId] = useState("");
  const navigate = useNavigate();
  const handleInputChange = (event, setStateFunction) => {
    setStateFunction(event.target.value);
  };

  useEffect(() => {
    getBatchDismantle('2', setData);
  }, []);

  useEffect(() => {
    getBatchDismantle(batchid, setData);
  }, [batchid]);

  return (
    <Container fluid className="pt-3">
      <Container className="my-3">
        <Breadcrumb className="breadcrumb-chevron p-3">
          <Breadcrumb.Item>
            <RiHome6Fill onClick={() => navigate("/admin")}/>
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
          <DismantleServiceTable batchdata={data}  />
        </Col>
      </Row>
    </Container>
  );
}

export default AdminDismantleSearch;
