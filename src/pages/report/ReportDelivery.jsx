import { Container } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

import { useNavigateWithScrollTop } from '../../hooks/useNavigateWithScrollTop';
import { PATH } from '../../data/paths';
import { usePdfDownload } from '../../hooks/usePdfDownload';

import NavbarComponent from '../../components/Navbar';
import ReportHeader from '../../components/ReportHeader';
import ButtonPair from '../../components/buttonPair';

import './Report.css';

const ReportDelivery = () => {
  const navigateAndScrollTop = useNavigateWithScrollTop()
  const { pageRef, handleDownload } = usePdfDownload('delivery_report.pdf');

  const getFeedback = (category, value) => {
    if (category === 'pronunciation') {
      if (value >= 90) return { label: '장점', comment: '또박또박 잘 전달했어요.' };
      if (value >= 80) return { label: '개선점', comment: '또박또박 전달하는 연습이 필요해요.' };
      return { label: '개선점', comment: '전달력이 좋지 않아요. 발음 연습이 많이 필요해요.' };
    }

    if (category === 'tone') {
      const { hz, std } = value;
      if (hz <= 220 && hz >= 160) return { label: '장점', comment: '음역대가 또렷하고 안정적입니다.' };
      if (hz > 220 && std <= 55) return { label: '장점', comment: '다소 높은 톤이지만 안정적으로 들립니다.' };
      if (hz < 160) return { label: '개선점', comment: '음성이 다소 단조롭게 들릴 수 있습니다.' };
      if (hz > 220 && std <= 45) return { label: '개선점', comment: '톤이 높고 변화가 적어 단조롭거나 부자연스럽게 들릴 수 있습니다.' };
      if (hz > 250 && std > 700) return { label: '개선점', comment: '높은 음역과 변화가 많아 산만하게 들릴 수 있습니다.' };
    }

    if (category === 'speed') {
      return value < 65
        ? { label: '장점', comment: '발화 속도가 일정합니다.' }
        : { label: '개선점', comment: '발화 속도가 빠릅니다.' };
    }
  };

  const renderSummaryBox = (title, category, myScore, average) => {
    const feedback = getFeedback(category, myScore);
    const color = feedback.label === '장점' ? 'green' : 'yellow';
    const scoreValue = category === 'tone' ? myScore.hz : myScore;
    const data = [
      { name: '응시자 평균', score: average },
      { name: '내 점수', score: scoreValue },
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
          <span className={`tag ${color}`}>{feedback.label}</span>
          <p className="summary-comment">{feedback.comment}</p>
        </div>
      </div>
    );
  };

  const deliveryData = {
  totalScore: 85,
  pronunciation: {
    score: 88,
    average: 82,
    detail: '발음은 전체적으로 또박또박 전달되었으나, 일부 단어에서 발음이 뭉개지는 경향이 있었습니다. 모음 발음을 명확히 하는 연습을 권장합니다.',
  },
  tone: {
    hz: 210,
    std: 50,
    average: 200,
    detail: '톤은 비교적 안정적이고 자연스러웠습니다. 다만 일부 질문에서 음역대가 높아지며 긴장감이 드러나는 부분이 있었습니다.',
  },
  speed: {
    score: 60,
    average: 65,
    detail: '발화 속도가 전체적으로 안정적이었으나, 질문에 따라 다소 빠르게 말하는 경향이 보였습니다. 일정한 속도를 유지하도록 연습하면 좋겠습니다.',
  },
  wordHabit: {
    detail: '발화 중 "어", "음"과 같은 군더더기 말이 자주 사용되었습니다. 이러한 습관어를 줄이는 연습을 통해 전달력을 높일 수 있습니다.',
  },
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
        reportTitle = "전달력 분석 결과"
        timestamp="2025-03-15 21:25:41" 
        onDownload={handleDownload}
        />
    <div className="report-container">
      <h3 className="total-score">총점 <span>{deliveryData.totalScore}점</span></h3>

      <div className="summary-section">
        {renderSummaryBox('발음', 'pronunciation', deliveryData.pronunciation.score, deliveryData.pronunciation.average)}
        {renderSummaryBox('톤', 'tone', deliveryData.tone, deliveryData.tone.average)}
        {renderSummaryBox('속도', 'speed', deliveryData.speed.score, deliveryData.speed.average)}
      </div>

      <h3 className="detail-title">세부 분석 결과</h3>
      <div className="detail-section">
        <div className="detail-row">
          <div className="detail-box drop-shadow-large">
            <div className="detail-left">
              <h4>발음 세부 분석 결과</h4>
              <p>{deliveryData.pronunciation.detail}</p>
            </div>
            <div className="detail-right">[발음 분석]</div>
          </div>
          <div className="detail-box drop-shadow-large">
            <div className="detail-left">
              <h4>톤 세부 분석 결과</h4>
              <p>{deliveryData.tone.detail}</p>
            </div>
            <div className="detail-right">[톤 파형]</div>
          </div>
        </div>

        <div className="detail-row">
          <div className="detail-box drop-shadow-large">
            <div className="detail-left">
              <h4>속도 세부 분석 결과</h4>
              <p>{deliveryData.speed.detail}</p>
            </div>
            <div className="detail-right">[속도 그래프]</div>
          </div>
          <div className="detail-box drop-shadow-large">
            <div className="detail-left">
              <h4>어휘 세부 분석 결과</h4>
              <p>{deliveryData.wordHabit.detail}</p>
            </div>
            <div className="detail-right">[워드 클라우드]</div>
          </div>
        </div>
      </div>
      <ButtonPair 
        leftText="비언어적 커뮤니케이션 분석 결과 보러가기"
        rightText="답변 구성 분석 결과 보러가기"
        onLeftClick={()=>navigateAndScrollTop(PATH.REPORT_NONVERBAL)}
        onRightClick={()=>navigateAndScrollTop(PATH.REPORT_ANSWER)}
        />
    </div>
    </Container>
  );
};

export default ReportDelivery;
