import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "typeface-inter";
import axios from "../../axiosConfig";
import ResponsiveDoughnutChart from "../components/doughnutChart";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaConciergeBell } from "react-icons/fa";
import { MdBuildCircle } from "react-icons/md";
import { FaTruckMoving } from "react-icons/fa";
import { IoMdRemoveCircle } from "react-icons/io";

function AdminDashboard() {
  ChartJS.register(ArcElement, Tooltip, Legend);
  const [providerCount, setProviderCount] = useState([]);
  const [reqCount, setReqCount] = useState([]);
  const [date, setDate] = useState(new Date());
  const navigate = useNavigate();
  const data = [
    { name: "Primacom", value: parseInt(providerCount.primacom) },
    { name: "Tangara", value: parseInt(providerCount.tangara) },
    { name: "IFORTE", value: parseInt(providerCount.iforte) },
    { name: "Indonet", value: parseInt(providerCount.indonet) },
  ];

  useEffect(() => {
    getRequestCount();
    getProviderCount();
  }, []);

  const getRequestCount = async () => {
    try {
      const response = await axios.get("requestsCount");
      setReqCount(response.data);
      console.log("Request Count:", response.data);
    } catch (error) {
      console.error("Error fetching request counts:", error.message);
    }
  };

  const getProviderCount = async () => {
    await axios
      .get("providerCount")
      .then((response) => {
        setProviderCount(response.data);
        console.log(response);
        setDate(new Date());
      })
      .catch((error) => {
        console.error("Error fetching location data:", error);
      });
  };

  return (
    <Row className="mx-auto centered-row">
      <Col md className="mx-3">
        <Row>
          <Row className="text-center">
            <strong
              style={{
                color: "#1E56A0",
                fontFamily: "inter",
                fontSize: "8vh",
                fontWeight: "bold",
                marginTop: "7vh",
                marginBottom: "1vh",
              }}
            >
              Welcome to
              <div style={{ color: "#86B6F6" }}>Memo Hub</div>
            </strong>
            <p
              style={{
                color: "#FFB000",
                fontFamily: "inter",
                fontSize: "2vh",
                fontWeight: "bold",
                marginBottom: "9vh",
              }}
            >
              Made with NIS-B
            </p>
            <Row style={{ marginBottom: "5vh", marginTop: "5vh" }}>
              <FaConciergeBell style={{ color: "#FF9B50", fontSize: "3vh" }} />
              <strong
                style={{
                  color: "#1E56A0",
                  fontFamily: "inter",
                  marginTop: "1vh",
                  fontSize: "3vh",
                }}
              >
                Request Pending
              </strong>
            </Row>
          </Row>

          <Row>
            <Col sm style={{ marginBottom: "1vh", marginRight: "1vh" }}>
              <Card
                style={{
                  borderColor: "#F2FFE9",
                  backgroundColor: "#F2FFE9",
                  borderRadius: "1vh",
                  boxShadow: "0 0 1vh rgba(0, 0, 0, 0.05)",
                }}
                onClick={() => {
                  navigate("installationHistory");
                }}
              >
                <Card.Body>
                  <div className="row">
                    <div className="col w-25">
                      <MdBuildCircle
                        style={{
                          marginRight: "1vh",
                          marginTop: "1vh",
                          color: "#1E5128",
                          fontSize: "25px",
                        }}
                      />
                    </div>
                    <div className="col w-75">
                      <h1
                        className="card-title"
                        style={{ fontSize: "2vh", color: "#65B741" }}
                      >
                        <div>
                          <strong
                            className="mx-auto"
                            style={{
                              color: "#1E5128",
                              fontFamily: "inter",
                              fontSize: "2vh",
                            }}
                          >
                            Installation Request
                          </strong>
                        </div>
                      </h1>
                    </div>
                    <h2 style={{ color: "#1E5128" }}>
                      {" "}
                      {reqCount.installation}{" "}
                    </h2>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col sm style={{ marginBottom: "1vh" }}>
              <Card
                style={{
                  borderColor: "#FFFFEC",
                  backgroundColor: "#FFFFEC",
                  marginRight: "1vh",
                  borderRadius: "1vh",
                  boxShadow: "0 0 1vh rgba(0, 0, 0, 0.05)",
                }}
                onClick={() => {
                  navigate("relocationHistory");
                }}
              >
                <Card.Body>
                  <div className="row">
                    <div className="col w-25">
                      <FaTruckMoving
                        style={{
                          marginRight: "1vh",
                          marginTop: "1vh",
                          color: "#F05941",
                          fontSize: "25px",
                        }}
                      />
                    </div>
                    <div className="col w-75">
                      <h1
                        className="card-title"
                        style={{ fontSize: "2vh", color: "#F05941" }}
                      >
                        <div>
                          <strong
                            className="mx-auto"
                            style={{
                              color: "#F05941",
                              fontFamily: "inter",
                              fontSize: "2vh",
                            }}
                          >
                            Relocation Request
                          </strong>
                        </div>
                      </h1>
                    </div>
                    <h2 style={{ color: "#F05941" }}>
                      {" "}
                      {reqCount.relocation}{" "}
                    </h2>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col sm style={{ marginBottom: "1vh" }}>
              <Card
                style={{
                  borderColor: "#FCF5ED",
                  backgroundColor: "#FCF5ED",
                  borderRadius: "1vh",
                  boxShadow: "0 0 1vh rgba(0, 0, 0, 0.05)",
                }}
                onClick={() => {
                  navigate("dismantleHistory");
                }}
              >
                <Card.Body>
                  <div className="row">
                    <div className="col w-25">
                      <IoMdRemoveCircle
                        style={{
                          marginRight: "1vh",
                          color: "#B31312",
                          fontSize: "25px",
                          marginTop: "1vh",
                        }}
                      />
                    </div>
                    <div className="col w-75">
                      <h1
                        className="card-title"
                        style={{ fontSize: "2vh", color: "#65B741" }}
                      >
                        <div>
                          <strong
                            className="mx-auto"
                            style={{
                              color: "#B31312",
                              fontFamily: "inter",
                              fontSize: "2vh",
                            }}
                          >
                            Dismantle Request
                          </strong>
                        </div>
                      </h1>
                    </div>
                    <h2 style={{ color: "#B31312" }}> {reqCount.dismantle} </h2>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Row>
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
        <Container>
          <div>
            <ResponsiveDoughnutChart data={data} />
          </div>

          <h1
            style={{
              textAlign: "center",
              fontFamily: "inter",
              fontSize: "4vh",
              fontWeight: "bold",
              color: "#163172",
              marginTop: "6vh",
            }}
          >
            Provider Count
          </h1>
          <h2
            style={{
              textAlign: "center",
              fontFamily: "inter",
              fontWeight: "bold",
              fontSize: "2vh",
              color: "#163172",
            }}
          >
            Data Update: {date.toDateString()} {date.toLocaleTimeString()}
          </h2>
        </Container>

        <Row className="text-center" style={{ marginTop: "8vh" }}>
          <Col>
            <Card
              style={{ backgroundColor: "#FFFFFF", borderColor: "#ffffff" }}
            >
              <Card.Body>
                <h1
                  className="card-title"
                  style={{
                    fontFamily: "inter",
                    fontSize: "3vh",
                    color: "#1E56A0",
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
                    color: "#1E56A0",
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
                    color: "#1E56A0",
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
                    color: "#1E56A0",
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
      </Col>
    </Row>
  );
}

export default AdminDashboard;
