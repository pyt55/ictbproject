import React, { useState } from "react";
import style from "./signup.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
//conts.Signup.tsx

interface MemberForm {
  userid: string;
  password: string;
  name: string;
  email: string;
  regDate?: string;
}

const Signups: React.FC = () => {
  const [form, setForm] = useState<MemberForm>({
    userid: "",
    password: "",
    name: "",
    email: "",
    regDate: "",
  });

  const [code, setCode] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [idMessage, setIdMessage] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const navigate = useNavigate();
  const urls = `${process.env.REACT_APP_BACK_END_URL}`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const emailCheck = async () => {
    try {
      const res = await axios.post(`${urls}/api/auth/emailCheck`, {
        email: form.email,
      });
      if (res.data === 0) {
        alert("인증 번호가 발송되었습니다.");
        setEmailMessage("인증 번호가 발송되었습니다");
        setIsEmailVerified(false);
      } else {
        setEmailMessage("이미 사용중인 이메일입니다");
      }
    } catch (error) {
      alert("이메일 인증 중 오류 발생");
      console.error(error);
    }
  };
  const checkEmailCode = async () => {
    try {
      const res = await axios.post(
        `${urls}/api/auth/emailCheck/certification`,
        {
          email: form.email,
          code: code,
        }
      );
      const result = res.data;
      if (result.success) {
        alert("이메일 인증 성공");
        setIsEmailVerified(true);
      } else {
        if (result.reason === "exceeded") {
          alert(
            "3회 이상 인증번호를 틀려 더 이상 시도할 수 없습니다.\n 다시 인증번호를 요청하세요"
          );
        } else if (result.reason === "expired") {
          alert(
            "인증번호 유효시간이 만료되었습니다 \n 다시 인증번호를 요청하세요"
          );
        } else if (result.reason === "wrong") {
          alert("인증번호가 일치하지 않습니다");
        }
      }
    } catch (error) {
      alert("인증번호 확인 오류");
      console.error(error);
    }
  };
  const idCheck = async () => {
    try {
      const res = await axios.get(`${urls}/member/idCheck?id=${form.userid}`);
      if (res.data === 0) {
        alert("사용 가능한 아이디입니다.");
        setIdMessage("사용 가능한 아이디입니다.");
      } else {
        setIdMessage("이미 사용중인 아이디입니다");
      }
    } catch (error) {
      alert("아이디 중복 확인 실패");
      console.error(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEmailVerified) {
      alert("이메일 인증을 먼저 완료해주세요.");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("userid", form.userid);
      formData.append("password", form.password);
      formData.append("name", form.name);
      formData.append("email", form.email);
      await axios.post(`${urls}/member/signup`, formData);
      alert("회원가입 완료");
      navigate("/");
    } catch (err) {
      console.error("회원가입 오류:", err);
      alert("회원가입 실패");
    }
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit} className="p-4 bg-light border rounded">
        <h2 className="text-center mb-4">회원가입</h2>

        {/* 아이디 */}
        <div className="mb-3 row">
          <label htmlFor="userid" className="col-sm-3 col-form-label fw-bold">
            아이디
          </label>
          <div className="col-sm-7">
            <input
              type="text"
              name="userid"
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-sm-2">
            <button
              type="button"
              className="btn btn-outline-secondary w-100"
              onClick={idCheck}
            >
              중복확인
            </button>
          </div>
          {idMessage && (
            <div className="col-12 text-danger small">{idMessage}</div>
          )}
        </div>

        {/* 비밀번호 */}
        <div className="mb-3 row">
          <label htmlFor="password" className="col-sm-3 col-form-label fw-bold">
            비밀번호
          </label>
          <div className="col-sm-9">
            <input
              type="password"
              name="password"
              className="form-control"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* 이름 */}
        <div className="mb-3 row">
          <label htmlFor="name" className="col-sm-3 col-form-label fw-bold">
            이름
          </label>
          <div className="col-sm-9">
            <input
              type="text"
              name="name"
              className="form-control"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* 이메일 */}
        <div className="mb-3 row">
          <label htmlFor="email" className="col-sm-3 col-form-label fw-bold">
            이메일
          </label>
          <div className="col-sm-7">
            <input
              type="email"
              name="email"
              className="form-control"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-sm-2">
            <button
              type="button"
              className="btn btn-outline-secondary w-100"
              onClick={emailCheck}
            >
              인증
            </button>
          </div>
          {emailMessage && (
            <div className="col-12 text-danger small">{emailMessage}</div>
          )}
        </div>

        {/* 인증번호 */}
        <div className="mb-3 row">
          <label htmlFor="code" className="col-sm-3 col-form-label fw-bold">
            인증번호
          </label>
          <div className="col-sm-7">
            <input
              type="text"
              id="code"
              className="form-control"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
          <div className="col-sm-2">
            <button
              type="button"
              className="btn btn-outline-success w-100"
              onClick={checkEmailCode}
            >
              확인
            </button>
          </div>
        </div>

        {/* 버튼 */}
        <div className="d-flex justify-content-between mt-4">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate(-1)}
          >
            뒤로가기
          </button>
          <button type="submit" className="btn btn-primary">
            가입하기
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signups;
