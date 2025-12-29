import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SurveyClient.css";
import { useNavigate } from "react-router-dom";

interface SurveyContent {
  surveytype: string;
  surveytitle: string;
  surveyCnt: number;
}

interface Survey {
  num: number;
  sub: string;
  code: number;
  contents: SurveyContent[];
}

const SurveyClient: React.FC = () => {
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [selectedSurveyType, setSelectedSurveyType] = useState<string | null>(
    null
  );
  const navigate = useNavigate();
  // 서버에서 최신 설문 데이터를 가져오는 함수
  const fetchLatestSurvey = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACK_END_URL}/api/survey/latest`
      );
      if (response.status === 200) {
        console.log(response.data);
        setSurvey(response.data);
      } else {
        console.log("No survey data available.");
      }
    } catch (error) {
      console.error("Failed to fetch survey:", error);
    }
  };

  const submitSurvey = async (e: React.FormEvent) => {
    e.preventDefault(); // 폼 기본 동작 방지
    if (!selectedSurveyType || !survey) {
      alert("항목을 선택해주세요.");
      return;
    }

    try {
      // 선택된 설문 항목을 서버로 전송
      const response = await axios.post(
        `${process.env.REACT_APP_BACK_END_URL}/api/survey/updateCount`,
        {
          subcode: survey.num, // 설문 번호
          surveytype: selectedSurveyType, // 선택된 설문 유형
        }
      );

      if (response.status === 200) {
        alert("설문이 성공적으로 제출되었습니다.");
        //fetchLatestSurvey(); // 제출 후 설문 데이터 다시 로드
        navigate(`/surveyResult/${survey.num}`); // 설문조사 이후 결과로 이동
      } else {
        alert("설문 제출에 실패했습니다.");
      }
    } catch (error) {
      console.error("Failed to submit survey:", error);
      alert("설문 제출 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    fetchLatestSurvey();
  }, []);

  if (!survey) {
    return <div>설문 데이터를 불러오는 중...</div>;
  }

  return (
    <div className="container">
      <h2>{survey.sub}</h2>
      <p>문항 수: {survey.code}</p>

      <form onSubmit={submitSurvey}>
        {survey.contents.map((content, index) => (
          <div key={index} className="mb-3">
            {/* <label className="form-label">
              {content.surveytype}. {content.surveytitle}
            </label> */}
            <div>
              <input
                type="radio"
                name="surveytype"
                value={content.surveytype}
                onChange={(e) => setSelectedSurveyType(e.target.value)}
              />{" "}
              {content.surveytitle}
            </div>
          </div>
        ))}
        <button type="submit" className="btn btn-primary">
          제출
        </button>
      </form>
    </div>
  );
};

export default SurveyClient;
