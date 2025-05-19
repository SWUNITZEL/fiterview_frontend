import React from "react";
import { useNavigate } from "react-router-dom";
import "./ResultNotice.css";

const ResultNotice = () => {
  const navigate = useNavigate();

  const handleCheckResult = () => {
    navigate("/report-generating");
  };

  return (
    <div className="result-page-wrapper">
      <header className="logo-header">
        <div className="header-left">
          <img src="/logo-placeholder.png" alt="로고" className="logo-img" />
        </div>
        <div className="header-right">
          <span className="login-placeholder">AI 모의면접</span>
          <span className="login-placeholder">회원가입</span>
          <button className="outline-button">로그인</button>
        </div>
      </header>

      <main className="result-main">
        <h1 className="title-24-bold title-center">○○대학교 모의면접</h1>
        <p className="error-text caption-14-regular">
          <span className="emoji">❗</span> 나가기 버튼을 누르면 결과 보고서가 생성되지 않아요.
        </p>
        <div className="button-group">
          <button className="outline-button">나가기</button>
          <button className="filled-button" onClick={handleCheckResult}>결과 확인하기</button>
        </div>
      </main>
    </div>
  );
};

export default ResultNotice;