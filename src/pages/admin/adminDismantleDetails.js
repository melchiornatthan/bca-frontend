import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Container, Breadcrumb } from "react-bootstrap";
import axios from "../../axiosConfig";
import DismantleDetailsService from "../../components/dismantleDetailsLayout";
import { RiHome6Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { getAtmById } from "../../service/getAtmByID";

function AdminDismantleDetails() {
  const [data, setData] = useState({});
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const int_id = parseInt(searchParams.get("id"), 10);
  const dismantle_id = parseInt(searchParams.get("dismantle_id"), 10);
  const batchid = parseInt(searchParams.get("batchid"), 10);
  const navigate = useNavigate();

  useEffect(() => {
    getAtmById(int_id, setData);
    console.log(batchid);
  }, [int_id]);

  const updateRequestStatus = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to approve this request?"
    );

    if (confirmed) {
      const body = {
        id: dismantle_id,
        installation_id: data.id,
      };
      try {
        await axios.put(`update-dismantle/`, body);
        navigate(`/admin/dismantleHistory/dismantleBatch?batchid=${batchid}`);
      } catch (error) {
        console.error("Error updating installation data:", error);
      }
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
            <span
              className="link-body-emphasis fw-semibold text-decoration-none"
              onClick={() => navigate("/admin/dismantleHistory")}
            >
              History
            </span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <span
              className="link-body-emphasis fw-semibold text-decoration-none"
              onClick={() =>
                navigate(
                  `/admin/dismantleHistory/dismantleBatch?batchid=${batchid}`
                )
              }
            >
              Batch
            </span>
          </Breadcrumb.Item>
          <Breadcrumb.Item active aria-current="page">
            Details
          </Breadcrumb.Item>
        </Breadcrumb>
      </Container>

      <DismantleDetailsService
        batchdata={data}
        updateRequestStatus={updateRequestStatus}
      />
    </Container>
  );
}

export default AdminDismantleDetails;
