// MainLayout.js

import React from "react";
import "typeface-inter";
import {  Row, Col } from "react-bootstrap";
import Navbar from "../../components/navbar";
import { Outlet } from 'react-router-dom';
import Sidebar from "../../components/sidebar";

function MainLayout() {

  return (
    <div>
    <Row>
      <Col
        md={2}
        className="d-none d-sm-none d-md-block d-lg-block d-xl-block d-xxl-block"
      >
        <Sidebar />
      </Col>
      <Col>
        <Navbar className="fixed-top"/>
        <div style={{ overflowY: "auto", maxHeight: "calc(100vh - 56px)" }}>
          <Outlet />
        </div>
      </Col>
    </Row>
  </div>
  );
}

export default MainLayout;
