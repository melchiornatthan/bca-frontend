import React, { useState } from "react";
import axios from "axios";
import "typeface-kalam";
import { ToastContainer, toast } from "react-toastify";
import InputWithLabel from "../../components/input";
import CustomButton from "../../components/button";
import logo from "../../assets/logo-nisb.png";
import logowhite from "../../assets/logo_NISB_white.png";
import "typeface-karma";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Image } from "react-bootstrap";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleInputChange = (event, setStateFunction) => {
    setStateFunction(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Logging in with username:", username);

    const body = {
      username: username,
      password: password,
    };

    axios
      .post("http://localhost:3333/bca-app/login", body, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        if (response.data.message === "User logged in successfully") {
          toast.success("Login successful");
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("username", username);
          response.data.isAdmin
            ? localStorage.setItem("isAdmin", true)
            : localStorage.setItem("isAdmin", false);
          response.data.isAdmin ? navigate("/admin") : navigate("/user");
        } else {
          toast.error("Invalid username or password");
        }
      })
      .catch((error) => {
        toast.error("Login failed");
        console.error("Login error:", error);
      });
  };

  return (
    <Container fluid style={{ height: "100vh", width: "100%" }}>
      <Row style={{ backgroundColor: "#FFFFFF", height: "100%" }}>
        <Col
          md
          className=" d-none d-sm-none d-md-none d-lg-block d-xl-block d-xxl-block"
        >
          <Container style={{ marginTop: "40vh", marginBottom: "33vh" }}>
            <Row className="text-center justify-content-center">
              <Image src={logo} style={{width:'152px', height:'50px'}}/>
              
              <h1
                style={{
                  fontFamily: "Kalam",
                  color: "#1E56A0",
                  fontWeight: "bold",
                  fontSize: "12vh",
                  marginTop: "2vh"
                }}
              >
                Memo Hub
              </h1>
              
            </Row>
          </Container>
        </Col>
        <Col
          md
          style={{ background: "linear-gradient(to top, #001F3F, #083358)" }}
        >
           <Container style={{ marginTop: "40vh", marginBottom: "33vh" }} className=" d-block d-sm-block d-md-block d-lg-none d-xl-none d-xxl-none">
            <Row className="text-center justify-content-center">
              <Image src={logowhite} style={{width:'152px', height:'50px'}} />
              
              <h1
                style={{
                  fontFamily: "Kalam",
                  color: "#FFFFFF",
                  fontWeight: "bold",
                  fontSize: "12vh",
                  marginTop: "5vh"
                }}
              >
                Memo Hub
              </h1>
              
            </Row>
          </Container>
          <Container className="w-75">
            <Form
              onSubmit={handleSubmit}
              className="mx-auto p-5"
              style={{
                marginTop: "30vh",
                marginBottom: "30vh",
                backgroundColor: "#FFFFFF",
                borderRadius: "3vh",
              }}
            >
              <Row>
                <h1
                  className="text-center"
                  style={{
                    fontFamily: "Karma",
                    color: "#1E56A0",
                    fontWeight: "bold",
                    fontSize: "4vh",
                  }}
                >
                  Sign In
                </h1>
                <InputWithLabel
                  label="Username"
                  value={username}
                  name="username"
                  placeholder="Enter your username"
                  onChange={(e) => handleInputChange(e, setUsername)}
                />
                <InputWithLabel
                  label="Password"
                  value={password}
                  name="password"
                  type="password"
                  isHidden={true}
                  placeholder="Enter your password"
                  showIcon={true}
                  onChange={(e) => handleInputChange(e, setPassword)}
                />
                <div className="text-center mt-3">
                  <CustomButton text="Login" color="primary" type="submit" />
                </div>
              </Row>
            </Form>
          </Container>
        </Col>
      </Row>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </Container>
  );
}

export default Login;
