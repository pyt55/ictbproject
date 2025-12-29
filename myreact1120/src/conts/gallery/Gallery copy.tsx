import React from 'react';
import { Link } from 'react-router-dom';
import styles from './gallery.module.css';
import { galleryItems } from './galleryData';
// const galleryItems = [
//   { id: 1, title: '바다', image: 'images/bg1.png' },
//   { id: 2, title: '산', image: 'images/bg2.png' },
//   { id: 3, title: '도시', image: 'images/bg3.png' },
//   { id: 4, title: '숲', image: 'images/bg4.png' },
//   { id: 5, title: '숲', image: 'images/bg4.png' }
// ];

const Gallery: React.FC = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>갤러리</h2>
      <div style={{ textAlign: 'right', marginBottom: '15px' }}>
        <Link to="/gallery/write" className={styles.button}>이미지 추가</Link>
      </div>
      <div className={styles.grid}>
        {galleryItems.map(item => (
          <Link to={`/gallery/${item.id}`} key={item.id} style={{ textDecoration: 'none' }}>
            <div className={styles.card}>
              <img src={item.image} alt={item.title} />
              <div className={styles.cardTitle}>{item.title}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Gallery;