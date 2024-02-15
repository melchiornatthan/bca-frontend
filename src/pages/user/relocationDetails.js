import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { Container, Breadcrumb } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import RelocationDetailService from "../../components/relocationDetailsLayout";
import "typeface-inter";
import { RiHome6Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { getRelocationById } from "../../service/getRelocationbyID";

function RelocationDetails() {
  const [data, setData] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const int_id = parseInt(searchParams.get("id"), 10);

  useEffect(() => {
    getRelocationById(int_id, setData);
  }, [int_id]);

  return (
    <Container fluid>
      <Container className="my-3">
        <Breadcrumb className="breadcrumb-chevron p-3">
          <Breadcrumb.Item>
            <RiHome6Fill onClick={() => navigate("/user")} />
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
              onClick={() =>
                navigate(
                  `/user/relocationHistory/relocationBatch?batchid=${data.batchid}`
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
      </Container>
      <RelocationDetailService batchdata={data} className="my-5" />
    </Container>
  );
}

export default RelocationDetails;
