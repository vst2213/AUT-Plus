import React from 'react';

const SettingsPage = () => {
  return (
    <div>
      <h1>Settings</h1>
      <button onClick={() => alert('Logged out!')}>Logout</button> {/* 로그아웃 버튼 */}
    </div>
  );
};

export default SettingsPage;