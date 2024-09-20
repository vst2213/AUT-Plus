import React from "react";
import "./MorePage.css";
import { signOut } from "firebase/auth";
import { auth } from "./firebase"; // Firebase 설정 파일 import
import { useNavigate } from "react-router-dom";
 



const MorePage = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login"); // 로그아웃 후 로그인 페이지로 이동
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <div className="more-container">
      <h2>More Options</h2>
      {/* 여기에 추가하고 싶은 버튼들 */}
      <button onClick={handleLogout}>Logout</button>
      {/* 더 많은 기능 추가 가능 */}
    </div>
  );
};

export default MorePage;