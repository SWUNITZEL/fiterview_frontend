import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Container } from '@mui/material';
import "./PersonaSelection.css";
import { personas } from "../../data/personas";
import NavbarComponent from '../../components/Navbar';

const PersonaSelection = () => {
  const [selectedIds, setSelectedIds] = useState([]);
  const location = useLocation(); // ✅ 이전 페이지 state 받기

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

  const handleStartInterview = () => {
    const prevState = location.state;

    const updatedState = {
      ...prevState,
      persona: selectedIds,
    };

    console.log("업데이트된 state:");
    console.log(updatedState);

    // 필요 시 여기서 navigate로 다음 페이지로 이동
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
      <div className="side-margin"></div>

      <main className="child-column-center content-box move-down">
        <h2 className="title-32-bold title-center" style={{ marginTop: "80px", marginBottom: "0", textAlign: "center" }}>
          어떤 면접관과 연습 면접을 진행할까요?
        </h2>
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
