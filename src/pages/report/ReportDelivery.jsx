import { useEffect } from 'react';
import { Container } from '@mui/material';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Cell, ReferenceLine, LabelList,
  AreaChart, Area, ResponsiveContainer
} from 'recharts';
import WordCloud from 'wordcloud';

import { useNavigateWithScrollTop } from '../../hooks/useNavigateWithScrollTop';
import { PATH } from '../../data/paths';
import { usePdfDownload } from '../../hooks/usePdfDownload';

import NavbarComponent from '../../components/Navbar';
import Footer from '../../components/Footer';
import ReportHeader from '../../components/ReportHeader';
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
    const scoreValue = category === 'tone' ? myScore.hz : myScore;

    const data = [
        { name: '응시자 평균', score: average },
        { name: '내 점수', score: scoreValue },
    ];

    return (
        <div style={{padding:"32px 40px", background: "white", borderRadius:"16px", flex:"1"}} className="drop-shadow-large">
            <h3 style={{fontSize:"20px"}}>
                {title} <span style={{ color: scoreValue>average? 'var(--success-40)' : 'var(--warning-40)' }}>
                  {scoreValue>average? "평균 이상":"평균 이하"}
                </span>
            </h3>
            <div style={{ width: 200, margin: '0 auto' }}>
                <BarChart data={data} layout="horizontal" margin={{ top: 20, right: 0, bottom: 0, left: 0 }} width={200} height={180}>
                    <XAxis 
                      type="category" 
                      dataKey="name" 
                      padding={{ left: 0, right: 0 }}
                      axisLine={false} 
                      tickLine={false} 
                      tickMargin={0}
                    />
                    <YAxis 
                      type="number" 
                      domain={[0, Math.max(average, scoreValue) + 20]} 
                      width={0}
                      padding={{ left: 0, right: 0 }}
                      axisLine={false} 
                      tickLine={false} 
                      tick={false}
                      tickMargin={0}
                    />
                    <Tooltip />
                    <ReferenceLine y={average} stroke="#888" strokeDasharray="4 4" />
                    <Bar dataKey="score" barSize={60} radius={[10, 10, 0, 0]}>
                        <LabelList dataKey="score" position="top" />
                        {data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={entry.name === '응시자 평균' ? 'var(--nuetral-40)' : scoreValue>average? 'var(--success-40)' : 'var(--warning-40)'}
                                margin={{ top: 20, right: 0, bottom: 0, left: 0 }}
                            />
                        ))}
                    </Bar>
                </BarChart>
              </div>
            <div style={{display:"flex", justifyContent:"center", marginTop:"36px"}}>
                <span style={{ backgroundColor: scoreValue>average? "var(--success-40)" : "var(--warning-40)", whiteSpace: "nowrap", color:"white", height:"fit-content", fontSize:"16px", padding:"2px 12px" , borderRadius:"16px"}}>{feedback.label}</span>
                <p style={{marginTop:"0px", marginLeft:"8px", fontSize:"16px", fontWeight:"400"}}>{feedback.comment}</p>
            </div>
        </div>
    );
  };

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
          {renderSummaryBox('어미', 'pronunciation', deliveryData.pronunciation.score, deliveryData.pronunciation.average)}
          {renderSummaryBox('톤', 'tone', deliveryData.tone, deliveryData.tone.average)}
          {renderSummaryBox('속도', 'speed', deliveryData.speed.score, deliveryData.speed.average)}
        </div>

        <h3 className="detail-title">세부 분석 결과</h3>
        <div className="detail-section">
          <div className="detail-row">
            <div className="detail-box drop-shadow-large" style={{ flex: '1 1 40%' }}>
              <div className="detail-left">
                <h4>어미 세부 분석 결과</h4>
                <p>{deliveryData.pronunciation.detail}</p>
              </div>
            </div>
            <div className="detail-box drop-shadow-large" style={{ flex: '1 1 60%' }}>
              <div className="detail-left">
                <h4>톤 세부 분석 결과</h4>
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
            <div className="detail-box drop-shadow-large" style={{padding:"24px 20px"}}>
              <div className="detail-left">
                <h4>어휘 세부 분석 결과</h4>
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
