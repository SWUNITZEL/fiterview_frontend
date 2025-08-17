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

  const toNum = (v) => (typeof v === 'number' && Number.isFinite(v) ? v : 0);

  const waveformData = Array.from({ length: 200 }, (_, i) => ({
    time: i * 0.1,
    amplitude: Math.sin(i * 0.5) * (Math.random() * 0.7 + 0.3),
  }));

  const wordList = Array.isArray(deliveryData?.frequentlyUsedWords)
    ? deliveryData.frequentlyUsedWords.flat()
    : [];

  const hesitantScore = Math.round(toNum(deliveryData?.totalScore?.avgHesitantScore)); // 어미(발음)
  const pitchScore = Math.round(toNum(deliveryData?.totalScore?.avgPitchScore));        // 톤(점수)
  const speedScore = Math.round(toNum(deliveryData?.totalScore?.avgSpeedScore));        // 속도

  const avgForAll = 80;
  const totalScore = Math.round((hesitantScore + pitchScore + speedScore) / 3);

  // 백엔드의 실제 평균 음높이(Hz) 탐색 (여러 후보 경로를 안전하게 조회)
  const pitchHzCandidates = [
    deliveryData?.avgPitchHz,
    deliveryData?.pitch?.avgHz,
    deliveryData?.voice?.avgPitchHz,
    deliveryData?.totalScore?.avgPitchHz,
  ];
  const pitchHzRaw = pitchHzCandidates.find((v) => typeof v === 'number' && Number.isFinite(v));
  const pitchHz = typeof pitchHzRaw === 'number' ? pitchHzRaw : NaN;

  const shortKoreanWords = wordList
    .map((w) => (Array.isArray(w) ? w[0] : w)) 
    .filter((w) => typeof w === 'string')
    .map((w) => w.trim())
    .filter((w) => w.length >= 2 && w.length <= 3)
    .slice(0, 3);

  const pronExamples = shortKoreanWords.length > 0 ? shortKoreanWords.join(', ') : '발음, 연습';

  const pronunciationComment =
    hesitantScore > 80
      ? '발음이 전반적으로 좋은 편이에요.\n이대로 유지하세요.'
      : `발음 연습이 추가적으로 필요합니다.\n${pronExamples}와 같은 단어의 발음 연습이 필요해요.`;

 
  const toneComment = Number.isFinite(pitchHz)
    ? pitchHz > 260.3
      ? '목소리 톤이 평균값보다 높은 편이에요.\n높은 목소리는 안정감과 신뢰감을 주기 어려움으로 톤을 낮추는 연습이 필요해요.'
      : '목소리 톤이 평균값보다 낮은 편이에요.\n낮은 목소리는 안정감과 신뢰감을 주니 이 톤을 유지하세요.'
    : '평균 음높이(Hz) 데이터를 확인하기 어려워요.\n현재 톤을 유지하되, 과도한 고음/저음을 피하며 안정감을 유지해 보세요.';


  const vocabComment =
    '아래 단어를 자주 사용했어요.\n습관적인 어휘 사용을 줄이기 위해 다음 단어를 말하기 전에 한 템포 쉬고 얘기해보세요.';

  useEffect(() => {
    if (typeof window !== 'undefined' && wordList?.length > 0) {
      const getColorByWeight = (weight) => {
        if (weight >= 5) return 'var(--primary-60)';
        if (weight >= 3) return 'var(--primary-40)';
        if (weight >= 2) return 'var(--primary-20)';
        return 'var(--primary-10)';
      };

      const el = document.getElementById('wordcloud');
      if (el) {
        WordCloud(el, {
          list: wordList,
          gridSize: 6,
          weightFactor: 14,
          fontFamily: 'Pretendard',
          color: (_, weight) => getColorByWeight(weight),
          backgroundColor: 'white',
          rotateRatio: 0,
          rotationSteps: 1,
          shrinkToFit: true,
        });
      }
    }
  }, [wordList]);

  return (
    <Container
      ref={pageRef}
      maxWidth={false}
      style={{ backgroundColor: 'var(--background-color)', minHeight: '100vh', padding: 0 }}
    >
      <NavbarComponent />
      <ReportHeader
        interviewTitle={`${deliveryData?.university ?? ''} 모의면접 결과`}
        reportTitle="전달력 분석 결과"
        timestamp={`${deliveryData?.createdAt ?? ''}`}
        onDownload={handleDownload}
      />

      {deliveryData && (
        <div className="report-container">
          <h3 className="total-score">
            총점 <span>{totalScore}점</span>
          </h3>

          <div className="summary-section">
            <FeedbackSummaryBox
              title="어미"
              category="pronunciation"
              myScore={hesitantScore}
              average={avgForAll}
            />
            <FeedbackSummaryBox
              title="톤"
              category="tone"
              myScore={pitchScore}
              average={avgForAll}
            />
            <FeedbackSummaryBox
              title="속도"
              category="speed"
              myScore={speedScore}
              average={avgForAll}
            />
          </div>

          <h3 className="detail-title">세부 분석 결과</h3>
          <div className="detail-section">
            <div className="detail-row">
  
              <div className="detail-box drop-shadow-large" style={{ flex: '1 1 40%', padding: '32px 28px' }}>
                <div className="detail-left">
                  <h4 style={{ fontSize: '20px', marginTop: '0px', marginBottom: '40px' }}>어미 세부 분석 결과</h4>
                  <p style={{ whiteSpace: 'pre-wrap' }}>{pronunciationComment}</p>
                </div>
              </div>

   
              <div className="detail-box drop-shadow-large" style={{ flex: '1 1 60%', padding: '32px 28px' }}>
                <div className="detail-left">
                  <h4 style={{ fontSize: '20px', marginTop: '0px', marginBottom: '40px' }}>톤 세부 분석 결과</h4>
                  <p style={{ whiteSpace: 'pre-wrap' }}>{toneComment}</p>
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
              <div className="detail-box drop-shadow-large" style={{ padding: '32px 28px' }}>
                <div className="detail-left">
                  <h4 style={{ fontSize: '20px', marginTop: '0px', marginBottom: '40px' }}>어휘 세부 분석 결과</h4>
                  <p style={{ whiteSpace: 'pre-wrap' }}>{vocabComment}</p>
                </div>
                <div className="detail-right">
                  <div id="wordcloud" style={{ width: 400, height: 180 }} />
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
