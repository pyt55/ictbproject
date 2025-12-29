import React, { memo } from "react";
//버튼 클릭이 되면 count 상태가 변경되고, memo 덕분에 불필요하게 다시 랜더링 되는것을 줄일수 있다.
interface ButtonProps {
  onClick: () => void;
  label: string;
}

//memo함수를 사용해서 함수형 컴포넌트에서 버튼의 랜더링을 제어
const MemoizedButton = memo(function Button({ onClick, label }: ButtonProps) {
  console.log(`Button "${label}" 랜더링`);
  return (
    <button
      onClick={onClick}
      style={{
        margin: "5px",
        padding: "8px 16px",
        backgroundColor: "orange",
        color: "white",
        border: "none",
        borderRadius: "5px",
      }}
    >
      {label}
    </button>
  );
});

export default MemoizedButton;
