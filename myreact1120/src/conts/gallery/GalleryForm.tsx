import React, { useState } from "react";
import styles from "./gallery.module.css";
import { useNavigate } from "react-router-dom";
import { resolve } from "path";

//미리보기, 폼 전송을 위한 인터페이스
interface FormData {
  num: number;
  title: string;
  writer: string;
  contents: string;
  reip?: string;
  hit?: number;
  gdate?: string;
  //https://developer.mozilla.org/ko/docs/Web/API/File
  //File Interface는 javascript에서 파일을 접근할 수 있는 자바스크립트 객체이다.
  // images: File | null;
  images: File[];
}

const GalleryForm: React.FC = () => {
  // jsObject 형 State를 선언, 초기화
  const [formData, setFormData] = useState<FormData>({
    num: 0,
    title: "",
    writer: "",
    contents: "",
    images: [], //여러개의 이미지 파일 [data:img/pngAS,data:img/pngAS]
  });
  // 미리보기를 구현할때 사용하는 상태관리 (넘어오는 파일의 이름이 한개가 아니기 때문에 배열로 처리리)
  const [preview, setPreview] = useState<string[]>([]);
  // navigate
  const naviate = useNavigate();
  const galleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 선택되었었을떄, 이미지인지 아니면 일반 소것ㅇ인지를 구별
    const { name, value, files } = e.target;
    console.log("AllNames : " + name + ":" + value);
    if (name === "images" && files) {
      console.log(`ImageName : ${name} : ${value} | ${files[0]}, ${files[1]}`);
      console.log(`typeofFIle => ${typeof files}`);
      console.log("-------------------------");
      const fileArray = Array.from(files);
      const filePreviews = fileArray.map((file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        return new Promise<string>((resolve) => {
          reader.onload = () => {
            resolve(reader.result as string);
          };
        });
      });
      Promise.all(filePreviews).then((pUrls) => {
        setPreview(pUrls);
      });
      setFormData({ ...formData, images: fileArray });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  const gallerySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const myFormData = new FormData();

    myFormData.append("writer", formData.writer);
    myFormData.append("title", formData.title);
    myFormData.append("contents", formData.contents);
    formData.images.forEach((file, index) => {
      myFormData.append("images", file);
    });

    try {
      console.log("formdata => " + myFormData);
      const response = await fetch(
        `${process.env.REACT_APP_BACK_END_URL}/gallery/add`,
        { method: "POST", body: myFormData }
      );
      naviate("/gallery");
    } catch (error) {
      console.log("전송 오류:" + error);
    }
  };
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>이미지 등록</h2>
      <form className={styles.form} onSubmit={gallerySubmit}>
        <input
          className={styles.input}
          type="text"
          name="title"
          placeholder="제목 입력"
          onChange={galleryChange}
        />
        <input
          type="text"
          id="contents"
          name="contents"
          onChange={galleryChange}
          className="form-control"
          placeholder="내용"
        />
        <input
          type="text"
          id="writer"
          name="writer"
          onChange={galleryChange}
          className="form-control"
          placeholder="작성자"
        />
        <input
          className={styles.input}
          type="file"
          name="images"
          multiple
          placeholder="이미지 URL 입력"
          onChange={galleryChange}
        />
        {/* 이미지 미리보기 */}
        {preview.length > 0 && (
          <div className="mb-3">
            {preview.map((p, index) => (
              <p key={index}>
                <img
                  src={p}
                  alt=""
                  className="img-thumbnail"
                  style={{
                    marginRight: "10px",
                    marginBottom: "10px",
                    width: "150px",
                    height: "150px",
                  }}
                />
                <span>{p}</span>
              </p>
            ))}
          </div>
        )}
        <button type="submit" className={styles.button}>
          등록
        </button>
      </form>
    </div>
  );
};

export default GalleryForm;
