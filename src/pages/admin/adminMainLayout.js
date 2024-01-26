import React from "react";
import "typeface-inter";
import { Container } from "react-bootstrap";
import Navbar from "../components/navbar";
import { Outlet } from 'react-router-dom';

function AdminMainLayout() {

  return (
    <Container fluid className="pt-3" style={{ backgroundColor: "#FFFFFF" }}>
      <Navbar />
      <Container fluid className="my-3">
        <Outlet />
      </Container>
    </Container>
  );
}

export default AdminMainLayout;
