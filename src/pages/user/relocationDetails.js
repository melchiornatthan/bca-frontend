import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { Container, Breadcrumb } from 'react-bootstrap';
import { useLocation } from "react-router-dom";
import axios from "../../axiosConfig";
import RelocationDetailService from "../components/relocationDetailsService";
import "typeface-inter";
import { RiHome6Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

function RelocationDetails() {
  const [data, setData] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  // Parse the URL parameters and extract the 'data' parameter
  const searchParams = new URLSearchParams(location.search);
  const int_id = parseInt(searchParams.get("id"), 10);

  useEffect(() => {
    getRelocationData();
  }, [int_id]);

  const getRelocationData = async () => {
    try {
      const response = await axios.get("relocations/" + int_id + "");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching location data:", error);
    }
  };

  return (
    <Container fluid>
      <Container className="my-3">
        <Breadcrumb className="breadcrumb-chevron p-3">
          <Breadcrumb.Item>
            <RiHome6Fill onClick={() =>navigate("/user")} />
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <a
              className="link-body-emphasis fw-semibold text-decoration-none"
              onClick={() => navigate("/user/relocationHistory")}
            >
              History
            </a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <a
              className="link-body-emphasis fw-semibold text-decoration-none"
              onClick={() => navigate(`/user/relocationHistory/relocationBatch?batchid=${data.batchid}`)} 
            >
              Batch
            </a>
          </Breadcrumb.Item>
          <Breadcrumb.Item active aria-current="page">
            Details
          </Breadcrumb.Item>
        </Breadcrumb>
      </Container>
      <RelocationDetailService batchdata={data}  className="my-5" />
    </Container>
  );
}

export default RelocationDetails;
