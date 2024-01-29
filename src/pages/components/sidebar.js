// Sidebar.js

import React, { useState } from "react";
import { Container, Nav, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "typeface-karma";
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
      className="flex-column"
      style={{ backgroundColor: "#1E56A0", height: "100vh", borderColor:"#1E56A0" }}
    >
      <Container fluid className="my-3">
        <Row className="mx-auto centered-row my-2">
        <h1 style={{ fontFamily: "Kalam", color: "#D6E4F0", fontWeight: "bold", fontSize: "5vh" }}>
                Memo Hub
              </h1>
              {isAdmin === "false" && (<>
          <button className="btn text-start btn-outline-light" style={{borderColor:"#1E56A0"}}>
            <span
              onClick={handleServiceClick}
              style={{ fontSize: "2vh", fontWeight: "bold" }}
            >
              Services
            </span>
          </button>

          {isServiceCollapsed && (
            <Row>
              <button
                className="btn text-start btn-outline-success   "
                onClick={() => navigate("installationRequest")}
                style={{
                  fontSize: "2vh",
                  color: "#FFFFFF",
                  borderColor:"#1E56A0"
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
                  borderColor:"#1E56A0"
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
                  borderColor:"#1E56A0"
                }}
              >
                Dismantle
              </button>
            </Row>
          )}
          </>
          )}
              
          <button className="btn text-start btn-outline-light" style={{borderColor:"#1E56A0"}}>
            <span
              onClick={handelHistoryClick}
              style={{ fontSize: "2vh", fontWeight: "bold" }}
            >
              History
            </span>
          </button>

          {isHistoryCollapsed && (
            <Row >
              <button
                className="btn text-start btn-outline-success   "
                onClick={() => navigate("installationHistory")}
                style={{
                  color: "#FFFFFF",
                  fontSize: "2vh",
                  borderColor:"#1E56A0"
                }}
              >
                Installation
              </button>
              <button
                className="btn text-start btn-outline-warning   "
                onClick={() => navigate("relocationHistory")}
                style={{
                  color: "#FFFFFF",
                    borderColor:"#1E56A0",
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
                    borderColor:"#1E56A0",
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
