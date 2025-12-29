import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../conts/Home";
import BoardList from "../conts/board/BoardList";
import BoardDetail from "../conts/board/BoardDetail";
import BoardForm from "../conts/board/BoardForm";
import Gallery from "../conts/gallery/Gallery";
import GalleryDetail from "../conts/gallery/GalleryDetail";
import GalleryForm from "../conts/gallery/GalleryForm";
import Signups from "../conts/member/Signups";
import Chart from "../conts/Chart";
import Diary from "../conts/Diary";
import Login from "../conts/Login";
import Community from "../conts/Community";
import UpboardList from "../conts/upboard/UpboardList";
import UpboardForm from "../conts/upboard/UpboardForm";
import UpBoardDetail from "../conts/upboard/UpBoardDetail";
import RequireAuth from "../comp/RequireAuth";
import MyPage from "../conts/member/MyPage";

import SurveyClientResult from "../conts/survey/SurveyClientResult";
import SurveyClient from "../conts/survey/SurveyClient";
import SurveyAddForm from "../conts/survey/SurveyAddForm";

const AppRoutes: React.FC = () => {
  const routeList = [
    { path: "/", element: <Home /> },
    { path: "/board", element: <BoardList /> }, //게시판 목록
    { path: "/board/write", element: <BoardForm /> },
    { path: "/board/:id", element: <BoardDetail /> },
    { path: "/gallery", element: <Gallery /> },
    { path: "/mypage", element: <MyPage /> },
    // { path: "/gallery/:id", element: <GalleryDetail /> },
    {
      path: "/gallery/gdetail/:num",
      element: (
        <RequireAuth>
          <GalleryDetail />
        </RequireAuth>
      ),
    },
    { path: "/gallery/write", element: <GalleryForm /> },
    { path: "/signup", element: <Signups /> },
    { path: "/chart", element: <Chart /> },
    { path: "/diary", element: <Diary /> },
    { path: "/login", element: <Login /> },
    { path: "/community", element: <Community /> },
    { path: "/community/uplist", element: <UpboardList /> },
    { path: "/community/upform", element: <UpboardForm /> },
    { path: "/community/updetail/:num", element: <UpBoardDetail /> },
    // surveyResult
    { path: "/surveyForm", element: <SurveyAddForm /> },
    { path: "/surveyClient", element: <SurveyClient /> },
    { path: "/surveyResult/:num", element: <SurveyClientResult /> },
  ];
  return (
    <Routes>
      {routeList.map((route, idx) => (
        <Route key={idx} {...route} />
      ))}
    </Routes>
  );
};

export default AppRoutes;
