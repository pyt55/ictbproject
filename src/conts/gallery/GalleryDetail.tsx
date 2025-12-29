//GalleryDetail.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./gallery.module.css";
import { galleryItems } from "./galleryData";
import { Link } from "react-router-dom";

import style from "./gallery.module.css";
import axios from "axios";

interface GalleryItem {
  num: number;
  title: string;
  contents: string;
  writer: string;
  reip: string;
  hit: number;
  gedate: string;
  getimglist: string[] | null;
}

const GalleryDetail: React.FC = () => {
  const { num } = useParams<{ num: string }>();
  const [item, setItem] = useState<GalleryItem | null>(null);
  const [loading, setLoading] = useState(true);

  //   const item = galleryItems.find((it) => it.id === Number(id));
  //   alert(item?.image);
  useEffect(() => {
    const fetchData = async () => {
      if (!num) {
        <p>파라미터가 없습니다.</p>;
        setLoading(false);
        return;
      }
      try {
        const url = `${process.env.REACT_APP_BACK_END_URL}/gallery/gdetail`;
        const response = await axios.get(url, {
          params: { num: parseInt(num) },
        });
        console.log("데이터");
        console.log(response.data);

        setItem(response.data);
      } catch (error) {
        console.error("데이터 요청 실패", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [num]);

  if (loading) return <p>로딩중...</p>;
  if (!item) return <p>이미지를 찾을수 없습니다</p>;

  const delgallery = () => {
    localStorage.getItem("galleryList");
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{item.title}</h2>
      <div className={styles.detail}>
        <p>
          <strong>작성자:</strong> {item.writer}
        </p>
        <p>
          <strong>내용:</strong> {item.contents}
        </p>
        <p>
          <strong>작성일:</strong> {item.gedate}
        </p>
        <p>
          <strong>조회수:</strong> {item.hit}
        </p>
        <div className={styles.imagebox}>
          {item.getimglist && item.getimglist.length > 0 ? (
            item.getimglist.map((img, idx) => (
              <img
                key={idx}
                src={`http://192.168.0.3/myictstudy/imgfile/gallery/${img}`}
                alt={`img-${idx}`}
              />
            ))
          ) : (
            <p>이미지가 없습니다</p>
          )}
        </div>
      </div>
      <button className={style.button} onClick={delgallery}>
        삭제
      </button>
      <Link to="/board" className={style.button}>
        목록으로
      </Link>
    </div>
  );
};
export default GalleryDetail;
