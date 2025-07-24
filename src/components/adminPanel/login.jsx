import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Admin.scss';

const Login = ({ setAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Send login request to your backend
      // Make sure 'http://localhost:3000' matches your backend's actual URL
      const response = await axios.post('http://localhost:3000/auth/login', {
        email: email,
        password: password,
      });

      // Backend returns { access_token: string, user: { id, email, role } }
      const { access_token, user } = response.data;

      if (access_token) {
        // Store the token (e.g., in localStorage) for future authenticated requests
        localStorage.setItem('accessToken', access_token);
        // You might also store user info if needed
        localStorage.setItem('userEmail', user.email);
        localStorage.setItem('userRole', user.role);

        setAuthenticated(true);
        navigate('/admin'); // Navigate to the admin dashboard
      } else {
        // This case should ideally be caught by backend errors,
        // but it's a fallback if no token is present in a 200 OK response.
        alert('Login failed: No access token received.');
        console.error('Login response missing access token:', response.data);
      }
    } catch (error) {
      // Handle various error scenarios
      if (error.response) {
        // The server responded with a status code outside of 2xx
        // Your backend throws UnauthorizedException with messages like 'Invalid credentials'
        const errorMessage = error.response.data.message || 'An error occurred during login.';
        alert(errorMessage);
        console.error('Backend login error:', error.response.data);
      } else if (error.request) {
        // The request was made but no response was received (e.g., network down, backend not running)
        alert('Could not connect to the server. Please check your network or try again later.');
        console.error('Network error:', error.request);
      } else {
        // Something else happened while setting up the request
        alert('An unexpected error occurred. Please try again.');
        console.error('Unexpected error:', error.message);
      }
    }
  };

  return (
    <div className='login-page-wrapper'>
      <div className='login-container'>
        <h2>Admin Login</h2>
        <input
          className='admin-input'
          type="email"
          value={email}
          placeholder="Enter admin email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className='admin-input'
          type="password"
          value={password}
          placeholder="Enter admin password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className='admin-button' onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default Login;