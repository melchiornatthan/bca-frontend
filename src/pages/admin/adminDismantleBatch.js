import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Container, Breadcrumb } from "react-bootstrap";
import DismantleByBatchIdTable from "../../components/dismantleDetailTable";
import { RiHome6Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { getDismantleDataByBatchID } from "../../service/getDismantlebyBatchID";

/**
 * AdminDismantleBatch Component displays the dismantles by batch ID for the admin.
 * @returns {JSX.Element} - AdminDismantleBatch component.
 */
function AdminDismantleBatch() {
  const [data, setData] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const batchid = parseInt(searchParams.get("batchid"), 10);

  useEffect(() => {
    getDismantleDataByBatchID(batchid, setData);
  }, [batchid]);

  const handleHistoryClick = () => {
    navigate("/admin/dismantleHistory");
  };

  return (
    <Container fluid className="pt-3">
      <Container className="my-3">
        <Breadcrumb className="breadcrumb-chevron p-3">
          <Breadcrumb.Item>
            <RiHome6Fill onClick={() => navigate("/admin")} />
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <span
              className="link-body-emphasis fw-semibold text-decoration-none"
              onClick={handleHistoryClick}
              style={{ cursor: "pointer" }}
            >
              History
            </span>
          </Breadcrumb.Item>
          <Breadcrumb.Item active aria-current="page">
            Batch
          </Breadcrumb.Item>
        </Breadcrumb>
      </Container>
      <DismantleByBatchIdTable batchdata={data} />
    </Container>
  );
}

export default AdminDismantleBatch; // Export AdminDismantleBatch component
