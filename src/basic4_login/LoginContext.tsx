import React, { createContext, useContext, useState } from "react";

// 사용자 정보 타입
interface Member {
  userid: string;
  name: string;
  email: string;
}
// 컨텍스트 타입 정의
interface LoginContextType {
  member: Member | null;
  login: (
    userid: string,
    password: string
  ) => Promise<"success" | "fail" | "error">;
  logout: () => void;
  updateMemberName: (name: string) => void;
  isLoggedIn: boolean;
}

// 컨텍스트 생성
const LoginContext = createContext<LoginContextType | undefined>(undefined);

// Provider 정의
export const LoginProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [member, setMember] = useState<Member | null>(null);
  const login = async (
    userid: string,
    password: string
  ): Promise<"success" | "fail" | "error"> => {
    try {
      //임시 로그인 조건: Axios를 사용해서 Backend와 연동해서 데이터를 아래처럼 받는다고 가정!
      if (userid === "admin" && password === "1234") {
        const user: Member = {
          userid,
          name: "관리자",
          email: "admin@example.com",
        };
        setMember(user);
        return "success";
      } else {
        return "fail";
      }
    } catch (e) {
      console.log(e);
      return "error";
    }
  };
  const logout = () => {
    setMember(null);
  };
  const updateMemberName = (name: string) => {
    setMember((prev) => (prev ? { ...prev, name } : prev));
  };
  const isLoggedIn = member !== null;
  return (
    <LoginContext.Provider
      value={{ member, login, logout, updateMemberName, isLoggedIn }}
    >
      {children}
    </LoginContext.Provider>
  );
};
// 커스텀 훅 정의
export const useLogin = () => {
  const context = useContext(LoginContext);
  if (!context)
    throw new Error("useLogin은 LoginProvider 안에서 사용되어야 합니다.");
  return context;
};
