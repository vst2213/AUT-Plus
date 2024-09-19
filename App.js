import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SettingsPage from './SettingsPage';
import LoginPage from './LoginPage'; 
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* Other routes */}
      </Routes>
    </Router>
  );
};

export default App;
