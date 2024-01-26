import axios from "../../axiosConfig";
import { useState, useEffect } from "react";
import { Container, Breadcrumb } from "react-bootstrap";
import RelocationBatchTable from "../components/relocationService";
import InputWithLabel from "../components/input";
import { RiHome6Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
function AdminRelocationSearch() {
  const [relocationData, setRelocationData] = useState([]);
  const [batchid, setBatchId] = useState("");
  const navigate = useNavigate();
  const handleInputChange = (event, setStateFunction) => {
    setStateFunction(event.target.value);
  };

  useEffect(() => {
    getRelocations();
  }, []);

  const getRelocationByBatchID = () => {
    axios
      .get("getBatchRelocation/" + batchid + "")
      .then((response) => {
        console.log(response.data);
        setRelocationData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching location data:", error);
      });
  };

  const getRelocations = () => {
    axios
      .get("getBatchRelocation/" + 2 + "")
      .then((response) => {
        console.log(response.data);
        setRelocationData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching location data:", error);
      });
  };

  useEffect(() => {
    getRelocationByBatchID();
  }, [batchid]);

  return (
    <Container fluid className="pt-3">
    <Container className="my-3">
        <Breadcrumb className="breadcrumb-chevron p-3">
          <Breadcrumb.Item>
            <RiHome6Fill onClick={() => navigate("/admin")} />
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
      <Container className="mt-5">
        <RelocationBatchTable batchdata={relocationData} isAdmin={true} />
      </Container>
    </Container>
  );
}

export default AdminRelocationSearch;
