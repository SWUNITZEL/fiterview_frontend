import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./InterviewTypeSelection.css";

const InterviewTypeSelection = () => {
  const [selectedType, setSelectedType] = useState("document"); // 기본값: 서류 기반 면접
  const navigate = useNavigate();

  return (
    <div className="interview-type-container">
      <header className="header">
        <h1 className="logo" onClick={() => navigate("/home")}>Fiterview</h1>
      </header>

      <div className="content">
        {/* 왼쪽 버튼 영역 */}
        <div className="type-buttons">
          <button 
            className={selectedType === "document" ? "selected" : ""}
            onClick={() => setSelectedType("document")}
          >
            📄 서류 기반 면접
          </button>
          <button 
            className={selectedType === "passage" ? "selected" : ""}
            onClick={() => setSelectedType("passage")}
          >
            📜 제시문 기반 면접
          </button>
        </div>

        {/* 오른쪽 설명 영역 */}
        <div className="description">
          {selectedType === "document" ? (
            <>
              <p>📄 서류기반 면접은 생기부를 바탕으로 면접을 진행합니다.</p>
              <p>전공 관련 질문과 인성 질문 등을 균형 있게 준비할 수 있어요.</p>
              <button onClick={() => navigate("/persona-selection")}>서류기반 면접 보러가기</button>
            </>
          ) : (
            <>
              <p>📜 제시문 기반 면접은 다음 페이지에 제공되는 제시문을 읽고 면접을 진행합니다.</p>
              <button onClick={() => navigate("/passage-reading")}>제시문 기반 면접 보러가기</button>
            </>
          )}
        </div>
      </div>

      {/* 하단 버튼 */}
      <div className="footer-buttons">
        <button className="save">임시 저장</button>
        <button className="exit">나가기</button>
      </div>
    </div>
  );
};

export default InterviewTypeSelection;
