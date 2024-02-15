import { useState, useEffect } from "react";
import { Container, Breadcrumb } from "react-bootstrap";
import { RiHome6Fill } from "react-icons/ri";
import BatchTable from "../../components/installationBatchTable";
import InputWithLabel from "../../components/input";
import { useNavigate } from "react-router-dom";
import "typeface-inter";
import { getBatchInstallations } from "../../service/getBatchInstallations";

function InstallationSearch() {
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
    <Container>
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
        <InputWithLabel
          label="Enter Batch ID"
          value={batchid}
          placeholder="Enter the installation Batch ID"
          onChange={(e) => handleInputChange(e, setBatchId)}
        />
      </Container>
      <Container className="my-5">
        <BatchTable batchdata={installationData} />
      </Container>
    </Container>
  );
}

export default InstallationSearch;
