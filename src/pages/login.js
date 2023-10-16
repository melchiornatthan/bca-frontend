import React, { useState } from 'react';
import axios from 'axios';

import InputWithLabel from "./components/input";
import CustomButton from "./components/button";

function Login() {
  // State variables
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Reusable input change handler
  const handleInputChange = (event, setStateFunction) => {
    setStateFunction(event.target.value);
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Logging in with username:', username);

    const body = {
      username: username,
      password: password
    };

    // Send a POST request to the server for login
    axios.post('http://localhost:3333/bca-app/login', body, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then((response) => {
        if (response.data.message === "User logged in successfully") {
          // Redirect to the main page upon successful login
          window.location.href = "/main";
        }
      })
      .catch((error) => {
        // Handle any errors
        console.error('Login error:', error);
      });
  };

  return (
    <div className="container py-5">
      <div className="row w-75 mx-auto">
        <div className="col-md text center my-auto">
          <h1>Memo App</h1>
        </div>
        <div className="col-md">
          <form onSubmit={handleSubmit}>
            <InputWithLabel
              label="Username"
              value={username}
              name='username'
              placeholder="Enter your username"
              onChange={(e) => handleInputChange(e, setUsername)}
            />
            <InputWithLabel
              label="Password"
              value={password}
              name='password'
              type="password"
              placeholder="Enter your password"
              onChange={(e) => handleInputChange(e, setPassword)}
            />
            <br />
            <CustomButton
              text="Login"
              color="primary"
              type="submit"
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
