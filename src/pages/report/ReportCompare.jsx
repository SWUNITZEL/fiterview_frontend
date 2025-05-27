import './Report.css';
import NavbarComponent from '../../components/Navbar'
import { Container } from '@mui/material';
import ReportHeader from '../../components/ReportHeader';
import ButtonPair from '../../components/buttonPair';
import { usePdfDownload } from '../../hooks/usePdfDownload';
import { PATH } from "../../data/paths";
import { useNavigate } from 'react-router-dom';


import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';

const ReportCompare = () => {
  const navigate = useNavigate();
  const { pageRef, handleDownload } = usePdfDownload('answer_report.pdf');

  const compareData = {
  previousScore: 720,
  currentScore: 860,
  summary: "이번 면접에서는 전달력과 비언어적 표현 모두 개선되어 높은 점수를 받았습니다.",
  radarData: [
    { category: "전달력", previous: 70, current: 85 },
    { category: "논리성", previous: 68, current: 82 },
    { category: "자신감", previous: 72, current: 88 },
    { category: "비언어적 표현", previous: 65, current: 80 },
    { category: "명확성", previous: 75, current: 90 },
  ],
  nonverbalComparison: [
    { name: "시선 처리", previous: 60, current: 80 },
    { name: "제스처", previous: 55, current: 78 },
    { name: "표정", previous: 70, current: 85 },
  ],
  deliveryComparison: [
    { name: "발음", previous: 75, current: 88 },
    { name: "속도", previous: 68, current: 82 },
    { name: "강조", previous: 72, current: 85 },
  ],
  previousSummary: "지난 면접에서는 비언어적 표현에서 다소 부족했으며, 전달력이 일정하지 않았습니다.",
  currentSummary: "이번 면접에서는 개선된 비언어적 표현과 안정적인 전달력 덕분에 좋은 평가를 받았습니다.",
};

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
    <Container ref={pageRef} maxWidth={false} style={{
            backgroundColor: "var(--background-color)",
            minHeight: "100vh",
            padding: "0",
            overflow: "hidden",
            display: "flex",
            flexDirection:"column"
        }}>
      <NavbarComponent />
      <ReportHeader 
        interviewTitle = "○○대학교 모의면접 결과" 
        reportTitle = "비교 분석 결과"
        timestamp="2025-03-15 21:25:41" 
        onDownload={handleDownload}
        />
      <div className="report-container">
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
        <ButtonPair 
        leftText="답변 구성 분석 결과 보러가기"
        onLeftClick={()=>{
          navigate(PATH.REPORT_ANSWER)
          window.scrollTo(0,0)
        }}
        />
      </div>
    </Container>
  );
};

export default ReportCompare;
