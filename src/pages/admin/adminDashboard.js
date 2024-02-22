import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProviderCount from "../../components/providerCount";
import RequestCount from "../../components/requestCount";

/**
 * AdminDashboard Component displays the admin dashboard.
 * @returns {JSX.Element} - AdminDashboard component.
 */
function AdminDashboard() {
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

export default AdminDashboard; // Export AdminDashboard component
