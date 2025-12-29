//comp/Layout.tsx 로 복사 해두기
import React from "react";
import Navbar from "./Navbar";
import { useAuth } from "./AuthProvider";
import { Link, NavLink, useNavigate } from "react-router-dom";
interface LayoutProps {
  children: React.ReactNode;
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { member, logout } = useAuth();
  const navigate = useNavigate();
  console.log(member?.name);
  const handleLogout = async () => {
    await logout();
    alert("로그아웃 되었습니다.");
    navigate("/");
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between", // 공간을 사이로 벌려놓기
          alignItems: "center", //중앙 정렬
          backgroundColor: "#4caf50",
          color: "white",
          padding: "10px 20px",
          borderRadius: "8px",
        }}
      >
        <h1>ICT Password</h1>
        <div>
          {member ? (
            <>
              <span style={{ marginRight: "10px" }}>
                {member.name}님 환영합니다
              </span>
              <NavLink
                to={"/mypage"}
                style={{
                  marginRight: "10px",
                  color: "white",
                  textDecoration: "underline",
                }}
              >
                마이페이지
              </NavLink>
              <button
                onClick={handleLogout}
                style={{
                  background: "transparent",
                  color: "white",
                  border: "none",
                }}
              >
                로그아웃
              </button>
            </>
          ) : (
            <>
              <a href="/login" style={{ marginRight: "10px", color: "white" }}>
                로그인
              </a>
              <a href="/signup" style={{ color: "white" }}>
                회원가입
              </a>
            </>
          )}
        </div>
      </header>
      <Navbar />
      <main>{children}</main>
      <footer
        style={{
          backgroundColor: "#4caf50",
          color: "white",
          padding: "10px",
          borderRadius: "0 0 8px 8px",
          textAlign: "center",
        }}
      >
        @ 2025 IctPassword.
      </footer>
    </div>
  );
};

export default Layout;
