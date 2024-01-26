import axios from "../../axiosConfig";
import { useState, useEffect } from "react";
import { Container, Breadcrumb } from "react-bootstrap";
import RelocationBatchTable from "../components/relocationService";
import InputWithLabel from "../components/input";
import Navbar from "../components/navbar";
import { RiHome6Fill } from "react-icons/ri";

function AdminRelocationHistory() {
  const [relocationData, setRelocationData] = useState([]);
  const [batchid, setBatchId] = useState("");

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
    <Navbar />
    <Container className="my-3">
        <Breadcrumb className="breadcrumb-chevron p-3">
          <Breadcrumb.Item>
            <RiHome6Fill onClick={() => window.location.href = "/admin/main"} />
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
            color: "#E9B824",
            fontWeight: "bold",
            fontSize: "6vh",
          }}
        >
          Relocation Requests
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
      <Container className="mt-5">
        <RelocationBatchTable batchdata={relocationData} isAdmin={true} />
      </Container>
    </Container>
  );
}

export default AdminRelocationHistory;
