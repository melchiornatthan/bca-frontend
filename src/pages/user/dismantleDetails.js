import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Container, Breadcrumb } from "react-bootstrap";
import DismantleDetailsService from "../../components/dismantleDetailsLayout";
import "typeface-inter";
import { RiHome6Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { getInstallationById } from "../../service/getInstallationbyID";

function DismantleDetails() {
  const [data, setData] = useState({});
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const int_id = parseInt(searchParams.get("id"), 10);
  const navigate = useNavigate();

  useEffect(() => {
   getInstallationById(int_id, setData);
  }, [int_id]);


  return (
    <Container fluid>
      <Breadcrumb className="breadcrumb-chevron p-3">
        <Breadcrumb.Item>
          <RiHome6Fill onClick={() => navigate("/user")} />
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <a
            className="link-body-emphasis fw-semibold text-decoration-none"
            onClick={() => navigate("/user/dismantleHistory")}
          >
            History
          </a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <a
            className="link-body-emphasis fw-semibold text-decoration-none"
            onClick={() =>
              navigate(
                `/user/dismantleHistory/dismantleBatch?batchid=${data.batchid}`
              )
            }
          >
            Batch
          </a>
        </Breadcrumb.Item>
        <Breadcrumb.Item active aria-current="page">
          Details
        </Breadcrumb.Item>
      </Breadcrumb>
      <DismantleDetailsService batchdata={data} />
    </Container>
  );
}

export default DismantleDetails;
