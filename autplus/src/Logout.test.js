import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import MorePage from "./MorePage"; // MorePage 컴포넌트 임포트
import { auth } from "./firebase"; // Firebase auth 임포트
import { signOut } from "firebase/auth"; // 로그아웃 함수 임포트

jest.mock("firebase/auth"); // Firebase의 auth 모듈 모킹

describe("MorePage Component", () => {
  beforeEach(() => {
    render(
      <Router>
        <MorePage />
      </Router>
    );
  });

  test("renders the Logout button", () => {
    const logoutButton = screen.getByText(/logout/i);
    expect(logoutButton).toBeInTheDocument(); // "Logout" 버튼이 화면에 나타나는지 확인
  });

  test("calls signOut when Logout button is clicked", async () => {
    const logoutButton = screen.getByText(/logout/i);
    fireEvent.click(logoutButton); // "Logout" 버튼 클릭

    expect(signOut).toHaveBeenCalledWith(auth); // signOut 함수가 auth와 함께 호출되었는지 확인
  });
});