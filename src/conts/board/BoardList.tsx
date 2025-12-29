import React, { useEffect, useState } from "react";
import style from "./board.module.css";
import { Link } from "react-router-dom";
import { BoardItem } from "./boardData";
const BoardList: React.FC = () => {
  const [boardList, setBoardList] = useState<BoardItem[]>([]);

  useEffect(() => {
    const data = localStorage.getItem("boardList");
    if (data) {
      setBoardList(JSON.parse(data));
    }
  }, []);

  //list(range(1,11)) => Arrays.from(갯수,()=>{})
  // const boardData = [
  //     {num:1,title:"음하하",writer:"테스형"},
  // ]

  return (
    <div className={style.container}>
      <h2>BoardList</h2>
      <table className={style.boardTable}>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
          </tr>
        </thead>
        <tbody>
          {
            //[{id:1,title:'테스'},{},...].map((item)=>(<p></p>))
            //item은 {id:1,title:'테스'}
            //array.map((item)=>(<p>{item.id}</p>))

            boardList.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>
                  {/* BoardDetail.tsx를 라우팅 주소  */}
                  <Link to={`/board/${item.id}`} className={style.titleLink}>
                    {item.title}
                  </Link>
                </td>
                <td>{item.writer}</td>
              </tr>
            ))
          }
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3} style={{ textAlign: "center" }}>
              {/* BoardForm.tsx  */}
              <Link to="/board/write" className={style.button}>
                글쓰기
              </Link>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default BoardList;
