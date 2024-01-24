import React, { useState } from "react";
import axios from "axios";
import "typeface-kalam";
import { ToastContainer, toast } from "react-toastify";
import InputWithLabel from "../components/input";
import CustomButton from "../components/button";
import BCALogo from "../assets/BCA Logo Blue.png";
import "typeface-karma";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
          response.data.isAdmin
            ? (window.location.href = "/admin/main")
            : (window.location.href = "/main");
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
    <div className="container-fluid"
      style={{
        height: "100vh",
        width: "100%",
      }}
    >
      <div
        className="row"
        style={{
          backgroundColor: "#F6F6F6", // Change background color on hover
         height: "100%",
        }}
      >
        <div className="col-md">
          <div
            className="container"
            style={{
              marginTop: "33vh",
              marginBottom: "33vh",
            }}
          >
            <div className="row text-center">
              <img
                className="mx-auto"
                src={BCALogo}
                alt="BCA Logo"
                style={{ height: "106px", width: "155px" }}
              />
              <h1
                style={{
                  fontFamily: "Kalam",
                  color: "#1E56A0",
                  fontWeight: "bold",
                  fontSize: "12vh",
                }}
              >
                Memo Hub
              </h1>
              <p style={{
                fontFamily: "Karma",
                color: "#FF9843",
                fontWeight: "bold",
                fontSize: "3vh",
              }}>
               Made with  <strong style={{
                color: "#D63484",
               }}>NIS-B 
                </strong>
              
              </p>
            </div>
          </div>
        </div>
        <div
          className="col-md"
          style={{
            background: 'linear-gradient(to top, #0B2447, #1E56A0)',
            
          }}
        >
          <div className="container w-75">
            <form
              className="mx-auto p-5 w-75"
              onSubmit={handleSubmit}
              style={{
                marginTop: "30vh",
                marginBottom: "30vh",
                backgroundColor: "#FFFFFF",
                borderRadius: "3vh",
              }}
            >
              <div className="row">
                <h1 className="text-center" style={{
                  fontFamily: "Karma",
                  color: "#1E56A0",
                  fontWeight: "bold",
                  fontSize: "4vh",
                }}>
                Sign In</h1>
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
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
}

export default Login;
