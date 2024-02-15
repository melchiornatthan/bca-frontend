import React from "react";
import "typeface-inter";
import { Container, Row, Col } from "react-bootstrap";
import ProviderCount from "../../components/providerCount";
import RequestCount from "../../components/requestCount";

function Dashboard() {
  return (
    <Container>
    <Row>
      <Col>
        <RequestCount />
      </Col>
      <Col>
        <ProviderCount />
      </Col>
    </Row>
  </Container>
  );
}

export default Dashboard;
