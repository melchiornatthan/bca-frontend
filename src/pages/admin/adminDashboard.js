import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "typeface-inter";
import ResponsiveDoughnutChart from "../../components/doughnutChart";
import { Container, Row, Col, Card, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaConciergeBell } from "react-icons/fa";
import { MdBuildCircle } from "react-icons/md";
import { FaTruckMoving } from "react-icons/fa";
import { IoMdRemoveCircle } from "react-icons/io";
import logo from "../../assets/logo-nisb.png";
import { getRequestCount } from "../../service/getRequestCount";
import { getProviderCount } from "../../service/getProviderCount";
import ProviderCount from "../../components/providerCount";

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
   getRequestCount(setReqCount);
    getProviderCount(setProviderCount, setDate);
  }, []);

  return (
    <Row className="mx-auto centered-row">
      <Col md className="mx-3">
        <Row>
          <Row className="text-center justify-content-center">
            <strong
              style={{
                color: "#083358",
                fontFamily: "inter",
                fontSize: "8vh",
                fontWeight: "bold",
                marginTop: "9vh",
                marginBottom: "1vh",
              }}
            >
              Welcome to
              <div style={{ color: "#0D63A5" }}>Memo Hub</div>
            </strong>
            <p
              style={{
                color: "#F39422",
                fontFamily: "inter",
                fontSize: "2vh",
                fontWeight: "bold",
                marginBottom: "9vh",
              }}
            >
              Made with  <Image src={logo} style={{width:'76px', height:'25px'}}/>
            </p>
            
            <Row style={{ marginBottom: "5vh", marginTop: "8vh" }}>
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
                  backgroundColor: "#DCFFB7",
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
                  backgroundColor: "#FBFFB1",
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
                  backgroundColor: "#FFDBC5",
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
        <ProviderCount/>
      </Col>
    </Row>
  );
}

export default AdminDashboard;
