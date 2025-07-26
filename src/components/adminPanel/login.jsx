// Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './admin.scss';

const Login = ({ setAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        email: email,
        password: password,
      });

      const { access_token, user } = response.data;

      if (access_token) {
        // --- IMPORTANT: Store the token in localStorage ---
        localStorage.setItem('accessToken', access_token);
        localStorage.setItem('userEmail', user.email);
        localStorage.setItem('userRole', user.role);
        // --- END IMPORTANT ---

        setAuthenticated(true); // Update React state
        navigate('/admin'); // Navigate to the dashboard
      } else {
        alert('Login failed: No access token received.');
        console.error('Login response missing access token:', response.data);
      }
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message || 'An error occurred during login.';
        alert(errorMessage);
        console.error('Backend login error:', error.response.data);
      } else if (error.request) {
        alert('Could not connect to the server. Please check your network connection.');
        console.error('Network error:', error.request);
      } else {
        alert('An unexpected error occurred during login.');
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