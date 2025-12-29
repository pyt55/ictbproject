import React from "react";
import { useLogin } from "./LoginContext";

const Child: React.FC = () => {
  // useContext 사용하기
  const { isLoggedIn, toggleLogin } = useLogin(); //커스텀훅
  return (
    <div style={{ border: "1px solid gray", padding: 10, marginTop: 10 }}>
      <h3>자식 컴포넌트</h3>
      <p>로그인 상태:{isLoggedIn ? "로그인됨" : "로그아웃됨"}</p>
      <button onClick={toggleLogin}>상태 토글</button>
    </div>
  );
};

export default Child;
