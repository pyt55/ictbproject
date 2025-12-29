///conts/upboard/UpboardList.tsx
import React, { useEffect, useState } from "react";
import style from "./upboard.module.css";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
//1. 서버측으로 부터 받아올 UpBoardVO를 json 타입으로
// 자바스크립트(Typescript) 인터페이스를 선언
/*
{
  "totalItems": 28,
  "startPage": 1,
  "data": [
    {
      "num": 43,
      "title": "두두더더",
      "writer": "두더지",
      "content": "지렁이 어딨어",
      "imgn": "두더지2.jpg",
      "hit": 0,
      "reip": "192.168.0.386",
      "bdate": "2025-05-26 14:28:22",
      "mfile": null
    },
    .....
   ],
  "totalPages": 3,
  "endPage": 3,
  "currentPage": 1
} 
*/
interface UpBoardVO {
  num: number;
  title: string;
  writer: string;
  content: string;
  imgn: string;
  hit: number;
  reip: string;
  bdate: string;
}
//totalItems - count
//totalPages - 전체페이지수
//currentPage - 현재페이지
//startPage , endPage
const UpboardList: React.FC = () => {
  //2. 서버데이터 JsonArray를 자바스크립트 배열로 저장할 useState 만들기
  const [upboardList, setUpboardList] = useState<UpBoardVO[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1); // 기본 1값을 초기화
  const [startPage, setStartPage] = useState(1);
  const [endPage, setEndPage] = useState(1);

  //<검색>을 위한 useState를 추가한다.
  const [searchType, setSearchType] = useState("1");
  const [searchValue, setSearchValue] = useState("");

  //한번에 보여줄 페이지 블록수
  const pagePerBlock = 5;

  //3. 초기화 시 axios를 사용해서 서버측 데이트를 반아 와서 useState에 저장하기
  //http://192.168.0.3195/myictstudy/imgfile/
  const imageBasePath = `${process.env.REACT_APP_BACK_END_URL}/imgfile/`;

  const fetchUpboardList = async (page: number) => {
    try {
      //기존의 파라미터에 검색 파라미터를 추가하기
      const urls = `${process.env.REACT_APP_BACK_END_URL}/upboard/upList`;
      const response = await axios.get(urls, {
        params: {
          cPage: page,
          searchType: searchType,
          searchValue: searchValue,
        },
      });
      console.log(response.data.data);
      setUpboardList(response.data.data);
      setTotalItems(response.data.totalItems);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.currentPage);
      setStartPage(response.data.startPage);
      setEndPage(response.data.endPage);
    } catch (error) {
      console.error("데이터 가져오기 실패:" + error);
    }
  };

  //4. useEffect를 사용해서 서버로 비동기식으로 접속해서 데이터를 가져오는 설정
  useEffect(() => {
    // 서버에서 목록을 가져오는 함수
    // async () => { await .... }
    // const fetchUpboardList = async (page: number) => {
    //     try {
    //         //url에서 테스트한 주소를 복사해온다.
    //         //http://192.168.0.3195/myictstudy/upboard/upList?cPage=1
    //         //서버에 파라미터를 Map으로 전달 한다. 자바스크립트 Object 리터럴 {key,value}
    //         //=> @RequestParam Map<String, String> paramMap
    //         const urls = 'http://192.168.0.3195/myictstudy/upboard/upList'
    //         const response = await axios.get(urls,
    //             { params: { cPage: page } })

    //         console.log(response.data.data);
    //         //useState에 저장시 데이터의 키값까지 접근 하기 ****************
    //         setUpboardList(response.data.data);//useState에 저장
    //         setTotalItems(response.data.totalItems);
    //         setTotalPages(response.data.totalPages);
    //         setCurrentPage(response.data.currentPage);
    //         setStartPage(response.data.startPage);
    //         setEndPage(response.data.endPage);
    //     } catch (error) {
    //         console.error("데이터 가져오기 실패:" + error);
    //     }
    // }
    fetchUpboardList(currentPage);
  }, [currentPage]);
  //page Handler
  const pageChange = (page: number) => {
    setCurrentPage(page);
  };
  //검색 버튼 클릭시에 1페이지 부터 검색!
  const searchFunction = () => {
    fetchUpboardList(1);
  };
  return (
    <div className={style.container}>
      <h2>Upboard List = {totalItems}</h2>
      <h3>
        검수용 : totalPages {totalPages} / startPage: {startPage}/ endPage :{" "}
        {endPage}
      </h3>
      <table className={style.boardTable}>
        <thead>
          <tr>
            <td colSpan={6}>현재페이지 {currentPage}</td>
          </tr>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>이미지</th>
            <th>조회수</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          {upboardList.map((item) => (
            <tr key={item.num}>
              <td>{item.num}</td>
              <td>
                <Link
                  to={`/community/updetail/${item.num}`}
                  className={style.titleLink}
                >
                  {item.title}
                </Link>
              </td>
              <td>{item.writer}</td>
              <td>
                {item.imgn ? (
                  // <img src={`${imageBasePath}${item.imgn}`}
                  //     alt={item.title} style={{ width: '80px', height: 'auto' }}
                  // />
                  <img
                    src={`${imageBasePath}${item.imgn}`}
                    alt={item.title}
                    style={{ width: "80px", height: "auto" }}
                  />
                ) : (
                  "NO Image"
                )}
              </td>
              <td>{item.hit}</td>
              <td>{item.bdate}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          {/* 검색폼 추가 영역 */}
          <tr>
            <th colSpan={6} className="text-center align-middle">
              <select
                onChange={(e) => {
                  setSearchType(e.target.value);
                }}
              >
                <option value="1">작성자</option>
                <option value="2">제목</option>
                <option value="3">내용</option>
              </select>
              <input
                type="text"
                onChange={(e) => {
                  setSearchValue(e.target.value);
                }}
              />
              <button className="btn btn-warning" onClick={searchFunction}>
                검색
              </button>
            </th>
          </tr>
          {/* 검색폼 추가 영역 */}
          <tr>
            <td colSpan={6} style={{ textAlign: "center" }}>
              <nav>
                <ul className="pagination justify-content-center">
                  {startPage > 1 && (
                    <li className="page-item">
                      <button
                        className="page-link"
                        onClick={() => {
                          pageChange(startPage - 1);
                        }}
                      >
                        이전
                      </button>
                    </li>
                  )}
                  {/* 페이지 출력하기 */}
                  {
                    // startPage = 1 , endPage=3 => [1,2,3]이란 배열을 만들어 준다.
                    Array.from(
                      { length: endPage - startPage + 1 },
                      (xx, i) => i + startPage
                    ).map((page) => (
                      <li
                        key={page}
                        className={`page-item ${
                          page === currentPage ? "active" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => {
                            pageChange(page);
                          }}
                        >
                          {page}
                        </button>
                      </li>
                    ))
                  }

                  {/*
                                NextPage 출력하기 : totalPage 보다 endPage 적을 때 다음페이지가 
                                있는 것으로 계산        
                                */}
                  {endPage < totalPages && (
                    <li className="page-item">
                      <button
                        className="page-link"
                        onClick={() => {
                          pageChange(endPage + 1);
                        }}
                      >
                        다음
                      </button>
                    </li>
                  )}
                </ul>
              </nav>

              {/* UpBoardForm.tsx  */}
              <Link to="/community/upform" className={style.button}>
                글쓰기
              </Link>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};
export default UpboardList;
