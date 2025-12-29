import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./upboard.module.css";
// 서버측에서 처리할 파라미터는 생략이 가능한 ? 로 표시
interface UpBoardVO {
  num?: number;
  title: string;
  writer: string;
  content: string;
  imgn?: string;
  hit?: number;
  reip?: string;
  bdate?: string;
  mfile: File | null; // 클라이언트가 파일을 전송하기 위해서 선언
}
const UpboardForm: React.FC = () => {
  const [formData, setFormData] = useState<UpBoardVO>({
    title: "",
    writer: "",
    content: "",
    mfile: null as File | null,
  });

  //   file 객체를 사용해서 읽어 들인 값을 미리보기 용으로 사용할 usestate
  //  arrayBuffer는 저장시 new FileReader에 의해서 바이너리로 저장
  //  사용할때는 String으로 변환해줌
  const [preview, setpreview] = useState<string | ArrayBuffer | null>(null);

  //form데이터를 받아서 저장할 함수
  const formChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // target.의 name,value를 가지고옴
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 파일 데이터를 change 받아서 useState에 저장할 함수
  const fileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      //   setFormData({ ...formData, mfile: e.target.files[0] });

      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log("이미지 감지 " + reader.result);
        setpreview(reader.result);
      };
      // 파일 주소 등록
      reader.readAsDataURL(file);
      setFormData({ ...formData, mfile: file });
    }
  };

  // axios 사용법
  //   const FN = async () => {
  //     await axios.post(url, data, { header });
  //     const response = await axios.get(url);
  //     response.data;
  //   };

  const navigate = useNavigate();

  // chnage 이후의 값을 axios를 사용해서 전송
  const myFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    // usestate에 저장된값을 data에 저장
    data.append("title", formData.title);
    data.append("writer", formData.writer);
    data.append("content", formData.content);
    if (formData.mfile) {
      data.append("mfile", formData.mfile);
    }
    try {
      // postman에서 테스트한 주소를 복사해서 붙여넣기
      //http://192.168.0.324/myictstudy/upboard/upboardAdd
      const url = `${process.env.REACT_APP_BACK_END_URL}/upboard/upboardAdd`;
      await axios.post(url, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/community/uplist");
    } catch (error) {
      console.log("Error =>" + error);
    }
    console.log(
      "FormData 전송시 name 필수! title =>" +
        formData.title +
        ", writer => " +
        formData.writer
    );
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>이미지 등록 예제</h2>
      <form onSubmit={myFormSubmit} className={styles.form}>
        <table>
          <tbody>
            <tr>
              <th>제목</th>
              <td>
                <input
                  type="text"
                  name="title"
                  id="title"
                  className={styles.input}
                  onChange={formChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <th>작성자</th>
              <td>
                <input
                  type="text"
                  name="writer"
                  id="writer"
                  className={styles.input}
                  onChange={formChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <th>내용</th>
              <td>
                <textarea
                  name="content"
                  id="content"
                  style={{ width: "90%", height: "150px", padding: "8px" }}
                  onChange={formChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <th>이미지</th>
              <td>
                <input
                  type="file"
                  name="mfile"
                  id="mfile"
                  className={styles.input}
                  onChange={fileChange}
                  required
                />
              </td>
            </tr>
            {preview && (
              <tr>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  <img
                    src={preview as string}
                    alt=""
                    style={{
                      width: "150px",
                      height: "150px",
                      marginRight: "10px",
                      marginBottom: "10px",
                    }}
                  />
                </td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr>
              <th colSpan={2}>
                <button type="submit" className={styles.button}>
                  등록하기
                </button>
              </th>
            </tr>
          </tfoot>
        </table>
      </form>
    </div>
  );
};

export default UpboardForm;
