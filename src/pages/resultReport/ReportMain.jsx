import React from "react"
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from "recharts"

import "./ReportMain.css"
import NavbarComponent from '../../components/Navbar'

const ReportMain = () => {
  const data = {
    university: "서울여자대학교",
    department: "소프트웨어융합학과",
  }

  const chartData = [
    { subject: "전공적합성", A: 80 },
    { subject: "침착성", A: 70 },
    { subject: "태도", A: 75 },
    { subject: "전달력", A: 65 },
    { subject: "집중도", A: 85 },
  ]

  return (
    <div className="report-container">
      <NavbarComponent 
        bgColor="transparent"
        textColor="var(--text-color)"
        isBoxShadow="none"
      />
      <div className="report-content child-column-center">
        <div className="report-info">
          <h2 className="university-info">{data.university} {data.department}</h2>
          <h3 className="interview-info">모의면접 결과</h3>
        </div>
        <div className="report-card child-row-center">
          <div className="report-data">
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                  <PolarGrid stroke="var(--system-gray)" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--text-color)' }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tickCount={6} tick={{ fill: 'var(--text-color)' }} />
                  <Radar 
                    name="면접 결과" 
                    dataKey="A" 
                    stroke="var(--primary-hover)" 
                    fill="var(--primary-hover)" 
                    fillOpacity={0.2} 
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="navigation-buttons">
              <button className="nav-button neumorphic-box">비언어적 커뮤니케이션 분석 결과</button>
              <button className="nav-button neumorphic-box">전달력 분석 결과</button>
              <button className="nav-button neumorphic-box">답변 구성 분석 결과</button>
              <button className="nav-button neumorphic-box">비교 분석 결과</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReportMain