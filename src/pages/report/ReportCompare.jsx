import { Container } from '@mui/material';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, LabelList
} from 'recharts';

import { useNavigateWithScrollTop } from '../../hooks/useNavigateWithScrollTop';
import { PATH } from '../../data/paths';
import { usePdfDownload } from '../../hooks/usePdfDownload';

import NavbarComponent from '../../components/Navbar';
import ReportHeader from '../../components/ReportHeader';
import ButtonPair from '../../components/buttonPair';
import Footer from '../../components/Footer';

import './Report.css';

const ReportCompare = () => {
  const navigateAndScrollTop = useNavigateWithScrollTop();
  const { pageRef, handleDownload } = usePdfDownload('answer_report.pdf');

  const compareData = {
    previousScore: 630,
    currentScore: 840,
    summary: "지난 면접보다 인성 및 태도가 낮게 나왔어요. 그러나, 개선의 여지가 분명히 보이며 꾸준히 개선하면 더 좋은 결과를 기대할 수 있습니다.",
    radarData: [
      { category: "커뮤니케이션 능력", previous: 60, current: 85 },
      { category: "집중도", previous: 68, current: 82 },
      { category: "인성 및 태도", previous: 72, current: 88 },
      { category: "문제해결력", previous: 65, current: 80 },
      { category: "전문성", previous: 75, current: 90 },
    ]
  };

  const {
    previousScore,
    currentScore,
    summary,
    radarData
  } = compareData;

  return (
    <Container ref={pageRef} maxWidth={false} style={{
      backgroundColor: "var(--background-color)",
      minHeight: "100vh",
      padding: "0",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column"
    }}>
      <NavbarComponent />
      <ReportHeader
        interviewTitle="○○대학교 모의면접 결과"
        reportTitle="비교 분석 결과"
        timestamp="2025-03-15 21:25:41"
        onDownload={handleDownload}
      />

      <div className="report-container" style={{display:"flex", flexDirection:"column", gap:"24px"}}>
        <div className="detail-box drop-shadow-large" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '32px 28px' }}>
          <div style={{ flex: 1, marginRight: '32px' }}>
            <h2 className="title-24-bold" style={{ marginBottom: '24px' }}>직전 면접보다 높은 점수를 받았어요</h2>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
              <span className="body-14-regular" style={{ width: 140 }}>지난 면접 종합 점수</span>
              <div style={{ flex: 1, height: 12, backgroundColor: '#FFD3DD', borderRadius: 6, marginRight: 12 }}>
                <div style={{ width: `${previousScore / 10}%`, backgroundColor: '#FF82A1', height: '100%', borderRadius: 6 }} />
              </div>
              <span className="score-label">{previousScore}/1000</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
              <span className="body-14-regular" style={{ width: 140 }}>이번 면접 종합 점수</span>
              <div style={{ flex: 1, height: 12, backgroundColor: '#BDD7FF', borderRadius: 6, marginRight: 12 }}>
                <div style={{ width: `${currentScore / 10}%`, backgroundColor: '#4285F4', height: '100%', borderRadius: 6 }} />
              </div>
              <span className="score-label">{currentScore}/1000</span>
            </div>
            <div style={{ background: '#F5F5F5', padding: '20px', borderRadius: '12px' }}>
              <p className="body-14-bold" style={{ marginBottom: '12px' }}>
                지난 면접보다 <span style={{ color: '#3366cc', fontWeight: 600 }}>인성 및 태도</span>가 낮게 나왔어요.
              </p>
              <p className="body-14-regular">
                그러나, 겨울이 지나고 나의 열에도 봄이 오면, 무덤 위에 파란 잔디가 피어나듯이
                내 이름자 묻힌 언덕 위에도 자황처럼 풀이 무성할 거예요.
              </p>
            </div>
          </div>

          <div style={{ width: 320, display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 60, position: 'relative' }}>
            <ResponsiveContainer width={280} height={220}>
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="category" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar name="지난 면접" dataKey="previous" stroke="#FF82A1" fill="#FF82A1" fillOpacity={0.5} />
                <Radar name="이번 면접" dataKey="current" stroke="#4285F4" fill="#4285F4" fillOpacity={0.5} />
              </RadarChart>
            </ResponsiveContainer>
            <div style={{ position: 'absolute', bottom: -12, left: 0, textAlign: 'left', fontSize: 12 }}>
              <div style={{ color: '#FF82A1', marginBottom: 4 }}>● 지난 면접</div>
              <div style={{ color: '#4285F4' }}>● 이번 면접</div>
            </div>
          </div>
        </div>

        <div className="compare-charts">
          <div className="chart-box drop-shadow-large">
            <h3 className="subtitle-18-bold" style={{fontSize:"20px",  marginTop:"0px",  marginBottom:"40px"}}>비언어적 커뮤니케이션 비교 결과</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={[{ name: "표정", previous: 43, current: 58 }, { name: "자세", previous: 43, current: 58 }, { name: "제스처", previous: 43, current: 58 }]} barCategoryGap={32}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis hide domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="previous" fill="#FF82A1" radius={[8, 8, 0, 0]}>
                  <LabelList dataKey="previous" position="top" style={{ fontSize: 12 }} />
                </Bar>
                <Bar dataKey="current" fill="#4285F4" radius={[8, 8, 0, 0]}>
                  <LabelList dataKey="current" position="top" style={{ fontSize: 12 }} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <p className="body-12-regular" style={{ marginTop: '8px' }}>지난 면접보다 평균 점수가 높았어요. 작은 변화는 면접관에게 매력을 줄 수 있으므로 큰 준비보단 작은 습관을 개선해 보세요.</p>
          </div>

          <div className="chart-box drop-shadow-large">
            <h3 className="subtitle-18-bold" style={{fontSize:"20px",  marginTop:"0px",  marginBottom:"40px"}}>전달력 비교 결과</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={[{ name: "발음", previous: 43, current: 58 }, { name: "톤", previous: 43, current: 58 }, { name: "속도", previous: 43, current: 58 }]} barCategoryGap={32}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis hide domain={[0, 100]} />
                <Tooltip cursor={{ fill: 'transparent' }}/>
                <Bar dataKey="previous" fill="#FF82A1" radius={[8, 8, 0, 0]}>
                  <LabelList dataKey="previous" position="top" style={{ fontSize: 12 }} />
                </Bar>
                <Bar dataKey="current" fill="#4285F4" radius={[8, 8, 0, 0]}>
                  <LabelList dataKey="current" position="top" style={{ fontSize: 12 }} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <p className="body-12-regular" style={{ marginTop: '8px' }}>화면에 나오는 톤의 비율 수가 줄었어요. 지난 면접보다 더 많이 어필했어요.</p>
          </div>
        </div>

        <div className="compare-summary">
          <div className="summary-box drop-shadow-large">
            <h4 className="subtitle-18-bold pink" style={{fontSize:"20px",  marginTop:"0px",  marginBottom:"40px"}}>지난 면접 결과 총평</h4>
            <p className="body-14-regular">목소리 톤이 360.7Hz으로 평균인 260.3Hz보다 높습니다. 높은 목소리는 안정감과 신뢰감을 주기 어려우므로 톤을 낮추는 연습이 필요합니다.</p>
          </div>

          <div className="summary-box drop-shadow-large">
            <h4 className="subtitle-18-bold primary" style={{fontSize:"20px",  marginTop:"0px",  marginBottom:"40px"}}>이번 면접 결과 총평</h4>
            <p className="body-14-regular">문장 앞에 "어떤, 그다음" 어휘를 반복적으로 사용했어요. 습관적인 어휘 사용을 줄이기 위해 다음 문장을 말하기 전에 한 템포 쉬고 얘기해보세요.</p>
          </div>
        </div>

        <ButtonPair
          leftText="답변 구성 분석 결과 보러가기"
          onLeftClick={() => navigateAndScrollTop(PATH.REPORT_ANSWER)}
          rightText="메인으로"
          onRightClick={() => navigateAndScrollTop(PATH.HOME)}
        />
      </div>
      <Footer />
    </Container>
  );
};

export default ReportCompare;
