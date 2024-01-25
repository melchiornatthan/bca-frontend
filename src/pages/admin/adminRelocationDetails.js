import React, { useEffect, useState } from "react";
import { Container, Breadcrumb } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";
import axios from "../../axiosConfig";
import RelocationDetailService from "../components/relocationDetailsService";
import Navbar from "../components/navbar";
import { RiHome6Fill } from "react-icons/ri";

function AdminRelocationDetails() {
  const [data, setData] = useState({});
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const int_id = parseInt(searchParams.get("id"), 10);

  useEffect(() => {
    getRelocationData();
  }, [int_id]);

  const getRelocationData = async () => {
    await axios
      .get("relocations/" + int_id + "")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching location data:", error);
      });
  };

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
          window.location.href = "/admin/relocationBatch?batchid=" + data.batchid + "";
        })
        .catch((error) => {
          console.error("Error updating installation data:", error);
        });
    }
  };

  return (
    <Container fluid className="py-3">
    <Navbar />
    <Container className="my-3">
        <Breadcrumb className="breadcrumb-chevron p-3">
          <Breadcrumb.Item>
            <RiHome6Fill onClick={() => window.location.href = "/admin/main"} />
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <a
              className="link-body-emphasis fw-semibold text-decoration-none"
              onClick={() => window.location.href = "/admin/relocationHistory"}
            >
              History
            </a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <a
              className="link-body-emphasis fw-semibold text-decoration-none"
              onClick={() => window.location.href = `/admin/relocationBatch?batchid=${data.batchid}`}
            >
              Batch
            </a>
          </Breadcrumb.Item>
          <Breadcrumb.Item active aria-current="page">
            Details
          </Breadcrumb.Item>
        </Breadcrumb>
      </Container>
      <Container className="text-center mt-5" style={{ fontFamily: "inter" }}>
        <h1
          style={{
            fontFamily: "inter",
            color: "#E9B824",
            fontWeight: "bold",
            fontSize: "6vh",
          }}
        >
          Relocation Requests
        </h1>
      </Container>
      <RelocationDetailService
        batchdata={data}
        isAdmin={true}
        updateRequestStatus={updateRequestStatus}
      />
    </Container>
  );
}

export default AdminRelocationDetails;
