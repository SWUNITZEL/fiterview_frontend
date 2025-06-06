import { Container } from '@mui/material';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Cell, ReferenceLine, LabelList,
  ResponsiveContainer, ScatterChart, Scatter, ZAxis
} from 'recharts';

import { useNavigateWithScrollTop } from '../../hooks/useNavigateWithScrollTop';
import { PATH } from '../../data/paths';
import { usePdfDownload } from '../../hooks/usePdfDownload';

import NavbarComponent from '../../components/Navbar';
import Footer from '../../components/Footer';
import ReportHeader from '../../components/ReportHeader';
import FeedbackSummaryBox from '../../components/FeedbackSummaryBox';
import ButtonPair from '../../components/buttonPair';

import './Report.css';

const ReportNonverbal = () => {
  const navigateAndScrollTop = useNavigateWithScrollTop();
  const { pageRef, handleDownload } = usePdfDownload('nonverbal_report.pdf');

  const movementData = [
    { name: '왼쪽 어깨 움직임', value: 30 },
    { name: '오른쪽 어깨 움직임', value: 45 },
    { name: '고개 움직임', value: 25 },
  ];

  const gazeData = new Array(50).fill(null).map((_, i) => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    z: 100,
  }));

  const nonverbalData = {
    totalScore: 58,
    posture: {
      score: 66,
      average: 56,
      detail: '전체적으로 자세를 유지하며 안정적인 인상을 주었습니다.',
    },
    blink: {
      score: 68,
      average: 43,
      detail: '눈 깜빡임이 잦습니다. 면접 전 이완 운동을 통해 긴장을 해소해보아요.',
    },
    gaze: {
      score: 58,
      average: 64,
      detail: '시선 분포의 흩어짐 정도를 줄이는 연습이 필요합니다.\n화면의 중앙을 응시하도록 하세요.',
    },
  };

  return (
    <Container
      ref={pageRef}
      maxWidth={false}
      style={{
        backgroundColor: 'var(--background-color)',
        minHeight: '100vh',
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <NavbarComponent />
      <ReportHeader
        interviewTitle="○○대학교 모의면접 결과"
        reportTitle="비언어적 커뮤니케이션 분석 결과"
        timestamp="2025-03-15 21:25:41"
        onDownload={handleDownload}
      />
      <div className="report-container">
        <h3 className="total-score">
          총점 <span>{nonverbalData.totalScore}점</span>
        </h3>

        <div className="summary-section">
          <FeedbackSummaryBox
            title="자세"
            category="posture"
            myScore={nonverbalData.posture.score}
            average={nonverbalData.posture.average}
          />
          <FeedbackSummaryBox
            title="긴장도"
            category="blink"
            myScore={nonverbalData.blink.score}
            average={nonverbalData.blink.average}
          />
          <FeedbackSummaryBox
            title="시선처리"
            category="gaze"
            myScore={nonverbalData.gaze.score}
            average={nonverbalData.gaze.average}
          />
        </div>

        <h3 className="detail-title">세부 분석 결과</h3>
        <div className="detail-section">
          <div className="detail-row" style={{ justifyContent: 'flex-start' }}>
            <div className="detail-box drop-shadow-large full-width" style={{padding:"32px 40px"}}>
              <div className="detail-left" style={{ paddingRight: '64px' }}>
                <h4 style={{fontSize:"20px",  marginTop:"0px",  marginBottom:"40px"}}>자세 세부 분석 결과</h4>
                <p>{nonverbalData.posture.detail}</p>
              </div>
              <div
                className="detail-right"
                style={{ marginLeft: '60px', display: 'flex', justifyContent: 'center' }}
              >
                <ResponsiveContainer width={400} height={200}>
                  <BarChart data={movementData} barCategoryGap={40} barSize={60}>
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12 }}
                      interval={0}
                    />
                    <YAxis hide domain={[0, 50]} />
                    <Tooltip cursor={{ fill: 'transparent' }}/>
                    <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                      {movementData.map((entry, index) => {
                        const value = entry.value;
                        let fillColor = 'var(--success-40)'; // 초록
                        if (value >= 40) fillColor = 'var(--warning-40)'; // 노랑

                        return <Cell key={`cell-${index}`} fill={fillColor} />;
                      })}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="detail-row" style={{ justifyContent: 'flex-start'}}>
            <div className="detail-box drop-shadow-large full-width" style={{padding:"32px 40px"}}>
              <div className="detail-left" style={{ paddingRight: '64px'}}>
                <h4 style={{fontSize:"20px",  marginTop:"0px", marginBottom:"40px"}}>시선 세부 분석 결과</h4>
                <p style={{ whiteSpace: 'pre-wrap' }}>{nonverbalData.gaze.detail}</p>
              </div>
              <div className="detail-right" style={{ marginLeft: '60px', display: 'flex', justifyContent: 'center' }}>
                <ResponsiveContainer width={400} height={200}>
                  <ScatterChart>
                    <XAxis
                      type="number"
                      dataKey="x"
                      domain={[0, 100]}
                      axisLine={false}
                      tickLine={false}
                      tick={false}
                      height={0}
                    />
                    <YAxis
                      type="number"
                      dataKey="y"
                      domain={[0, 100]}
                      axisLine={false}
                      tickLine={false}
                      tick={false}
                      width={0}
                    />
                    <ReferenceLine 
                      x={50} 
                      stroke="var(--nuetral-50)" 
                      strokeWidth={1}
                      label={{
                        position: 'insideTopRight',
                        value: '상단 응시', 
                        fill: 'var(--nuetral-50)', 
                        fontSize: 14
                      }}
                    />
                    <ReferenceLine 
                      x={50} 
                      stroke="var(--nuetral-50)" 
                      strokeWidth={0} // 선 안 겹치게 표시 안함
                      label={{
                        position: 'insideBottomLeft', 
                        value: '하단 응시', 
                        fill: 'var(--nuetral-50)', 
                        fontSize: 14
                      }}
                    />
                    <ReferenceLine 
                      y={50} 
                      stroke="var(--nuetral-50)" 
                      strokeWidth={1}
                      label={{
                        position: 'insideBottomRight', 
                        value: '우측 응시', 
                        fill: 'var(--nuetral-50)', 
                        fontSize: 14
                      }}
                    />
                    <ReferenceLine 
                      y={50} 
                      stroke="var(--nuetral-50)" 
                      strokeWidth={0}
                      label={{
                        position: 'insideTopLeft',
                        value: '좌측 응시', 
                        fill: 'var(--nuetral-50)', 
                        fontSize: 14
                      }}
                    />

                    <ZAxis 
                      type="number" 
                      dataKey="z" 
                      range={[60]} 
                      tick={false}
                    />
                    <Scatter name="Gaze" data={gazeData} fill="var(--primary-60)" />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="detail-row">
            <div className="detail-box drop-shadow-large full-width" style={{padding:"32px 40px"}}>
              <div className="detail-left">
                <h4 style={{fontSize:"20px",  marginTop:"0px",  marginBottom:"40px"}}>표정 세부 분석 결과</h4>
                <p>{nonverbalData.blink.detail}</p>
              </div>
            </div>
          </div>
        </div>

        <ButtonPair
          leftText=""
          rightText="전달력 분석 결과 보러가기"
          onLeftClick={undefined}
          onRightClick={() => navigateAndScrollTop(PATH.REPORT_DELIVERY)}
        />
      </div>
      <Footer />
    </Container>
  );
};

export default ReportNonverbal;
