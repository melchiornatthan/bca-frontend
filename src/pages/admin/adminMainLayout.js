// MainLayout.js

import React from "react";
import "typeface-inter";
import { Container, Row, Col } from "react-bootstrap";
import Navbar from "../components/navbar";
import { Outlet } from 'react-router-dom';
import Sidebar from "../components/sidebar";

function AdminMainLayout() {

  return (
    <div>
      <Row>
        <Col md={2} className=" d-none d-sm-none d-md-none d-lg-block d-xl-block d-xxl-block">
          <Sidebar />
        </Col>
        <Col>
          <Navbar />
          <Outlet />
        </Col>
      </Row>
    </div>
  );
}

export default AdminMainLayout;
