import React from "react"
import "./ReportNonverbal.css"
import { Bar, Pie, Scatter, Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from "chart.js"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

const ReportNonverbal = () => {
  const date = "2025.04.01"
  const intervieweeName = "김준수"
  const interviewTime = "모의면접 40분"
  const score = 83

  const barData = {
    gesture: {
      labels: ["사용자", "평균"],
      datasets: [
        {
          label: "자세",
          data: [58, 43],
          backgroundColor: ["var(--primary-light)", "var(--primary-hover)"],
        },
      ],
    },
    motion: {
      labels: ["사용자", "평균"],
      datasets: [
        {
          label: "제스처",
          data: [70, 43],
          backgroundColor: ["var(--primary-light)", "var(--primary-hover)"],
        },
      ],
    },
    facial: {
      labels: ["사용자", "평균"],
      datasets: [
        {
          label: "표정",
          data: [60, 43],
          backgroundColor: ["var(--primary-light)", "var(--primary-hover)"],
        },
      ],
    },
  }

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
  }

  const pieData = {
    labels: ["정상 자세", "흐트러진 자세"],
    datasets: [
      {
        data: [69.5, 30.5],
        backgroundColor: ["var(--system-green)", "var(--system-gray3)"],
      },
    ],
  }

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  }

  const scatterData = {
    datasets: [
      {
        label: "응시 위치",
        data: Array.from({ length: 10 }, () => ({
          x: Math.random() * 10,
          y: Math.random() * 10,
        })),
        backgroundColor: "var(--secondary-color)",
      },
    ],
  }

  const scatterOptions = {
    scales: {
      x: { min: 0, max: 10 },
      y: { min: 0, max: 10 },
    },
  }

  const lineData = {
    labels: Array.from({ length: 10 }, (_, i) => i + 1),
    datasets: [
      {
        label: "손 움직임",
        data: Array.from({ length: 10 }, () => Math.random() * 10),
        borderColor: "var(--primary-color)",
        fill: false,
      },
    ],
  }

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  }

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
            <Bar data={barData.gesture} options={barOptions} />
            <span>자세</span>
          </div>
          <div className="chartBox">
            <Bar data={barData.motion} options={barOptions} />
            <span>제스처</span>
          </div>
          <div className="chartBox">
            <Bar data={barData.facial} options={barOptions} />
            <span>표정</span>
          </div>
        </div>
      </div>

      <div className="reportNonverbalDetailGrid">
        <div className="detailCard">
          <span>표정 세부분석 결과</span>
          <Scatter data={scatterData} options={scatterOptions} className="chartWide" />
          <p><span>AI의 표정 인식 결과를 통해 화면의 중앙을 응시했는지 분석했어요.</span></p>
        </div>
        <div className="detailCard">
          <span>자세 세부분석 결과</span>
          <Pie data={pieData} options={pieOptions} className="chartWide" />
          <p><span>자세 흐트러짐 비율은 다음과 같아요. </span></p>
          <p><span>의자에 수평을 맞추면서 앉은 구간에는 흐트러짐이 없었어요.</span></p>
        </div>
        <div className="detailCard longCard">
          <span>제스처 세부분석 결과</span>
          <Line data={lineData} options={lineOptions} className="chartWide" />
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