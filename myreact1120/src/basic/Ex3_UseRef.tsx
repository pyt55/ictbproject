import React, { useRef, useState } from "react";

// DOM  요소에 직접 접근하거나 리렌더링을 발생시키지 않고 값ㅇ르 유지하고싶을때 사용
// 값이 바뀔때 화면도 바뀌어야한다면 useState,
// 값을 기억하지만  화면이 굳이 안바뀌어도 된다면 useRef
const Ex3_UseRef: React.FC = () => {
  //   DOM에 적용할 포커스를 가리키기 위해 useRef 사용
  // HTMLInputElement 객체는 태그 내에 ref 속성을 연결해야함
  {
    /* <input type="text" ref="ref이름"/> */
  }
  const inputRef = useRef<HTMLInputElement>(null);
  //   const spanRef = useRef
  const [value, setValue] = useState("");
  const renderCountRef = useRef(0);
  renderCountRef.current += 1; //
  const spanRef = useRef<HTMLSpanElement>(null);
  const showValue = () => {
    if (inputRef.current && spanRef.current) {
      spanRef.current.textContent = `입력값 useRef:  ${inputRef.current.value}`;
    }
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };
  const getValue = () => {
    if (inputRef.current) {
      alert("입력값" + inputRef.current.value);
    }
  };
  return (
    <div>
      <p>렌더링 횟수 : {renderCountRef.current} </p>
      <input
        type="text"
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={focusInput}>Focus</button>
      <button onClick={getValue}>값 확인</button>
      <button onClick={showValue}> Span(useRef) 에출력 </button>
      <p>입력값 (usestate) : {value}</p>
      <span ref={spanRef}></span>
    </div>
  );
};

export default Ex3_UseRef;
