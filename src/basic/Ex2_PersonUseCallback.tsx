import React, { useCallback, useMemo, useState } from "react";

const Ex2_PersonUseCallback: React.FC = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [ssn, setSsn] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [people, setPeople] = useState<any[]>([]);
  const [nextId, setNextId] = useState(1);

  const [chcolor, setChcolor] = useState(false);
  const [bgcolors, setBgcolors] = useState("orange");

  const sendSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log(`submit 버튼이 클릭됨 ${name}`);
      const newPeople = { id: nextId, name, age, ssn, email, phone };
      //people에 new people을 넣기
      setPeople([...people, newPeople]);
      setNextId(nextId + 1);
      setName("");
      setAge("");
      setSsn("");
      setEmail("");
      setPhone("");
    },
    [name, age, ssn, email, phone, nextId]
  );

  const peopleRows = useMemo(() => {
    console.log("people map useMemo 적용됨!");
    setChcolor(true);
    return people.map((e, idx) => (
      <tr key={idx}>
        <td>{e.name}</td>
        <td>{e.age}</td>
        <td>{e.ssn}</td>
        <td>{e.email}</td>
        <td>{e.phone}</td>
      </tr>
    ));
  }, [people]);

  const changeData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBgcolors(e.target.value);
    console.log("색상값 => " + e.target.value);
  };

  return (
    <div style={{ backgroundColor: bgcolors }}>
      <h1>폼 처리</h1>
      <form
        onSubmit={sendSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <input
          type="text"
          value={name}
          placeholder="이름을 입력하세요"
          required
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          type="number"
          value={age}
          placeholder="나이를 입력하세요"
          onChange={(e) => {
            setAge(e.target.value);
          }}
        />
        <input
          type="number"
          value={ssn}
          placeholder=" 주민번호 앞 6자리 + 뒤 1자리"
          required
          pattern="\d{7}"
          maxLength={7}
          onChange={(e) => {
            setSsn(e.target.value);
          }}
        />
        <input
          type="email"
          value={email}
          placeholder="이메일을 입력하세요"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="tel"
          value={phone}
          placeholder="전화번호를 입력하세요"
          onChange={(e) => {
            setPhone(e.target.value);
          }}
        />
        <button
          type="submit"
          style={{
            backgroundColor: "skyblue",
            border: "none",
            padding: "10px",
            cursor: "pointer",
          }}
        >
          추가
        </button>
      </form>
      <hr />
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "pink", color: "#fff" }}>
            <th>이름</th>
            <th>나이</th>
            <th>주민번호</th>
            <th>이메일</th>
            <th>전화번호</th>
          </tr>
        </thead>
        <tbody>
          {/* {people.map((e, idx) => (
            <tr key={idx}>
              <td>{e.name}</td>
              <td>{e.age}</td>
              <td>{e.ssn}</td>
              <td>{e.email}</td>
              <td>{e.phone}</td>
            </tr>
          ))} */}
          {peopleRows}
        </tbody>
        <tfoot>
          <tr>
            <th colSpan={5}>
              <input type="color" onChange={changeData} />
            </th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default Ex2_PersonUseCallback;
