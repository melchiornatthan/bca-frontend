import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "typeface-inter";
import ResponsiveDoughnutChart from "../components/doughnutChart";
import { Container, Row, Col, Card } from "react-bootstrap";
import { getProviderCount } from "../service/getProviderCount";

/**
 * ProviderCount component displays provider count data in a responsive doughnut chart and cards.
 * @returns {JSX.Element} - ProviderCount component.
 */
function ProviderCount() {
  // Register ChartJS elements
  ChartJS.register(ArcElement, Tooltip, Legend);
  // State for provider count data and date
  const [providerCount, setProviderCount] = useState([]);
  const [date, setDate] = useState(new Date());
  // Data for doughnut chart
  const data = [
    { name: "Primacom", value: parseInt(providerCount.primacom) },
    { name: "Tangara", value: parseInt(providerCount.tangara) },
    { name: "IFORTE", value: parseInt(providerCount.iforte) },
    { name: "Indonet", value: parseInt(providerCount.indonet) },
  ];

  useEffect(() => {
    // Fetch provider count data
    getProviderCount(setProviderCount, setDate);
  }, []);

  return (
    <Container>
      <Container>
        {/* Responsive doughnut chart */}
        <div>
          <ResponsiveDoughnutChart data={data} />
        </div>

        {/* Title */}
        <h1
          style={{
            textAlign: "center",
            fontFamily: "inter",
            fontSize: "4vh",
            fontWeight: "bold",
            color: "#0F4C75",
            marginTop: "8vh",
          }}
        >
          Provider Count
        </h1>
        {/* Data update timestamp */}
        <h2
          style={{
            textAlign: "center",
            fontFamily: "inter",
            fontWeight: "bold",
            fontSize: "2vh",
            color: "#0F4C75",
          }}
        >
          Data Update: {date.toDateString()} {date.toLocaleTimeString()}
        </h2>
      </Container>

      {/* Provider count cards */}
      <Row className="text-center" style={{ marginTop: "8vh" }}>
        <Col>
          <Card style={{ backgroundColor: "#FFFFFF", borderColor: "#ffffff" }}>
            <Card.Body>
              <h1
                className="card-title"
                style={{
                  fontFamily: "inter",
                  fontSize: "3vh",
                  color: "#0F4C75",
                }}
              >
                <strong>Primacom</strong>
              </h1>
              <strong style={{ fontSize: "3vh", color: "#004225" }}>
                {" "}
                {providerCount.primacom}{" "}
              </strong>
            </Card.Body>
          </Card>
          <Card className="my-1" style={{ borderColor: "#ffffff" }}>
            <Card.Body>
              <h1
                className="card-title"
                style={{
                  fontFamily: "inter",
                  fontSize: "3vh",
                  color: "#0F4C75",
                }}
              >
                <strong>Tangara</strong>
              </h1>
              <strong style={{ fontSize: "3vh", color: "#004225" }}>
                {" "}
                {providerCount.tangara}{" "}
              </strong>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card style={{ borderColor: "#ffffff" }}>
            <Card.Body>
              <h1
                className="card-title"
                style={{
                  fontFamily: "inter",
                  fontSize: "3vh",
                  color: "#0F4C75",
                }}
              >
                <strong>iForte</strong>
              </h1>
              <strong style={{ fontSize: "3vh", color: "#004225" }}>
                {" "}
                {providerCount.iforte}{" "}
              </strong>
            </Card.Body>
          </Card>
          <Card className="my-1" style={{ borderColor: "#ffffff" }}>
            <Card.Body>
              <h1
                className="card-title"
                style={{
                  fontFamily: "inter",
                  fontSize: "3vh",
                  color: "#0F4C75",
                }}
              >
                <strong>Indonet</strong>
              </h1>
              <strong style={{ fontSize: "3vh", color: "#004225" }}>
                {" "}
                {providerCount.indonet}{" "}
              </strong>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ProviderCount; // Export the ProviderCount component for use in other files
