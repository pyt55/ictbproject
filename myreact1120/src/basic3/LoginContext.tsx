import { createContext, useContext, useState } from "react";

// useContext 실습(로그인 로그아웃 세션 처리)
// 전역으로 만들어서 어느 컴포넌트든 사용할수있게 만드는 것
// authcontext.provider가 제공하는 값 (member,login,logout)을 받아오는 역할

interface LoginContextType {
  isLoggedIn: boolean;
  toggleLogin: () => void;
}

const LoginContext = createContext<LoginContextType | undefined>(undefined);

export const LoginProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const toggleLogin = () => setisLoggedIn((prev) => !prev);
  return (
    <LoginContext.Provider value={{ isLoggedIn, toggleLogin }}>
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => {
  // 커스텀 훅으로 useContext 정의
  const context = useContext(LoginContext);
  if (!context)
    throw new Error("useLogin 은 LoginProvicder 안에서만 사용해야 합니다");
  return context;
};
