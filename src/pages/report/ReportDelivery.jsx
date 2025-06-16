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
import useReportDelivery from '../../hooks/useReportDelivery';
import useInterviewId from '../../hooks/useInterviewId';

import NavbarComponent from '../../components/Navbar';
import Footer from '../../components/Footer';
import ReportHeader from '../../components/ReportHeader';
import FeedbackSummaryBox from '../../components/FeedbackSummaryBox';
import ButtonPair from '../../components/buttonPair';

import './Report.css';

const ReportDelivery = () => {
  const navigateAndScrollTop = useNavigateWithScrollTop();
  const { pageRef, handleDownload } = usePdfDownload('delivery_report.pdf');
  const interviewId = useInterviewId();

  const { deliveryData, loading, error } = useReportDelivery(interviewId);

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

  return (
    <Container ref={pageRef} maxWidth={false} style={{ backgroundColor: "var(--background-color)", minHeight: '100vh', padding: 0 }}>
      <NavbarComponent />
      <ReportHeader
        interviewTitle="○○대학교 모의면접 결과"
        reportTitle="전달력 분석 결과"
        timestamp="2025-03-15 21:25:41"
        onDownload={handleDownload}
      />
      {deliveryData&&(
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
          onLeftClick={() => navigateAndScrollTop(`${PATH.REPORT_NONVERBAL}?interviewId=${interviewId}`)}
          onRightClick={() => navigateAndScrollTop(`${PATH.REPORT_ANSWER}?interviewId=${interviewId}`)}
        />
        </div>
      )}
      <Footer />
    </Container>
  );
};

export default ReportDelivery;
