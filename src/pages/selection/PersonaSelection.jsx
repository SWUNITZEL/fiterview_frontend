import React, { useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { Container } from '@mui/material';
import "./PersonaSelection.css";
import { personas } from "../../data/personas";
import NavbarComponent from '../../components/Navbar';
import LoadingModal from '../../components/LoadingModal';
import { PATH } from "../../data/paths";

const PersonaSelection = () => {
  const [selectedIds, setSelectedIds] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate();

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const school = query.get("school");
  const department = query.get("department");
  const interviewType = query.get("interviewType");
  const questionCount = parseInt(query.get("questionCount"));
  const timeLimit = parseInt(query.get("timeLimit"));
  const interviewDate = query.get("interviewDate");

  const INTERVIEW_CONFIG_URL = `${process.env.REACT_APP_API_URL}interview/start`

  const handleSelect = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      if (selectedIds.length < 2) {
        setSelectedIds([...selectedIds, id]);
      } else {
        alert("최대 2명까지 선택할 수 있습니다.");
      }
    }
  };

  const handleStartInterview = async () => {
    if (selectedIds.length === 0) {
      alert("면접관을 최소 1명 이상 선택해주세요.");
      return;
    }

    const updatedState = {
      school,
      department,
      interviewType,
      questionCount,
      timeLimit,
      interviewDate,
      persona: selectedIds,
    };

    console.log("업데이트된 state:");
    console.log(updatedState);

    try {
      setIsLoading(true)
      const response = await fetch(INTERVIEW_CONFIG_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedState),
      });

      if (!response.ok) {
        throw new Error("서버에 설정을 저장하는 데 실패했습니다.");
      }

      const result = await response.json();

      console.log("서버 응답:", result);

      if (result.interviewId) {
        navigate(PATH.INTERVIEW_SELF_CHECK);
      } else {
        alert("면접 ID를 받아올 수 없습니다.");
      }
    } catch (error) {
      console.error("면접 설정 저장 중 오류 발생:", error);
      alert("면접 시작 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <Container maxWidth={false}
                  style={{
                    backgroundColor: "var(--background-color)",
                    minHeight: "100vh",
                    padding: "0 0",
                    overflow: "hidden",
                    display:"flex"
                  }}>
      <NavbarComponent />
      {isLoading && <LoadingModal />}
      <div className="side-margin"></div>

      <main className="child-column-center content-box move-down">
        <h2 className="title-32-bold title-center" style={{ marginTop: "80px", marginBottom: "0", textAlign: "center" }}>
          어떤 면접관과 연습 면접을 진행할까요?
        </h2>
        <p className="subtitle-16-semibold">한 명 이상의 면접관을 골라주세요.</p>
        <span className="body-14-medium" style={{ marginTop: "10px", marginBottom: "96px", textAlign: "center", color: "var(--primary-40)" }}>
          ({selectedIds.length}/2)
        </span>

        <div className="persona-list">
          {personas.map((item) => (
            <div
              className={`persona-box drop-shadow-small ${selectedIds.includes(item.id) ? "selected" : ""}`}
              key={item.id}
              onClick={() => handleSelect(item.id)}
            >
              <div className="persona-box-left">
                <img src="/logo-placeholder.png" alt="면접관 이미지" className="persona-img" />
              </div>
              <div className="persona-box-right">
                <div className="subtitle-18-bold persona-name">
                  {item.name} <span className="persona-role">{item.role}</span>
                </div>
                <div className="body-14-regular persona-desc">{item.description}</div>
                <div className="caption-14-regular persona-questions">
                  <span style={{ display: "none" }}>{item.questions}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="form-group center-horizontal">
          <button className="start-button small-button" onClick={handleStartInterview}>
            면접 시작하기
          </button>
        </div>
      </main>
      <div className="side-margin"></div>
    </Container>
  );
};

export default PersonaSelection;
