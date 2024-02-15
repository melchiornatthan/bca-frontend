import { useState, useEffect } from "react";
import { Container, Breadcrumb, Row, Col } from "react-bootstrap";
import "typeface-inter";
import { RiHome6Fill } from "react-icons/ri";
import BatchTable from "../../components/installationBatchTable";
import InputWithLabel from "../../components/input";
import { useNavigate } from "react-router-dom";
import { getBatchInstallations } from "../../service/getBatchInstallations";

function AdminInstallationSearch() {
  const [installationData, setInstallationData] = useState([]);
  const [batchid, setBatchId] = useState("");
  const navigate = useNavigate(); 
  useEffect(() => {
   getBatchInstallations('2', setInstallationData);
  }, []);

  const handleInputChange = (event, setStateFunction) => {
    setStateFunction(event.target.value);
  };

  useEffect(() => {
    getBatchInstallations(batchid, setInstallationData);
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
