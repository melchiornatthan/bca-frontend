import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Container, Breadcrumb } from "react-bootstrap";
import axios from "../../axiosConfig";
import DismantleByBatchIdTable from "../components/dismantleBatchService";
import Navbar from "../components/navbar";
import { RiHome6Fill } from "react-icons/ri";

function AdminDismantleBatch() {
  const [data, setData] = useState([]);
  const location = useLocation();

  // Parse the URL parameters and extract the 'data' parameter
  const searchParams = new URLSearchParams(location.search);
  const batchid = parseInt(searchParams.get("batchid"), 10);

  useEffect(() => {
    getRelocationData();
  }, [batchid]);

  const getRelocationData = async () => {
    try {
      const response = await axios.get(`getDismantlebyBatchID/${batchid}`);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching location data:", error);
    }
  };

  return (
    <Container fluid className="pt-3">
      <Navbar />
      <Container className="my-3">
        <Breadcrumb>
          <Breadcrumb.Item onClick={() => window.location.href = "/admin/main"}>
            <RiHome6Fill />
          </Breadcrumb.Item>
          <Breadcrumb.Item href="/admin/dismantleHistory">History</Breadcrumb.Item>
          <Breadcrumb.Item active aria-current="page">
            Batch
          </Breadcrumb.Item>
        </Breadcrumb>
      </Container>

      <Container className="text-center mt-5" style={{ fontFamily: "inter" }}>
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

      <DismantleByBatchIdTable batchdata={data} isAdmin={true} />
    </Container>
  );
}

export default AdminDismantleBatch;
