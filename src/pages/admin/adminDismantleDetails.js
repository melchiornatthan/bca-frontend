import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Container, Breadcrumb } from "react-bootstrap";
import axios from "../../axiosConfig";
import DismantleDetailsService from "../components/dismantleDetailsService";
import { RiHome6Fill } from "react-icons/ri";
import Navbar from "../components/navbar";

function AdminDismantleDetails() {
  const [data, setData] = useState({});
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const int_id = parseInt(searchParams.get("id"), 10);
  const dismantle_id = parseInt(searchParams.get("dismantle_id"), 10);
  const batchid = parseInt(searchParams.get("batchid"), 10);

  useEffect(() => {
    getRelocationData();
  }, [int_id]);

  const getRelocationData = async () => {
    try {
      const response = await axios.get(`installationsById/${int_id}`);
      setData(response.data[0]);
    } catch (error) {
      console.error("Error fetching location data:", error);
    }
  };

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
        const response = await axios.put(`update-dismantle/`, body);
        window.location.href = `/admin/dismantleBatch?batchid=${batchid}`;
      } catch (error) {
        console.error("Error updating installation data:", error);
      }
    }
  };

  return (
    <Container fluid className="pt-3">
      <Navbar />
      <Container className="my-3">
        <Breadcrumb>
          <Breadcrumb.Item onClick={() => window.location.href = "/admin/main"}>
            <RiHome6Fill />
          </Breadcrumb.Item>
          <Breadcrumb.Item href="/admin/dismantleHistory">History</Breadcrumb.Item>
          <Breadcrumb.Item href={`/admin/dismantleBatch?batchid=${batchid}`}>
            Batch
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
            color: "#D83F31",
            fontWeight: "bold",
            fontSize: "6vh",
          }}
        >
          Dismantle Requests
        </h1>
      </Container>

      <DismantleDetailsService
        batchdata={data}
        isAdmin={true}
        updateRequestStatus={updateRequestStatus}
      />
    </Container>
  );
}

export default AdminDismantleDetails;
