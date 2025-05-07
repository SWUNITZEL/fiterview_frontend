import React from "react"
import "./ReportNonverbal.css"
import {
  BarChart, Bar, XAxis, YAxis, Tooltip as BarTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
  ScatterChart, Scatter, CartesianGrid,
  LineChart, Line
} from "recharts"

const ReportNonverbal = () => {
  const date = "2025.04.01"
  const intervieweeName = "김준수"
  const interviewTime = "모의면접 40분"
  const score = 83

  const barData = {
    gesture: [
      { name: "사용자", 자세: 58 },
      { name: "평균", 자세: 43 },
    ],
    motion: [
      { name: "사용자", 제스처: 70 },
      { name: "평균", 제스처: 43 },
    ],
    facial: [
      { name: "사용자", 표정: 60 },
      { name: "평균", 표정: 43 },
    ],
  }

  const pieData = [
    { name: "정상 자세", value: 69.5 },
    { name: "흐트러진 자세", value: 30.5 },
  ]

  const COLORS = ["var(--system-green)", "var(--system-gray3)"]

  const scatterData = Array.from({ length: 10 }, () => ({
    x: Math.random() * 10,
    y: Math.random() * 10,
  }))

  const lineData = Array.from({ length: 10 }, (_, i) => ({
    name: i + 1,
    움직임: Math.random() * 10,
  }))

  return (
    <div className="reportNonverbalWrapper">
      <div className="reportNonverbalHeader">
        <div>
          <span>비언어적 커뮤니케이션 분석 결과</span>
          <div className="reportNonverbalSubInfo">
            <span>{date} | </span>
            <span>{intervieweeName} | </span>
            <span>{interviewTime}</span>
          </div>
        </div>
        <div className="reportNonverbalButtons">
          <button><span>홈화면</span></button>
          <button className="downloadBtn"><span>pdf 다운로드</span></button>
        </div>
      </div>

      <div className="reportNonverbalScoreBox">
        <span>비언어적 커뮤니케이션 분석 총점 : <b>{score}점</b></span>
        <div className="reportNonverbalBarCharts">
          <div className="chartBox">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={barData.gesture}>
                <XAxis dataKey="name" />
                <YAxis />
                <BarTooltip />
                <Bar dataKey="자세" fill="var(--primary-light)" />
              </BarChart>
            </ResponsiveContainer>
            <span>자세</span>
          </div>
          <div className="chartBox">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={barData.motion}>
                <XAxis dataKey="name" />
                <YAxis />
                <BarTooltip />
                <Bar dataKey="제스처" fill="var(--primary-light)" />
              </BarChart>
            </ResponsiveContainer>
            <span>제스처</span>
          </div>
          <div className="chartBox">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={barData.facial}>
                <XAxis dataKey="name" />
                <YAxis />
                <BarTooltip />
                <Bar dataKey="표정" fill="var(--primary-light)" />
              </BarChart>
            </ResponsiveContainer>
            <span>표정</span>
          </div>
        </div>
      </div>

      <div className="reportNonverbalDetailGrid">
        <div className="detailCard">
          <span>표정 세부분석 결과</span>
          <ResponsiveContainer width="100%" height={250}>
            <ScatterChart>
              <CartesianGrid />
              <XAxis type="number" dataKey="x" domain={[0, 10]} />
              <YAxis type="number" dataKey="y" domain={[0, 10]} />
              <BarTooltip />
              <Scatter data={scatterData} fill="var(--secondary-color)" />
            </ScatterChart>
          </ResponsiveContainer>
          <p><span>AI의 표정 인식 결과를 통해 화면의 중앙을 응시했는지 분석했어요.</span></p>
        </div>

        <div className="detailCard">
          <span>자세 세부분석 결과</span>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend verticalAlign="bottom" />
            </PieChart>
          </ResponsiveContainer>
          <p><span>자세 흐트러짐 비율은 다음과 같아요. </span></p>
          <p><span>의자에 수평을 맞추면서 앉은 구간에는 흐트러짐이 없었어요.</span></p>
        </div>

        <div className="detailCard longCard">
          <span>제스처 세부분석 결과</span>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <BarTooltip />
              <Line type="monotone" dataKey="움직임" stroke="var(--primary-color)" />
            </LineChart>
          </ResponsiveContainer>
          <p><span>활발하게 손을 움직였네요!</span></p>
          <p><span>전체 인터뷰 중 손 움직임이 있었던 횟수는 총 3회 이상이며, 이상적인 움직임입니다.</span></p>
        </div>
      </div>

      <div className="reportNonverbalFooter">
        <button><span>다음 리포트보고서 보기</span></button>
      </div>
    </div>
  )
}

export default ReportNonverbal