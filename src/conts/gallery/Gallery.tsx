import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./gallery.module.css";
import { galleryItems } from "./galleryData";
import axios from "axios";
// const galleryItems = [
//   { id: 1, title: '바다', image: 'images/bg1.png' },
//   { id: 2, title: '산', image: 'images/bg2.png' },
//   { id: 3, title: '도시', image: 'images/bg3.png' },
//   { id: 4, title: '숲', image: 'images/bg4.png' },
//   { id: 5, title: '숲', image: 'images/bg4.png' }
// ];

// {
//     "totalItems": 13,
//     "startPage": 1,
//     "data": [
//         {
//             "HIT": 0,
//             "ROW_NUM": 1,
//             "NUM": 32,
//             "WRITER": "테스트",
//             "GALLERYID": 32,
//             "TITLE": "테스트",
//             "IMAGENAME": "ganadi4.jpg",
//             "REIP": "192.168.0.320",
//             "GDATE": "2025-12-09T05:22:08.000+00:00",
//             "CONTENTS": "반가워요"
//         },,,,,,,,,,,,,,,
//     ],
//     "totalPages": 2,
//     "endPage": 2,
//     "currentPage": 1
// }

interface GalleryVO {
  NUM: number;
  TITLE: string;
  WRITER: string;
  CONTENTS: string;
  REIP?: string;
  HIT?: number;
  GDATE?: string;
  IMAGENAME: string;
}

const Gallery: React.FC = () => {
  const [galleryList, setGalleryList] = useState<GalleryVO[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1); // 기본 1값을 초기화
  const [startPage, setStartPage] = useState(1);
  const [endPage, setEndPage] = useState(1);

  //<검색>을 위한 useState를 추가한다.
  const [searchType, setSearchType] = useState("1");
  const [searchValue, setSearchValue] = useState("");

  //한번에 보여줄 페이지 블록수
  const imageBasePath = `${process.env.REACT_APP_BACK_END_URL}/imgfile/gallery/`;

  const fetchUpboardList = async (page: number) => {
    try {
      //기존의 파라미터에 검색 파라미터를 추가하기
      const urls = `${process.env.REACT_APP_BACK_END_URL}/gallery/galleryList`;
      console.log(urls);
      const response = await axios.get(urls, {
        params: {
          cPage: page,
          searchType: searchType,
          searchValue: searchValue,
        },
      });
      console.log(response.data.data);
      setGalleryList(response.data.data);
      setTotalItems(response.data.totalItems);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.currentPage);
      setStartPage(response.data.startPage);
      setEndPage(response.data.endPage);
    } catch (error) {
      console.error("데이터 가져오기 실패:" + error);
    }
  };
  useEffect(() => {
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
    <div className={styles.container}>
      <h2 className={styles.title}>갤러리</h2>
      <div style={{ textAlign: "right", marginBottom: "15px" }}>
        <Link to="/gallery/write" className={styles.button}>
          이미지 추가
        </Link>
      </div>
      <div className={styles.grid}>
        {galleryList.map((item) => (
          <Link
            to={`/gallery/gdetail/${item.NUM}`}
            key={item.NUM}
            style={{ textDecoration: "none" }}
          >
            <div className={styles.card}>
              <img src={`${imageBasePath}${item.IMAGENAME}`} alt={item.TITLE} />
              <div className={styles.cardTitle}>{item.TITLE}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
