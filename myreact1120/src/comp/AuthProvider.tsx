import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

//comp/AuthProvider.tsx
// 사용자 정보 타입
interface Member {
  userid: string;
  name: string;
  email: string;
}
// 컨텍스트 타입 정의
interface AuthContextProps {
  member: Member | null;
  checkLogin: () => void;
  isLoggedIn: boolean;
  login: (
    userid: string,
    password: string
  ) => Promise<"success" | "fail" | "error">;
  logout: () => void;
  updateMemberName: (name: string) => void;
  updateMemberEmail: (email: string) => void;
}
// 컨텍스트 생성
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [member, setMember] = useState<Member | null>(null);
  const checkLogin = async () => {
    //http://192.168.0.3/myictstudy/api/login/session
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACK_END_URL}/api/login/session`,
        {
          withCredentials: true,
        }
      );
      if (res.data?.userid) {
        console.log("test");
        console.log(JSON.stringify(res.data));
        setMember(res.data);
      } else {
        console.log("fail");
        setMember(null);
      }
    } catch (error) {
      setMember(null);
    }
  };
  const login = async (
    userid: string,
    password: string
  ): Promise<"success" | "fail" | "error"> => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACK_END_URL}/api/login/dologin`,
        { userid, password },
        { withCredentials: true }
      );
      if ((res.data = "success")) {
        await checkLogin();
        return "success";
      } else {
        return "fail";
      }
    } catch (error) {
      console.log("error");
      return "error";
    }
  };
  const logout = async () => {
    await axios.get(
      `${process.env.REACT_APP_BACK_END_URL}/api/login/dologout`,
      {
        withCredentials: true,
      }
    );
    setMember(null);
  };

  useEffect(() => {
    checkLogin();
  }, []);

  const updateMemberName = (name: string) => {
    setMember((prev) => (prev ? { ...prev, name } : prev));
  };
  const updateMemberEmail = (email: string) => {
    setMember((prev) => (prev ? { ...prev, email } : prev));
  };
  const isLoggedIn = member !== null;
  console.log("member" + member);
  return (
    <AuthContext.Provider
      value={{
        member,
        isLoggedIn,
        checkLogin,
        login,
        logout,
        updateMemberName,
        updateMemberEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("AuthContext 은 AuthProvider  안에서만 사용해야 합니다.");
  return context;
};
