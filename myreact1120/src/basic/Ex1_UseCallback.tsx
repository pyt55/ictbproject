import React, { useCallback, useState } from "react";
import MemoizedButton from "./MemoizedButton";

// useCallBack => useMemo와 비슷하지만 함수에 특화 되어있음
const Ex1_UseCallback: React.FC = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");
  //   메모제이션이 없이 매 랜더링 마다 새로 생성됨
  const noMemoInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  //   useCallback으로 함수 메모제이션, [] 비어있으면 초기화
  const chIncrement = useCallback(() => {
    setCount((c) => c + 1);
  }, []);
  const chReset = useCallback(() => {
    setCount(0);
  }, []);

  return (
    <div>
      <h2>useCallback 예제</h2>
      <div>
        <p>카운트 : {count}</p>
        <MemoizedButton onClick={chIncrement} label="증가" />
        <MemoizedButton onClick={chReset} label="초기화" />
        <MemoizedButton onClick={() => setCount((c) => c - 1)} label="감소" />
      </div>
      <div style={{ marginTop: "20px" }}>
        <p>입력값변경이 되어도 메모제이션된 버튼은 다시 랜더링 안됨</p>
      </div>
      <input type="text" value={text} onChange={noMemoInputChange} />
    </div>
  );
};

export default Ex1_UseCallback;
