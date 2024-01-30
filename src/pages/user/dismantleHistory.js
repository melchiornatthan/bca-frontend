import React from "react";
import "typeface-inter";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";

function DismantleHistory() {
  return (
    <Container>
      <h1
        className="text-center mt-5"
        style={{
          fontFamily: "inter",
          color: "#9A031E",
          fontWeight: "bold",
          fontSize: "6vh",
        }}
      >
        Dismantle Requests
      </h1>
      <Outlet />
    </Container>
  );
}

export default DismantleHistory;
