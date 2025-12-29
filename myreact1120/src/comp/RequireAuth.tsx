// comp/RequireAuth.tsx
import { JSX } from "react";
import { useAuth } from "./AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
/* 
<RequireAuth>
  <GalleryDetail />  => 이게 children 이다.
</RequireAuth> 
*/
// 컴포넌트가 자식으로 오직 하나의 JSX 요소만 받도록 제네릭으로 선언한 것이다.
const RequireAuth: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { member } = useAuth();
  const location = useLocation();
  if (!member) {
    //login정보가 없으면
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};
export default RequireAuth;
//React Router의 <Navigate />는 프로그래밍적으로 페이지를 이동시킬 때 사용하는 컴포넌트
//자바 스크립트의 location ="/login"
//state={{ from: location }} 은 useLocation에서 현재의 위치 정보를 저장하기 위한 것이다.
//나중에 로그인이이 성공 한 후에  원래 페이지로 되돌아올 수 있도록 설정한 것이다.
// history.push() 대신 history.replace()처럼 동작하게 함.
//로그인 후 뒤로가기 눌렀을 때 /login 페이지가 뒤로가기 히스토리에 남지 않도록 막아주기 때문이다.
