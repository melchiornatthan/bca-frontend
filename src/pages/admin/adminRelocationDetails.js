import React, { useEffect, useState } from "react";
import { Container, Breadcrumb } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";
import axios from "../../axiosConfig";
import RelocationDetailService from "../../components/relocationDetailsLayout";
import { RiHome6Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { getRelocationById } from "../../service/getRelocationbyID";

function AdminRelocationDetails() {
  const [data, setData] = useState({});
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const int_id = parseInt(searchParams.get("id"), 10);
  const navigate = useNavigate();

  useEffect(() => {
   getRelocationById(int_id, setData);
  }, [int_id]);

  

  const updateRequestStatus = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to approve this request?"
    );

    if (confirmed) {
      const body = {
        installation_id: data.installation_id,
        new_location: data.new_location,
        new_address: data.new_address,
        id: id,
        new_area: data.new_area,
        new_branch_pic: data.new_branch_pic,
        new_communication: data.new_communication,
        new_area_id: data.new_area_id,
      };

      await axios
        .put(`update-relocations/`, body)
        .then((response) => {
         navigate("/admin/relocationHistory/relocationBatch?batchid=" + data.batchid + "");
        })
        .catch((error) => {
          console.error("Error updating installation data:", error);
        });
    }
  };

  return (
    <Container fluid className="py-1">
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
          <Breadcrumb.Item>
            <a
              className="link-body-emphasis fw-semibold text-decoration-none"
              onClick={() => navigate(`/admin/relocationHistory/relocationBatch?batchid=${data.batchid}`)}
            >
              Batch
            </a>
          </Breadcrumb.Item>
          <Breadcrumb.Item active aria-current="page">
            Details
          </Breadcrumb.Item>
        </Breadcrumb>
      </Container>
      
      <RelocationDetailService
        batchdata={data}
        
        updateRequestStatus={updateRequestStatus}
      />
    </Container>
  );
}

export default AdminRelocationDetails;
