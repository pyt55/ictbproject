//BoardDetail.tsx
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { boardList } from "./boardData";
import style from "./board.module.css";
import { Link } from "react-router-dom";
const BoardDetail: React.FC = () => {
  const navigator = useNavigate();
  // path에서 전달되어 온 값을 받아서 처리해주는 Hook
  // useParams()
  // <Route path='/board/:id' => {id}
  const { id } = useParams<{ id: string }>();
  const oriBoardList = JSON.parse(localStorage.getItem("boardList") || "[]"); //boardList가 없으면 []
  const details = oriBoardList.filter((item: any) => item.id === Number(id));
  console.log(`상세보기 => ${typeof id} || ${details}`);
  console.log(details);

  const delBoard = () => {
    if (window.confirm("정말 삭제할거얌?")) {
      const oriBoardList = JSON.parse(
        localStorage.getItem("boardList") || "[]"
      );
      const newBoardList = oriBoardList.filter(
        (item: any) => item.id !== Number(id)
      );
      localStorage.setItem("boardList", JSON.stringify(newBoardList));
      alert("삭제도미");
      navigator("/board");
    }
  };

  return (
    <div className={style.container}>
      <h2>게시글 상세페이지</h2>
      <table className={style.boardTable}>
        <tbody>
          <tr>
            <th>제목</th>
            <td>{details[0]?.title}</td>
          </tr>
          <tr>
            <th>작성자</th>
            <td>{details[0]?.writer}</td>
          </tr>
          <tr>
            <th>내용</th>
            <td>{details[0]?.content}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={2} style={{ textAlign: "center" }}>
              <button className={style.button} onClick={delBoard}>
                삭제
              </button>
              <Link to="/board" className={style.button}>
                목록으로
              </Link>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};
export default BoardDetail;
