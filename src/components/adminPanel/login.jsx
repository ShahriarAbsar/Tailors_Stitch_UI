import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.scss';

const Login = ({ setAuthenticated }) => {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (password === 'admin123') {
      setAuthenticated(true);
      navigate('/admin');
    } else {
      alert('Incorrect password');
    }
  };

  return (
    // This new div with 'login-page-wrapper' class handles the centering
    <div className='login-page-wrapper'>
      <div className='login-container'> {/* Your existing login card */}
        <h2>Admin Login</h2>
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