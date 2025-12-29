import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
//conts/Hone.tsx
// slick & carousel
// https://react-slick.neostack.com/docs/example
// yarn add react-slick
// yarn add slick-carousel
// yarn add --dev @types/react-slick
const Home: React.FC = () => {
  const settings = {
    dots: true, //하단점
    fade: true, //fade효과를 적용
    waitforAnimate: false,
    infintie: true, //무한반복
    speed: 500,
    slidesToShow: 1, // 한번여 보여줄 슬라이드 수
    slidesToScroll: 1, //한번에 넘길때 몇개씩 넘길까
    autoplay: true, //자동시작
    autoplaySpeed: 3000,
    arrows: true, //화살표 좌우
  };
  // 추후에 연습문제 나옴
  const homeData = [
    { id: 1, img: "images/bg1.png", text: "안녕하세요ICTPassword!" },
    { id: 2, img: "images/bg2.png", text: "Spring & React 전문가 과정" },
    { id: 3, img: "images/bg3.png", text: "함께 성장해요!" },
  ];
  return (
    <div style={{ textAlign: "center", marginBottom: "30px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Home</h2>
      <Slider {...settings}>
        {homeData.map((hdata) => (
          <div key={hdata.id}>
            <div
              style={{
                position: "relative",
                height: "400px",
                borderRadius: "10px",
                overflow: "hidden",
                background: `url(${hdata.img}) center/cover no-repeat`,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "40%",
                  left: "32%",
                  backgroundColor: "rgba(0,0,0,0.5)",
                  fontWeight: "bold",
                  padding: "20px 40px",
                  borderRadius: "8px",
                }}
              >
                {hdata.text}
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Home;
