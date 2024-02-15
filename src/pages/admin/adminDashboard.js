import React from "react";
import "typeface-inter";
import { Container, Row, Col } from "react-bootstrap";
import ProviderCount from "../../components/providerCount";
import RequestCount from "../../components/requestCount";

function AdminDashboard() {

  return (
    <Container>
    <Row className="mx-auto centered-row">
      <Col md className="mx-2">
        <RequestCount/>
      </Col>
      <Col
        md
        style={{
          marginTop: "1vh",
          marginBottom: "1vh",
          backgroundColor: "#FFFFFF",
          borderRadius: "1vh",
          paddingBottom: "3vh",
        }}
      >
        <ProviderCount/>
      </Col>
    </Row>
    </Container>
  );
}

export default AdminDashboard;
