import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import InputWithLabel from "../components/input";
import MemoApp from "../assets/app-logo.png";
import CustomButton from "../components/button";
import background from "../assets/background.svg";

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
          response.data.isAdmin ?  localStorage.setItem("isAdmin", true) : localStorage.setItem("isAdmin", false)
          response.data.isAdmin ?  window.location.href = "/admin/main" :  window.location.href = "/main"
        }
        toast.error("Invalid username or password");
      })
      .catch((error) => {
        toast.error("Login failed");
        console.error("Login error:", error);
      });
  };

  return (
    <div
      className="container-fluid p-5"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        position: "relative",
        height: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        className="row mx-auto"
        style={{
          backgroundColor: "white", // Change background color on hover
          borderRadius: "1vh",
          padding: "3vh",
        }}
      >
       
          <h1
            className="text-center"
            style={{
              fontFamily: "Inter",
              fontWeight: "bold",
              color: "#1E56A0",
              fontSize: "6vh",
              marginTop: "3vh",
            }}
          >
            Memo Hub.
          </h1>
          <form className="mx-auto" onSubmit={handleSubmit} style={{ marginTop: "3vh", width: "70%"}}>
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
              hideInput={true}
              placeholder="Enter your password"
              showIcon={true}
              onChange={(e) => handleInputChange(e, setPassword)}
            />
            <div className="text-center mt-3">
              <CustomButton text="Login" color="primary" type="submit" />
            </div>
          </form>
       
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
}

export default Login;
