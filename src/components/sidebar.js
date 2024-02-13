// Sidebar.js

import React, { useState } from "react";
import { Container, Nav, Row, Image} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "typeface-karma";
import logo from "../assets/logo NISB.png";

const Sidebar = () => {
  const [isServiceCollapsed, setServiceCollapsed] = useState(false);
  const [isHistoryCollapsed, setHistoryCollapsed] = useState(false);
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem("isAdmin");
  const handleServiceClick = () => {
    setServiceCollapsed(!isServiceCollapsed);
    setHistoryCollapsed(false);
  };

  const handelHistoryClick = () => {
    setHistoryCollapsed(!isHistoryCollapsed);
    setServiceCollapsed(false);
  };

  return (
    <Nav
      fluid
      className="flex-column sticky-top"
      style={{
        background: "linear-gradient(to top, #1B262C, #083358)",
        height: "100vh",
        borderColor: "#1E56A0",
      }}
    >
      <Container fluid className="my-3 ">
        <Row className="mx-2 centered-row my-2 ">
          <Container>
          <Image className="my-2" src={logo} style={{width:'45px', height:'71px', fontSize: "2vh", color:'#0F4C75' }} />
          </Container>
          {isAdmin === "false" && (
            <>
              <button
                onClick={handleServiceClick}
                className="btn text-start btn-outline-light "
                style={{ borderColor: "transparent" }}
              >
                <span style={{ fontSize: "2vh", fontWeight: "bold" }}>
                  Services
                </span>
              </button>

              {isServiceCollapsed && (
                <Row style={{marginLeft:'1vh'}}>
                  <button
                    className="btn text-start btn-outline-success  "
                    onClick={() => navigate("installationRequest")}
                    style={{
                      fontSize: "2vh",
                      color: "#FFFFFF",
                      borderColor: "transparent",
                    }}
                  >
                    Installation
                  </button>
                  <button
                    className="btn text-start btn-outline-warning  "
                    onClick={() => navigate("relocationRequest")}
                    style={{
                      color: "#FFFFFF",
                      fontSize: "2vh",
                      borderColor: "transparent",
                    }}
                  >
                    Relocation
                  </button>
                  <button
                    className="btn text-start btn-outline-danger   "
                    onClick={() => navigate("dismantleRequest")}
                    style={{
                      color: "#FFFFFF",
                      fontSize: "2vh",
                      borderColor: "transparent",
                    }}
                  >
                    Dismantle
                  </button>
                </Row>
              )}
            </>
          )}

          <button
            onClick={handelHistoryClick}
            className="btn text-start btn-outline-light"
            style={{ borderColor: "transparent" }}
          >
            <span style={{ fontSize: "2vh", fontWeight: "bold" }}>History</span>
          </button>

          {isHistoryCollapsed && (
            <Row style={{marginLeft:'1vh'}}>
              <button
                className="btn text-start btn-outline-success   "
                onClick={() => navigate("installationHistory")}
                style={{
                  color: "#FFFFFF",
                  fontSize: "2vh",
                  borderColor: "transparent",
                }}
              >
                Installation
              </button>
              <button
                className="btn text-start btn-outline-warning   "
                onClick={() => navigate("relocationHistory")}
                style={{
                  color: "#FFFFFF",
                  borderColor: "transparent",
                  fontSize: "2vh",
                }}
              >
                Relocation
              </button>
              <button
                className="btn text-start btn-outline-danger   "
                onClick={() => navigate("dismantleHistory")}
                style={{
                  color: "#FFFFFF",
                  borderColor: "transparent",
                  fontSize: "2vh",
                }}
              >
                Dismantle
              </button>
            </Row>
          )}
        </Row>
      </Container>
    </Nav>
  );
};

export default Sidebar;
