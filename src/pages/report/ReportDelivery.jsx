import { useEffect } from 'react';
import { Container } from '@mui/material';
import {
  XAxis, YAxis, Tooltip,
  AreaChart, Area, ResponsiveContainer
} from 'recharts';
import WordCloud from 'wordcloud';

import { useNavigateWithScrollTop } from '../../hooks/useNavigateWithScrollTop';
import { PATH } from '../../data/paths';
import { usePdfDownload } from '../../hooks/usePdfDownload';

import NavbarComponent from '../../components/Navbar';
import Footer from '../../components/Footer';
import ReportHeader from '../../components/ReportHeader';
import FeedbackSummaryBox from '../../components/FeedbackSummaryBox';
import ButtonPair from '../../components/buttonPair';

import './Report.css';

const ReportDelivery = () => {
  const navigateAndScrollTop = useNavigateWithScrollTop();
  const { pageRef, handleDownload } = usePdfDownload('delivery_report.pdf');

  const waveformData = Array.from({ length: 200 }, (_, i) => ({
    time: i * 0.1,
    amplitude: Math.sin(i * 0.5) * (Math.random() * 0.7 + 0.3)
  }));

  const wordList = [
    ['협력', 20], ['개발', 18], ['파이썬', 16], ['가능성', 12],
    ['경험', 10], ['문제해결', 8], ['의사소통', 6], ['팀워크', 4],
    ['전달력', 7], ['리더십', 5], ['노력', 4], ['성장', 3], ['역량', 6], ['지원동기', 3]
  ];
  useEffect(() => {
    if (typeof window !== 'undefined' && wordList.length > 0) {
      const getColorByWeight = (weight) => {
        if (weight >= 15) return 'var(--primary-60)';
        if (weight >= 10) return 'var(--primary-40)';
        if (weight >= 5) return 'var(--primary-20)';
        return 'var(--primary-10)';
      };

      WordCloud(document.getElementById('wordcloud'), {
        list: wordList,
        gridSize: 6,
        weightFactor: 6,
        fontFamily: 'Pretendard',
        color: (word, weight) => getColorByWeight(weight),
        backgroundColor: 'white',
        rotateRatio: 0,
        rotationSteps: 1,
      });
    }
  }, [wordList]);


  const deliveryData = {
    totalScore: 85,
    pronunciation: {
      score: 88,
      average: 82,
      detail: '발음은 전체적으로 또박또박 전달되었으나, 일부 단어에서 발음이 뭉개지는 경향이 있었습니다. 모음 발음을 명확히 하는 연습을 권장합니다.'
    },
    tone: {
      hz: 210,
      std: 50,
      average: 200,
      detail: '톤은 비교적 안정적이고 자연스러웠습니다. 다만 일부 질문에서 음역대가 높아지며 긴장감이 드러나는 부분이 있었습니다.'
    },
    speed: {
      score: 60,
      average: 65,
      detail: '발화 속도가 전체적으로 안정적이었으나, 질문에 따라 다소 빠르게 말하는 경향이 보였습니다. 일정한 속도를 유지하도록 연습하면 좋겠습니다.'
    },
    wordHabit: {
      detail: '발화 중 "어", "음"과 같은 군더더기 말이 자주 사용되었습니다. 이러한 습관어를 줄이는 연습을 통해 전달력을 높일 수 있습니다.'
    }
  };

  return (
    <Container ref={pageRef} maxWidth={false} style={{ backgroundColor: "var(--background-color)", minHeight: '100vh', padding: 0 }}>
      <NavbarComponent />
      <ReportHeader
        interviewTitle="○○대학교 모의면접 결과"
        reportTitle="전달력 분석 결과"
        timestamp="2025-03-15 21:25:41"
        onDownload={handleDownload}
      />
      <div className="report-container">
        <h3 className="total-score">총점 <span>{deliveryData.totalScore}점</span></h3>

        <div className="summary-section">
          <FeedbackSummaryBox
            title="어미"
            category="pronunciation"
            myScore={deliveryData.pronunciation.score}
            average={deliveryData.pronunciation.average}
          />
          <FeedbackSummaryBox
            title="톤"
            category="tone"
            myScore={{hz: deliveryData.tone.hz, std: deliveryData.tone.std}}
            average={deliveryData.tone.average}
          />
          <FeedbackSummaryBox
            title="속도"
            category="speed"
            myScore={deliveryData.speed.score}
            average={deliveryData.speed.average}
          />
        </div>

        <h3 className="detail-title">세부 분석 결과</h3>
        <div className="detail-section">
          <div className="detail-row">
            <div className="detail-box drop-shadow-large" style={{ flex: '1 1 40%', padding:"32px 28px" }}>
              <div className="detail-left">
                <h4 style={{fontSize:"20px",  marginTop:"0px",  marginBottom:"40px"}}>어미 세부 분석 결과</h4>
                <p>{deliveryData.pronunciation.detail}</p>
              </div>
            </div>
            <div className="detail-box drop-shadow-large" style={{ flex: '1 1 60%', padding:"32px 28px" }}>
              <div className="detail-left">
                <h4 style={{fontSize:"20px",  marginTop:"0px",  marginBottom:"40px"}}>톤 세부 분석 결과</h4>
                <p>{deliveryData.tone.detail}</p>
              </div>
              <div className="detail-right" style={{ border: '1px solid var(--nuetral-40)', borderRadius: '8px' }}>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={waveformData}>
                    <XAxis height={0} axisLine={false} tickLine={false} tick={false} />
                    <YAxis width={0} axisLine={false} tickLine={false} tick={false} />
                    <Tooltip />
                    <Area type="monotone" dataKey="amplitude" stroke="var(--primary-60)" fill="var(--primary-40)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="detail-row">
            <div className="detail-box drop-shadow-large" style={{padding:"32px 28px"}}>
              <div className="detail-left">
                <h4 style={{fontSize:"20px",  marginTop:"0px",  marginBottom:"40px"}}>어휘 세부 분석 결과</h4>
                <p>{deliveryData.wordHabit.detail}</p>
              </div>
              <div className="detail-right">
                <div id="wordcloud" style={{ width: 400, height: 180 }}></div>
              </div>
            </div>
          </div>
        </div>

        <ButtonPair
          leftText="비언어적 커뮤니케이션 분석 결과 보러가기"
          rightText="답변 구성 분석 결과 보러가기"
          onLeftClick={() => navigateAndScrollTop(PATH.REPORT_NONVERBAL)}
          onRightClick={() => navigateAndScrollTop(PATH.REPORT_ANSWER)}
        />
      </div>
      <Footer />
    </Container>
  );
};

export default ReportDelivery;
