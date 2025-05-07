import React from "react"
import "./ReportDelivery.css"
import {
  BarChart, Bar, XAxis, YAxis, Tooltip as BarTooltip, ResponsiveContainer,
  CartesianGrid
} from "recharts"

const ReportDelivery = () => {
  const date = "2025.04.01"
  const intervieweeName = "김준수"
  const interviewTime = "소요시간 40분"
  const score = 80

  const data = {
    pronunciation: [
      { name: "사용자", 발음: 58 },
      { name: "지원자 평균", 발음: 43 },
    ],
    tone: [
      { name: "사용자", 톤: 60 },
      { name: "지원자 평균", 톤: 43 },
    ],
    speed: [
      { name: "사용자", 속도: 43 },
      { name: "지원자 평균", 속도: 43 },
    ],
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
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={data.pronunciation}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} tick={{ stepSize: 20 }} />
                <BarTooltip />
                <Bar dataKey="발음" fill="var(--primary-color)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <span>발음</span>
          </div>

          <div className="chartItem">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={data.tone}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} tick={{ stepSize: 20 }} />
                <BarTooltip />
                <Bar dataKey="톤" fill="var(--primary-color)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <span>톤</span>
          </div>

          <div className="chartItem">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={data.speed}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} tick={{ stepSize: 20 }} />
                <BarTooltip />
                <Bar dataKey="속도" fill="var(--primary-color)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
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
