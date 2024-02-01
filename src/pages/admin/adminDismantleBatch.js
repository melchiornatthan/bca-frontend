import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Container, Breadcrumb } from "react-bootstrap";
import axios from "../../axiosConfig";
import DismantleByBatchIdTable from "../components/dismantleBatchService";
import { RiHome6Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

function AdminDismantleBatch() {
  const [data, setData] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
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
      <Container className="my-3">
      <Breadcrumb className="breadcrumb-chevron p-3">
          <Breadcrumb.Item>
            <RiHome6Fill onClick={() => navigate("/admin")} />
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <a
              className="link-body-emphasis fw-semibold text-decoration-none"
              onClick={() => navigate("/admin/dismantleHistory")} 
            >
              History
            </a>
          </Breadcrumb.Item>
          <Breadcrumb.Item active aria-current="page">
            Batch
          </Breadcrumb.Item>
        </Breadcrumb>
      </Container>

      <DismantleByBatchIdTable batchdata={data}  />
    </Container>
  );
}

export default AdminDismantleBatch;
