import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Container, Breadcrumb, Row, Col } from "react-bootstrap";
import axios from "../../axiosConfig";
import InstallationService from "../../components/installationDetailTable";
import { RiHome6Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
function AdminBatchDetails() {
  const [data, setData] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  // Parse the URL parameters and extract the 'data' parameter
  const searchParams = new URLSearchParams(location.search);
  const batchid = parseInt(searchParams.get("batchid"), 10);

  useEffect(() => {
    getInstallationData();
  }, [batchid]);

  const getInstallationData = async () => {
    await axios
      .get("getInstallationsbyBatchID/" + batchid + "")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching location data:", error);
      });
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
              onClick={() => navigate("/admin/installationHistory")}
            >
              History
            </a>
          </Breadcrumb.Item>
          <Breadcrumb.Item active aria-current="page">
            Details
          </Breadcrumb.Item>
        </Breadcrumb>
      </Container>
      <Container className="py-1 mx-auto text-center">
        <Row>
          <Col>
            <InstallationService installationData={data} isAdminView={true} />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default AdminBatchDetails;
