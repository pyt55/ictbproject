import React from "react";
import HTMLFlipBook from "react-pageflip";

interface MyBookProps {
  // 책 디자인의 너비, 높이 필수
  width?: number;
  height?: number;
  style?: React.CSSProperties;
  clasName?: string; //우리가 만들 클래스 속성 적용
  showCover?: boolean;
  autoSize?: boolean;
  maxShadowOpacity?: number; // 페이지를 넘길때 투명도값
  mobileScrollSupport?: boolean; // 모바일 장치에서 스크롤로 넘길것이니
}

const Diary: React.FC = () => {
  const myData = [
    {
      image: "images/bg1.png",
      text: "오늘은 강가를 걸었다. 물소리가 너무 안좋았다.",
    },
    {
      image: "images/bg2.png",
      text: "오늘은 산속을 걸었다. 물소리가 너무 안좋았다.",
    },
    {
      image: "images/bg3.png",
      text: "오늘은 바닷가를 걸었다. 물소리가 너무 안좋았다.",
    },
    {
      image: "images/bg4.png",
      text: "오늘은 숲속을 걸었다. 물소리가 너무 안좋았다.",
    },
    {
      image: "images/bg5.png",
      text: "오늘은 거리를 걸었다. 물소리가 너무 안좋았다.",
    },
  ];

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <h2>Diary</h2>
      <div
        style={{
          width: "620px",
          margin: "20px auto",
          overflow: "hidden",
          borderRadius: "10px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.2",
        }}
      >
        {/*           {...({ style: {}, usePortrait: true } as any)} == 동적으로 스타일 인터페이스 추가 */}
        <HTMLFlipBook
          width={300}
          height={400}
          showCover={true}
          {...({ style: {}, usePortrait: true } as any)}
          autoSize={true}
          mobileScrollSupport={true}
          maxShadowOpacity={0.2}
          usePortrait={true} // 모바일에서 화면이 작으면 책이 한장
          style={{ borderRadius: "10px" }}
        >
          {/* myData에서 flatmap을 사용 데이터를 반복 배치하기 */}
          {(() =>
            myData.flatMap((entry, idx) => [
              <div
                key={`img-${idx}`}
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "#fff",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  overflow: "hidden",
                }}
              >
                <img
                  src={entry.image}
                  alt={`Diary Image ${idx + 1}`}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>,

              //텍스트 페이지
              <div
                key={`txt-${idx}`}
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "#fff",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "20px",
                  fontSize: "18px",
                }}
              >
                <p style={{ margin: 0 }}>{entry.text}</p>
              </div>,
            ]))()}
        </HTMLFlipBook>
      </div>
    </div>
  );
};

export default Diary;
