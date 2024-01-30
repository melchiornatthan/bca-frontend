import React from "react";
import "typeface-inter";
import { Container } from "react-bootstrap";
import { Outlet } from 'react-router-dom';

function InstallationHistory() {

  return (
    <Container >
      <h1
            className="text-center mt-5 "
          style={{
            fontFamily: "inter",
            color: "#1E5128",
            fontWeight: "bold",
            fontSize: "6vh",
          }}
        >
          Installation Requests
        </h1>
        <Outlet />
    </Container>
  );
}

export default InstallationHistory;
