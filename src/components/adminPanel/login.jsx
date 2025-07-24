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
    <div className='loginBody'>
      <h2>Admin Login</h2>
      <input
      className='AdminInput'
        type="password"
        value={password}
        placeholder="Enter admin password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className='AdminButton' onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
