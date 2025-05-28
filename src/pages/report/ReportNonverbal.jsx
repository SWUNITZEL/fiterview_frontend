import { Container } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

import { useNavigateWithScrollTop } from '../../utils/useNavigateWithScrollTop';
import { PATH } from '../../data/paths';
import { usePdfDownload } from '../../hooks/usePdfDownload';

import NavbarComponent from '../../components/Navbar';
import ReportHeader from '../../components/ReportHeader';
import ButtonPair from '../../components/buttonPair';

import './Report.css';
const ReportNonverbal = () => {
  const navigateAndScrollTop = useNavigateWithScrollTop()

  const { pageRef, handleDownload } = usePdfDownload('nonverbal_report.pdf');

  const getFeedback = (category, score, blinkRate, shoulderRatio) => {
    if (category === 'posture') {
      return {
        label: score >= analysisData.posture.average ? '장점' : '개선점',
        comment: score >= analysisData.posture.average
          ? '안정적인 자세를 유지하고 있어요. 이대로 유지하세요.'
          : '어깨와 상체의 움직임이 자주 보입니다. 안정적인 자세를 연습해보세요.'
      };
    }

    if (category === 'eyes') {
      let label = blinkRate <= 20 ? '장점' : '개선점';
      let comment = '';

      if (blinkRate <= 20) comment = '눈 깜빡임이 자연스럽고 안정적인 표정을 유지하셨습니다.';
      else if (blinkRate <= 30) comment = '눈 깜박임이 비교적 자주 나타났습니다. 시선 집중을 유지하도록 연습해보세요.';
      else comment = '눈 깜빡임이 지나치게 많아 불안하거나 산만해 보일 수 있습니다. 시선 집중을 유지하도록 해보세요.';

      return { label, comment };
    }

    if (category === 'shoulder') {
      let label = shoulderRatio <= 15 ? '장점' : '개선점';
      let comment = '';

      if (shoulderRatio > 30) comment = '어깨 움직임이 잦아 긴장감이 전달됩니다. 상체의 안정성을 유지하는 자세 연습이 필요합니다.';
      else if (shoulderRatio > 15) comment = '어깨 움직임이 비교적 자주 나타났습니다. 필요 시 정적인 자세를 의식해보세요.';
      else comment = '어깨 움직임이 적절하며 안정적인 자세를 유지하셨습니다.';

      return { label, comment };
    }
  };

  const analysisData = {
  totalScore: 82,
  posture: {
    score: 85,
    average: 78,
    detail: '면접 중 안정적인 자세를 유지했으며, 상체의 흔들림이 적었습니다. 긴장 상황에서도 자연스러운 움직임을 보여주었습니다.',
  },
  eyes: {
    score: 80,
    average: 75,
    blinkRate: 18,
    detail: '눈 깜박임 빈도가 적절하며, 시선이 정면을 잘 유지되었습니다. 일부 질문에서 약간의 시선 회피가 있었지만 전반적으로 양호했습니다.',
  },
  shoulder: {
    score: 78,
    average: 74,
    movementRatio: 12,
    detail: '어깨 움직임이 적고, 불필요한 제스처 없이 안정적인 자세로 임했습니다. 면접관에게 자신감 있는 인상을 주었습니다.',
  },
};

  const renderSummaryBox = (title, category, myScore, averageScore, blinkRate, shoulderRatio) => {
    const { label, comment } = getFeedback(category, myScore, blinkRate, shoulderRatio);
    const color = label === '장점' ? 'green' : 'yellow';
    const data = [
      { name: '응시자 평균', score: averageScore },
      { name: '내 점수', score: myScore },
    ];

    return (
      <div className="summary-box drop-shadow-large">
        <h3>{title}</h3>
        <ResponsiveContainer width="100%" height={120}>
          <BarChart data={data} layout="vertical">
            <XAxis type="number" hide />
            <YAxis type="category" dataKey="name" />
            <Tooltip />
            <Bar dataKey="score" radius={[10, 10, 10, 10]} fill={color === 'green' ? '#4CAF50' : '#FFCA28'} />
          </BarChart>
        </ResponsiveContainer>
        <div className="summary-footer">
          <span style={{ whiteSpace: 'nowrap' }} className={`tag ${color}`}>{label}</span>
          <p className="summary-comment">{comment}</p>
        </div>
      </div>
    );
  };

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
        reportTitle = "비언어적 커뮤니케이션 분석 결과"
        timestamp="2025-03-15 21:25:41" 
        onDownload={handleDownload}
        />
      <div className="report-container">
        <h3 className="total-score">총점 <span>{analysisData.totalScore}점</span></h3>

        <div className="summary-section">
          {renderSummaryBox('자세', 'posture', analysisData.posture.score, analysisData.posture.average)}
          {renderSummaryBox('시선', 'eyes', analysisData.eyes.score, analysisData.eyes.average, analysisData.eyes.blinkRate)}
          {renderSummaryBox('제스처', 'shoulder', analysisData.shoulder.score, analysisData.shoulder.average, null, analysisData.shoulder.movementRatio)}
        </div>

        <h3 className="detail-title">세부 분석 결과</h3>

        <div className="detail-section">
          <div className="detail-row">
            <div className="detail-box drop-shadow-large">
              <div className="detail-left">
                <h4>자세 세부 분석 결과</h4>
                <p>{analysisData.posture.detail}</p>
              </div>
              <div className="detail-right">[도넛 차트]</div>
            </div>

            <div className="detail-box drop-shadow-large">
              <div className="detail-left">
                <h4>시선 세부 분석 결과</h4>
                <p>{analysisData.eyes.detail}</p>
              </div>
              <div className="detail-right">[시선 분포 시각화]</div>
            </div>
          </div>

          <div className="detail-row full-width">
            <div className="detail-box drop-shadow-large">
              <div className="detail-left">
                <h4>제스처 세부 분석 결과</h4>
                <p>{analysisData.shoulder.detail}</p>
              </div>
              <div className="detail-right">[제스처 차트]</div>
            </div>
          </div>
        </div>
        <ButtonPair 
        rightText="전달력 분석 결과 보러가기"
        onRightClick={() =>navigateAndScrollTop(PATH.REPORT_DELIVERY)}
        />
      </div>
    </Container>
  );
};

export default ReportNonverbal;
