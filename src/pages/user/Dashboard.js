import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "typeface-inter";
import ResponsiveDoughnutChart from "../../components/doughnutChart";
import { Container, Row, Col, Card,Image} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaConciergeBell } from "react-icons/fa";
import { MdBuildCircle } from "react-icons/md";
import { FaTruckMoving } from "react-icons/fa";
import { IoMdRemoveCircle } from "react-icons/io";
import logo from "../../assets/logo-nisb.png";
import { getRequestCount } from "../../service/getRequestCount";
import { getProviderCount } from "../../service/getProviderCount";
import ProviderCount from "../../components/providerCount";
import RequestCount from "../../components/requestCount";

function Dashboard() {
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
       <RequestCount/>
      </Col>
      <Col
        md
        style={{
          marginTop: "2vh",
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

export default Dashboard;
