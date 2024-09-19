import React from 'react';
import { useNavigate } from 'react-router-dom';

const SettingsPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
   
    localStorage.removeItem('userToken');
  
    navigate('/login');
  };

  return (
    <div style={styles.container}>
      <h1>Settings</h1>
      <button onClick={handleLogout} style={styles.logoutButton}>
        Logout
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
  },
  logoutButton: {
    padding: '10px 20px',
    backgroundColor: '#FF4D4D',
    color: '#FFF',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '20px',
  },
};

export default SettingsPage;
