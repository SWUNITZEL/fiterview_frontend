import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ReportGenerating.css";

const ReportGenerating = () => {
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/interview-summary");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + 1));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="result-page-wrapper">
      <header className="logo-header">
        <img src="/logo-placeholder.png" alt="로고" className="logo-img" />
        <div className="header-right">
          <span className="login-placeholder">AI 모의면접</span>
          <span className="login-placeholder">회원가입</span>
          <button className="outline-button">로그인</button>
        </div>
      </header>

      <main className="child-column-center report-main">
        <h1 className="title-24-bold title-center">결과 보고서를 제작하고 있어요!</h1>
        <p className="caption-14-regular progress-text">조금만 기다려 주세요</p>

        <div className="progress-bar-container">
          <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
        </div>
      </main>
    </div>
  );
};

export default ReportGenerating;