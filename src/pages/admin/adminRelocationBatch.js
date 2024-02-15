import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Container, Breadcrumb } from "react-bootstrap";
import RelocationByBatchIdTable from "../../components/relocationDetailTable";
import { RiHome6Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { getRelocationsbyBatchID } from "../../service/getRelocationbyBatchID";

function AdminRelocationBatch() {
  const [data, setData] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const batchid = parseInt(searchParams.get("batchid"), 10);
  const navigate = useNavigate();

  useEffect(() => {
    getRelocationsbyBatchID(batchid, setData);
  }, [batchid]);

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
              onClick={() => navigate("/admin/relocationHistory")}
            >
              History
            </a>
          </Breadcrumb.Item>
          <Breadcrumb.Item active aria-current="page">
            Batch
          </Breadcrumb.Item>
        </Breadcrumb>
      </Container>
      <Container>
        <RelocationByBatchIdTable batchdata={data} />
      </Container>
    </Container>
  );
}

export default AdminRelocationBatch;
