import React from "react"
import "./ReportDelivery.css"
import { Bar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const ReportDelivery = () => {
  const date = "2025.04.01"
  const intervieweeName = "김준수"
  const interviewTime = "소요시간 40분"
  const score = "80"

  const barData = (label, user, avg) => ({
    labels: ["사용자", "지원자 평균"],
    datasets: [
      {
        label,
        data: [user, avg],
        backgroundColor: ["var(--primary-color)", "var(--system-gray3)"],
        borderRadius: 4,
      },
    ],
  })

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: { stepSize: 20 },
      },
    },
  }

  return (
    <div className="reportDeliveryHeader">
  <div className="reportDeliveryHeaderContent">
    <div className="reportDeliveryHeaderText">
      <span>전달력 분석 결과</span>
      <span>{date} | {intervieweeName} | {interviewTime}</span>
    </div>
    <div className="reportDeliveryHeaderButtons">
      <button className="homeBtn"><span>홈화면</span></button>
      <button className="downloadBtn"><span>pdf 다운로드</span></button>
    </div>
  </div>


      <div className="reportDeliveryScoreBox">
        <span>전달력 분석 총점 : <b><span>{score}점</span></b></span>
        <div className="reportDeliveryCharts">
          <div className="chartItem">
            <Bar data={barData("발음", 58, 43)} options={barOptions} />
            <span>발음</span>
          </div>
          <div className="chartItem">
            <Bar data={barData("톤", 60, 43)} options={barOptions} />
            <span>톤</span>
          </div>
          <div className="chartItem">
            <Bar data={barData("속도", 43, 43)} options={barOptions} />
            <span>속도</span>
          </div>
        </div>
        <ul className="reportDeliveryDescriptions">
          <li><span className="dot blue" /> <span>또박또박 말한 전달력이에요.</span></li>
          <li><span className="dot red" /> <span>감정이 담긴 전달력이에요.</span></li>
          <li><span className="dot blue" /> <span>평균보다 조금 더 빠르게 말했어요.</span></li>
        </ul>
      </div>

      <div className="reportDeliveryDetails">
        <div className="detailCard">
          <span>발음 세부분석 결과</span>
          <div className="iconPlaceholder" />
          <p><span>'의' 발음의 연습이 필요합니다.</span></p>
          <p><span>의지, 의무, 결의와 같은 발음을 연습해보세요.</span></p>
        </div>
        <div className="detailCard">
          <span>톤 세부분석 결과</span>
          <div className="wavePlaceholder" />
          <p><span>목소리 톤이 360.7Hz으로 평균보다 260.3Hz 높게 분석되었어요.</span></p>
          <p><span>높은 목소리는 안정감과 신뢰감을 주기 어려움으로 톤을 낮추는 연습이 필요해요.</span></p>
        </div>
        <div className="detailCard">
          <span>속도 세부분석 결과</span>
          <div className="graphPlaceholder" />
          <p><span>말하는 속도가 다른 사용자보다 빠른 편입니다.</span></p>
          <p><span>지원자가 말하는 것이 잘 전달되지 않을 수 있기 때문에 속도를 늦추는 연습이 필요합니다.</span></p>
        </div>
        <div className="detailCard">
          <span>추가 세부분석 결과</span>
          <p><span>준수님이 가장 많이 사용하신 단어는 다음과 같습니다.</span></p>
          <p><span>어, 음과 같은 간투사 빈도를 줄이는 연습이 필요합니다.</span></p>
          <div className="tagButtons">
            <button><span>다만 6회</span></button>
            <button><span>어 5회</span></button>
            <button><span>적용 3회</span></button>
          </div>
        </div>
      </div>

      <div className="reportDeliveryFooter">
        <button><span>이전 전달력보고서 보기</span></button>
        <button><span>다음 전달력보고서 보기</span></button>
      </div>
    </div>
  )
}

export default ReportDelivery
