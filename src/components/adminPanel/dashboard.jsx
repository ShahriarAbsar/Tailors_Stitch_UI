import React from 'react';
import UploadForm from './UploadForm';
import './Admin.scss';

const Dashboard = ({ setAuthenticated }) => {
  const logout = () => {
    setAuthenticated(false);
  };

  return (
    <div className='dashboardBody' >
      <h2>Welcome to Admin Dashboard</h2>
      <button className='logoutButton' onClick={logout}>Logout</button>
      <UploadForm />
    </div>
  );
};

export default Dashboard;
