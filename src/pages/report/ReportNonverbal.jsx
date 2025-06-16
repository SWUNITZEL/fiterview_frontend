import { Container } from '@mui/material';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Cell, ReferenceLine, LabelList,
  ResponsiveContainer, ScatterChart, Scatter, ZAxis
} from 'recharts';

import { useNavigateWithScrollTop } from '../../hooks/useNavigateWithScrollTop';
import { PATH } from '../../data/paths';
import { usePdfDownload } from '../../hooks/usePdfDownload';
import useInterviewId from '../../hooks/useInterviewId';
import useReportNonverbal from '../../hooks/useReportNonverbal';

import NavbarComponent from '../../components/Navbar';
import Footer from '../../components/Footer';
import ReportHeader from '../../components/ReportHeader';
import FeedbackSummaryBox from '../../components/FeedbackSummaryBox';
import ButtonPair from '../../components/buttonPair';

import './Report.css';

const ReportNonverbal = () => {
  const navigateAndScrollTop = useNavigateWithScrollTop();
  const { pageRef, handleDownload } = usePdfDownload('nonverbal_report.pdf');
  const interviewId = useInterviewId();

  const { nonverbalData, loading, error } = useReportNonverbal(interviewId);
  const gazeData = Array.isArray(nonverbalData.gazePointList)
  ? nonverbalData.gazePointList.flat().map(([x, y]) => ({ x, y }))
  : [];

  const movementData = Array.isArray(nonverbalData.gazePointList)?[
    {name:"어깨 움직임", value:nonverbalData.avgShoulderTiltCount},
    {name:"왼쪽으로 고개 돌림", value:nonverbalData.avgTurnLeftCount},
    {name:"오른쪽으로 고개 돌림", value:nonverbalData.avgTurnRightCount}
  ]:[];
  
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
        interviewTitle={`${nonverbalData.university} 모의면접 결과`}
        reportTitle="비언어적 커뮤니케이션 분석 결과"
        timestamp={`${nonverbalData.createdAt} 모의면접 결과`}
        onDownload={handleDownload}
      />
      {nonverbalData&&(<div className="report-container">
        <h3 className="total-score">
          총점 <span>{nonverbalData.totalScore.avgFacialScore}점</span>
        </h3>

        <div className="summary-section">
          <FeedbackSummaryBox
            title="자세"
            category="posture"
            myScore={nonverbalData.totalScore.avgFacialScore}
            average={nonverbalData.totalScore.avgFacialScore}
          />
          <FeedbackSummaryBox
            title="긴장도"
            category="blink"
            myScore={nonverbalData.totalScore.avgGazeScore}
            average={nonverbalData.totalScore.avgGazeScore}
          />
          <FeedbackSummaryBox
            title="시선처리"
            category="gaze"
            myScore={nonverbalData.totalScore.avgPostureScore}
            average={nonverbalData.totalScore.avgPostureScore}
          />
        </div>

        <h3 className="detail-title">세부 분석 결과</h3>
        <div className="detail-section">
          <div className="detail-row" style={{ justifyContent: 'flex-start' }}>
            <div className="detail-box drop-shadow-large full-width" style={{padding:"32px 40px"}}>
              <div className="detail-left" style={{ paddingRight: '64px' }}>
                <h4 style={{fontSize:"20px",  marginTop:"0px",  marginBottom:"40px"}}>자세 세부 분석 결과</h4>
                <p>아무거나</p>
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
                <p style={{ whiteSpace: 'pre-wrap' }}>아무거나</p>
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
                <p>아무거나</p>
              </div>
            </div>
          </div>
        </div>

        <ButtonPair
          leftText=""
          rightText="전달력 분석 결과 보러가기"
          onLeftClick={undefined}
          onRightClick={() => navigateAndScrollTop(`${PATH.REPORT_DELIVERY}?interviewId=${interviewId}`)}
        />
      </div>)}
      <Footer />
    </Container>
  );
};

export default ReportNonverbal;
