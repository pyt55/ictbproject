import React, { useEffect, useState } from "react";
import styles from "./upboard.module.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import UpBoardComm from "./UpBoardComm";

interface UpBoardVO {
  num: number;
  title: string;
  writer: string;
  content: string;
  imgn?: string;
  hit?: number;
  reip?: string;
  bdate?: string;
  mfile: File | null;
}
const UpBoardDetail: React.FC = () => {
  const [upboard, setUpboard] = useState<UpBoardVO | null>(null);
  //라우터에서 넘어오는 파라미터를 받아서 저장한다.
  const { num } = useParams<{ num: string }>();
  // 파라미터가 잘 넘어오는지 테스트해보기
  console.log(`num => ${num}`);

  const imageBasePath = `${process.env.REACT_APP_BACK_END_URL}/imgfile/`;

  useEffect(() => {
    const detailServer = async () => {
      const url = `http://192.168.0.3/myictstudy/upboard/updetail?num=${num}`;
      const resp = await axios.get(url);
      console.log(resp.data);
      // usestate에 가져온 데이터 저장
      setUpboard(resp.data);
    };
    detailServer();
  }, [num]);

  return (
    <div className={styles.container}>
      <h1>여기는 상세보기</h1>
      <table className={styles.boardTable}>
        <tbody>
          <tr>
            <th>번호</th>
            <td>{upboard?.num}</td>
          </tr>
          <tr>
            <th>제목</th>
            <td>{upboard?.title}</td>
          </tr>
          <tr>
            <th>작성자</th>
            <td>{upboard?.writer}</td>
          </tr>
          <tr>
            <th>내용</th>
            <td>{upboard?.content}</td>
          </tr>
          <tr>
            <th>이미지</th>
            <td>
              {upboard?.imgn && (
                <img
                  src={`${imageBasePath}${upboard.imgn}`}
                  alt={upboard.title}
                  className="img-fluid mt2"
                />
              )}
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={2} style={{ textAlign: "center" }}>
              <button type="submit" className={styles.button}>
                삭제
              </button>
              <Link to="/community/uplist" className={styles.button}>
                목록으로
              </Link>
            </td>
          </tr>
        </tfoot>
      </table>
      <hr />
      <UpBoardComm num={num} />
    </div>
  );
};

export default UpBoardDetail;
