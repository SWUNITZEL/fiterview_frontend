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
import ButtonPair from '../../components/buttonPair';

import './Report.css';

const ReportNonverbal = () => {
  const navigateAndScrollTop = useNavigateWithScrollTop();
  const { pageRef, handleDownload } = usePdfDownload('nonverbal_report.pdf');

  const movementData = [
    { name: '왼쪽 어깨 움직임 횟수', value: 30 },
    { name: '오른쪽 어깨 움직임 횟수', value: 45 },
    { name: '고개 움직임 횟수', value: 25 },
  ];

  const gazeData = new Array(50).fill(null).map((_, i) => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    z: 100,
  }));

  const getFeedback = (category, value) => {
    if (category === 'posture') {
      return value >= 60
        ? { label: '장점', comment: '자세를 안정적으로 유지했습니다.' }
        : { label: '개선점', comment: '자세가 불안정하여 개선이 필요합니다.' };
    }
    if (category === 'eye') {
      return value >= 60
        ? { label: '장점', comment: '시선이 적절하게 분산되어 자연스러웠습니다.' }
        : { label: '개선점', comment: '시선의 집중도가 낮아 개선이 필요합니다.' };
    }
    if (category === 'gesture') {
      return value >= 60
        ? { label: '장점', comment: '적절한 제스처로 전달력이 향상되었습니다.' }
        : { label: '개선점', comment: '제스처가 부족하거나 부자연스러웠습니다.' };
    }
  };

  const renderSummaryBox = (title, category, myScore, average) => {
    const feedback = getFeedback(category, myScore);
    const data = [
      { name: '응시자 평균', score: average },
      { name: '내 점수', score: myScore },
    ];

    return (
      <div className="summary-box drop-shadow-large">
        <h3>
          {title}{' '}
          <span style={{ color: myScore >= average ? 'var(--success-40)' : 'var(--warning-40)' }}>
            {myScore >= average ? '평균 이상' : '평균 이하'}
          </span>
        </h3>
        <div style={{ width: 200, margin: '0 auto' }}>
          <BarChart data={data} layout="horizontal" width={200} height={160} barSize={60}>
            <XAxis
              type="category"
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 13 }}
            />
            <YAxis
              type="number"
              domain={[0, Math.max(myScore, average) + 20]}
              width={0}
              axisLine={false}
              tick={false}
            />
            <Tooltip />
            <ReferenceLine y={average} stroke="#ccc" strokeDasharray="4 4" />
            <Bar dataKey="score" radius={[6, 6, 0, 0]}>
              <LabelList dataKey="score" position="top" />
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    entry.name === '응시자 평균'
                      ? '#D9D9D9'
                      : myScore >= average
                      ? 'var(--success-40)'
                      : 'var(--warning-40)'
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '36px' }}>
          <span
            style={{
              backgroundColor: myScore >= average ? 'var(--success-40)' : 'var(--warning-40)',
              whiteSpace: 'nowrap',
              color: 'white',
              height: 'fit-content',
              fontSize: '16px',
              padding: '2px 12px',
              borderRadius: '16px',
            }}
          >
            {feedback.label}
          </span>
          <p
            style={{
              marginTop: '0px',
              marginLeft: '8px',
              fontSize: '16px',
              fontWeight: '400',
            }}
          >
            {feedback.comment}
          </p>
        </div>
      </div>
    );
  };

  const nonverbalData = {
    totalScore: 58,
    posture: {
      score: 66,
      average: 56,
      detail: '전체적으로 자세를 유지하며 안정적인 인상을 주었습니다.',
    },
    eye: {
      score: 58,
      average: 64,
      detail: '시선 분포의 흩어짐 정도를 줄이는 연습이 필요합니다.\n\n화면의 중앙을 응시하도록 하세요.',
    },
    gesture: {
      score: 68,
      average: 43,
      detail: '이완 움직임이 적절하여 안정적인 제스처를 유지했습니다.',
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
          {renderSummaryBox('자세', 'posture', nonverbalData.posture.score, nonverbalData.posture.average)}
          {renderSummaryBox('시선', 'eye', nonverbalData.eye.score, nonverbalData.eye.average)}
          {renderSummaryBox('제스처', 'gesture', nonverbalData.gesture.score, nonverbalData.gesture.average)}
        </div>

        <h3 className="detail-title">세부 분석 결과</h3>
        <div className="detail-section">
          <div className="detail-row" style={{ justifyContent: 'flex-start' }}>
            <div className="detail-box drop-shadow-large full-width" style={{padding:"24px 20px"}}>
              <div className="detail-left" style={{ paddingRight: '64px' }}>
                <h4>자세 세부 분석 결과</h4>
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
                    <Tooltip />
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
            <div className="detail-box drop-shadow-large full-width" style={{padding:"24px 20px"}}>
              <div className="detail-left" style={{ paddingRight: '64px'}}>
                <h4>시선 세부 분석 결과</h4>
                <p style={{ whiteSpace: 'pre-wrap' }}>{nonverbalData.eye.detail}</p>
              </div>
              <div className="detail-right" style={{ marginLeft: '60px' }}>
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
                    <ReferenceLine x={50} stroke="var(--nuetral-50)" strokeWidth={1} />
                    <ReferenceLine y={50} stroke="var(--nuetral-50)" strokeWidth={1} />
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
            <div className="detail-box drop-shadow-large full-width" style={{padding:"24px 20px"}}>
              <div className="detail-left">
                <h4>표정 세부 분석 결과</h4>
                <p>{nonverbalData.gesture.detail}</p>
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
