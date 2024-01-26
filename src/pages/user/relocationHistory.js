import React from "react";
import "typeface-inter";
import { Container } from "react-bootstrap";
import { Outlet } from 'react-router-dom';

function RelocationHistory() {

  return (
    <Container >
      <h1
            className="text-center mt-5"
          style={{
            fontFamily: "inter",
            color: "#E9B824",
            fontWeight: "bold",
            fontSize: "6vh",
          }}
        >
          Relocation Requests
        </h1>
        
        <Outlet />
    </Container>
  );
}

export default RelocationHistory;
