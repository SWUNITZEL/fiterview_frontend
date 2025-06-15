import { useEffect, useState } from "react";
import "./ReportGenerating.css";

const ReportGenerating = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + 1));
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="result-page-wrapper">
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