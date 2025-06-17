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

  const wordList = Array.isArray(deliveryData.frequentlyUsedWords)
  ? deliveryData.frequentlyUsedWords.flat()
  : [];

  useEffect(() => {
    if (typeof window !== 'undefined' && wordList?.length > 0) {
      const getColorByWeight = (weight) => {
        if (weight >= 5) return 'var(--primary-60)';
        if (weight >= 3) return 'var(--primary-40)';
        if (weight >= 2) return 'var(--primary-20)';
        return 'var(--primary-10)';
      };

      WordCloud(document.getElementById('wordcloud'), {
        list: wordList,
        gridSize: 6,
        weightFactor: 14,
        fontFamily: 'Pretendard',
        color: (word, weight) => getColorByWeight(weight),
        backgroundColor: 'white',
        rotateRatio: 0,
        rotationSteps: 1,
        shrinkToFit: true
      });
    }
  }, [deliveryData]);

  return (
    <Container ref={pageRef} maxWidth={false} style={{ backgroundColor: "var(--background-color)", minHeight: '100vh', padding: 0 }}>
      <NavbarComponent />
      <ReportHeader
        interviewTitle={`${deliveryData.university} 모의면접 결과`}
        reportTitle="전달력 분석 결과"
        timestamp={`${deliveryData.createdAt}`}
        onDownload={handleDownload}
      />
      {deliveryData&&(
        <div className="report-container">
        <h3 className="total-score">총점 <span>{deliveryData.totalScore.avgHesitantScore}점</span></h3>

        <div className="summary-section">
          <FeedbackSummaryBox
            title="어미"
            category="pronunciation"
            myScore={deliveryData.totalScore.avgHesitantScore}
            average={deliveryData.totalScore.avgHesitantScore}
          />
          <FeedbackSummaryBox
            title="톤"
            category="tone"
            myScore={deliveryData.totalScore.avgPitchScore}
            average={deliveryData.totalScore.avgPitchScore}
          />
          <FeedbackSummaryBox
            title="속도"
            category="speed"
            myScore={deliveryData.totalScore.avgSpeedScore}
            average={deliveryData.totalScore.avgSpeedScore}
          />
        </div>

        <h3 className="detail-title">세부 분석 결과</h3>
        <div className="detail-section">
          <div className="detail-row">
            <div className="detail-box drop-shadow-large" style={{ flex: '1 1 40%', padding:"32px 28px" }}>
              <div className="detail-left">
                <h4 style={{fontSize:"20px",  marginTop:"0px",  marginBottom:"40px"}}>어미 세부 분석 결과</h4>
                <p>아무 값이나 넣기</p>
              </div>
            </div>
            <div className="detail-box drop-shadow-large" style={{ flex: '1 1 60%', padding:"32px 28px" }}>
              <div className="detail-left">
                <h4 style={{fontSize:"20px",  marginTop:"0px",  marginBottom:"40px"}}>톤 세부 분석 결과</h4>
                <p>아무 값이나 넣기</p>
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
                <p>아래 단어를 자주 사용했어요.</p>
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
