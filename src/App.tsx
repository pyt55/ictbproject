import React, { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./comp/Layout";
import Home from "./conts/Home";
import Signups from "./conts/member/Signups";
import Login from "./conts/Login";
import BoardList from "./conts/board/BoardList";

import Chart from "./conts/Chart";
import Diary from "./conts/Diary";
import Community from "./conts/Community";
import FilterTest from "./FilterTest";
import BoardDetail from "./conts/board/BoardDetail";
import BoardForm from "./conts/board/BoardForm";
import Gallery from "./conts/gallery/Gallery";
import GalleryDetail from "./conts/gallery/GalleryDetail";
import GalleryForm from "./conts/gallery/GalleryForm";
import AppRoutes from "./router/AppRoutes";
import Ex1_LocalStorage from "./ex1_storage/Ex1_LocalStorage";
import Ex2_LocalStorage from "./ex1_storage/Ex2_LocalStorage";
import Ex1_UseCallback from "./basic/Ex1_UseCallback";
import Ex2_PersonUseCallback from "./basic/Ex2_PersonUseCallback";
import Ex3_UseRef from "./basic/Ex3_UseRef";

import Parent from "./basic3/Parent";
import { LoginProvider } from "./basic4_login/LoginContext";
import LoginText from "./basic4_login/LoginText";
import { AuthProvider } from "./comp/AuthProvider";

// import Parent from "./basic2/Parent";
function App() {
  //   1.property 실습
  //   부모 자식 자식 등의 컴포넌트 많아질수록 복잡 해진
  //   컴포넌트 많아지니까 props도 많아짐
  // useContext를 사용하면 됨!!

  //   2.useContext 실습

  //   const [isLoggedIn, setisLoggedIn] = useState(false);
  //   const toggleLogin = () => setisLoggedIn((prev) => !prev);

  return (
    // <LoginProvider>
    //   <div style={{ border: "1px solid red", padding: 10 }}>
    //     <h1>최상위 (APP)</h1>
    //     <Parent />
    //   </div>
    // </LoginProvider>

    // <LoginProvider>
    //   <div style={{ border: "1px solid red", padding: 10 }}>
    //     <LoginText />
    //   </div>
    // </LoginProvider>

    // <div style={{ border: "1px solid red", padding: 10 }}>
    //   <h1>최상위 (APP)</h1>
    //   <Parent isLoggedIn={isLoggedIn} toggleLogin={toggleLogin} />
    // </div>

    // <div>
    //   <FilterTest/>
    // </div>
    // <Router>
    //   <Layout>
    //     <Routes>
    //       <Route path='/' element={<Home />} />
    //       <Route path='/board' element={<BoardList />} />
    //        {/* http://localhost:3000/board/1 , 2 모두가 :id로 들어감 */}
    //       <Route path='/board/:id' element={<BoardDetail/>} />
    //       <Route path='/board/write' element={<BoardForm/>}/>
    //       <Route path='/gallery' element={<Gallery />} />
    //       <Route path='/gallery/:id' element={<GalleryDetail />} />
    //       <Route path='/gallery/write' element={<GalleryForm />} />
    //       <Route path="/signup" element={<Signups />} />
    //       <Route path="/chart" element={<Chart />} />
    //       <Route path="/diary" element={<Diary />} />
    //       <Route path="/login" element={<Login />} />
    //        <Route path='/community' element={<Community/>}/>
    //     </Routes>
    //   </Layout>
    // </Router>
    //
    <AuthProvider>
      <Router>
        <Layout>
          <AppRoutes />
        </Layout>
      </Router>
    </AuthProvider>
  );
}
export default App;
