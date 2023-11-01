import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import InputWithLabel from "../components/input";
import MemoApp from "../assets/app-logo.png";
import CustomButton from "../components/button";
import background from "../assets/background.svg";

function Login() {
  const [isHoveredFirst, setIsHoveredFirst] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isColHovered, setIsColHovered] = useState(false); // New state variable

  const handleInputChange = (event, setStateFunction) => {
    setStateFunction(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Logging in with username:', username);

    const body = {
      username: username,
      password: password
    };

    axios.post('http://localhost:3333/bca-app/login', body, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then((response) => {
        if (response.data.message === "User logged in successfully") {
          toast.success('Login successful');
          localStorage.setItem('isAuthorized', 'true');
          localStorage.setItem('isAdmin', 'true');
          window.location.href = '/main';
        }
      })
      .catch((error) => {
        toast.error('Login failed');
        console.error('Login error:', error);
      });
  };

  return (
    <div className="container-fluid" style={{
      backgroundImage: `url(${background})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
    }}>
      <div className="row w-50 mx-auto centered-row">
        <div className="col-md text center">
          <img src={MemoApp} alt="Logo" style={{ height: '250px' }} />
        </div>
        <div className="col-md" style={{
          backgroundColor: isColHovered ? 'white' : 'transparent', // Change background color on hover
          borderRadius: '33px',
          padding: '20px',
          boxShadow: isHoveredFirst ? '10px 10px 20px rgba(0, 96, 175, 0.3)' : 'none',
          transition: 'box-shadow 0.3s',
        }}
          onMouseEnter={() => {
            setIsHoveredFirst(true);
            setIsColHovered(true); // Set hover state to true on mouse enter
          }}
          onMouseLeave={() => {
            setIsHoveredFirst(false);
            setIsColHovered(false); // Set hover state to false on mouse leave
          }}>
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
            <div className="text-center mt-3">
              <CustomButton
                text="Login"
                color="primary"
                type="submit"
              />
            </div>
          </form>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
}

export default Login;
