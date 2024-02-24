// axiosConfig.js
import axios from 'axios';


const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Replace with your API base URL
  headers: {
    // 'Content-Type': 'application/json',
    // Add any other default headers you need
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  },
});

// Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    // You can modify the request config here if needed
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  (response) => {
    // You can modify the response data here if needed
    return response;
  },
  (error) => {
    // Handle response error
    if (error.response && error.response.status === 401) {
      // Redirect to the login page
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default instance;
