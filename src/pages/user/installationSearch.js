import axios from "../../axiosConfig";
import { useState, useEffect } from "react";
import { Container, Breadcrumb } from "react-bootstrap";
import { RiHome6Fill } from "react-icons/ri";
import BatchTable from "../components/installationBatchService";
import InputWithLabel from "../components/input";
import { useNavigate } from "react-router-dom";
import "typeface-inter";

function InstallationSearch() {
  const [installationData, setInstallationData] = useState([]);
  const [batchid, setBatchId] = useState("");
  const navigate = useNavigate();
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
