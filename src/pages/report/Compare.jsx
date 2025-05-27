import React from 'react';
import './Compare.css';
import { compareData } from '../../types/props';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';

const Compare = () => {
  const {
    previousScore,
    currentScore,
    summary,
    radarData,
    nonverbalComparison,
    deliveryComparison,
    previousSummary,
    currentSummary
  } = compareData;

  return (
    <div className="compare-container">
      <p className="caption-14-regular timestamp">○○대학교 모의면접 결과 (2025-03-15 21:25:41)</p>
      <p className="caption-14-regular download-link">PDF로 다운 받기</p>

      <h2 className="title-24-bold">직전 면접보다 높은 점수를 받았어요</h2>

      <div className="score-section drop-shadow-medium">
        <div className="bar-section">
          <p className="body-14-regular">지난 면접 종합 점수</p>
          <div className="score-bar previous"><div style={{ width: `${previousScore / 10}%` }} /></div>
          <span className="score-label">{previousScore}/1000</span>

          <p className="body-14-regular">이번 면접 종합 점수</p>
          <div className="score-bar current"><div style={{ width: `${currentScore / 10}%` }} /></div>
          <span className="score-label">{currentScore}/1000</span>

          <p className="body-14-regular description">{summary}</p>
        </div>

        <ResponsiveContainer width={350} height={250}>
          <RadarChart data={radarData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="category" />
            <PolarRadiusAxis angle={30} domain={[0, 100]} />
            <Radar name="이전 면접" dataKey="previous" stroke="#FF82A1" fill="#FF82A1" fillOpacity={0.5} />
            <Radar name="이번 면접" dataKey="current" stroke="#4285F4" fill="#4285F4" fillOpacity={0.5} />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="compare-charts">
        <div className="chart-box">
          <h3 className="subtitle-18-bold">비언어적 커뮤니케이션 비교 결과</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={nonverbalComparison}>
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="previous" fill="#FF82A1" radius={[8, 8, 0, 0]} />
              <Bar dataKey="current" fill="#4285F4" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-box">
          <h3 className="subtitle-18-bold">전달력 비교 결과</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={deliveryComparison}>
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="previous" fill="#FF82A1" radius={[8, 8, 0, 0]} />
              <Bar dataKey="current" fill="#4285F4" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="compare-summary">
        <div className="summary-box">
          <h4 className="subtitle-18-bold pink">지난 면접 결과 총평</h4>
          <p className="body-14-regular">{previousSummary}</p>
        </div>

        <div className="summary-box">
          <h4 className="subtitle-18-bold primary">이번 면접 결과 총평</h4>
          <p className="body-14-regular">{currentSummary}</p>
        </div>
      </div>
    </div>
  );
};

export default Compare;
