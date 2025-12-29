import axios from "axios";
import React, { use, useEffect, useState } from "react";

//부모로 전송되어오는 프로퍼티
interface UpBoardCommProps {
  num?: string;
}

//서버로부터 전송되어오는 json 구조를 인터페이스로 선언
interface UpBoardCommVO {
  num: number;
  ucode: number;
  uwriter: string;
  ucontent: string;
  reip: string;
  uregdate: string;
}

const UpBoardComm: React.FC<UpBoardCommProps> = ({ num }) => {
  const [comments, setComments] = useState<UpBoardCommVO[]>([]);

  const getComments = async () => {
    try {
      const url = `http://192.168.0.3/myictstudy/upboard/upcommList?num=${num}`;
      const response = await axios.get<UpBoardCommVO[]>(url);
      console.log(response.data);
      setComments(response.data);
    } catch (error) {
      console.log(error, "데이터 로딩 실패");
    }
  };

  //   상세보기의 키값은 num값을 변경이될때 마다 getcomments() 실행
  useEffect(() => {
    console.log("num =>" + num);
    getComments();
  }, [num]);

  const [writer, setWriter] = useState("");
  const [content, setContent] = useState("");

  const commentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`writer => ${writer}`);
    console.log(`content => ${content}`);
    // json 화 시킬때 upboarCommVO의 프로퍼티와 같아야함
    const commentData = {
      ucode: num,
      uwriter: writer,
      ucontent: content,
      reip: "192.168.0.35",
    };
    try {
      //post(url,data, {headers: 'Content-Type': 'application/json'})
      await axios.post(
        `http://192.168.0.3/myictstudy/upboard/upcommAdd`,
        commentData,
        { headers: { "Content-Type": "application/json" } }
      );
      setWriter("");
      setContent("");
      console.log("완료");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mt-4">
      <h4>Comments</h4>
      <form className="mb-3" onSubmit={commentSubmit}>
        <div className="mb-2">
          <input
            type="text"
            placeholder="작성자"
            className="form-control"
            onChange={(e) => setWriter(e.target.value)}
          />
        </div>
        <div className="mb-2"></div>
        <div className="text-center">
          <textarea
            className="form-control"
            placeholder="댓글"
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary">
            댓글작성
          </button>
        </div>
      </form>
      <ul className="list-group">
        {comments.map((vo) => (
          <li key={vo.num} className="list-group-item">
            <strong>{vo.uwriter}</strong>
            <span className="text-muted">{vo.uregdate}</span>
            <p>{vo.ucontent}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UpBoardComm;
