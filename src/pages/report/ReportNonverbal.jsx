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

  const NV = nonverbalData ?? {};
  const toNum = (v) => (typeof v === 'number' && Number.isFinite(v) ? v : 0);

  // 점수 계산 (내 점수는 반올림, 평균 점수는 80 고정)
  const postureScoreRaw = toNum(NV.totalScore?.avgFacialScore);
  const tensionScoreRaw = 100 - toNum(NV.totalScore?.avgGazeScore);
  const gazeScoreRaw = toNum(NV.totalScore?.avgPostureScore);

  const postureScore = Math.round(postureScoreRaw);
  const tensionScore = Math.round(tensionScoreRaw);
  const gazeScore = Math.round(gazeScoreRaw);

  const avgForAll = 80;
  const totalScore = Math.round((postureScore + tensionScore + gazeScore) / 3);

  // 시선 데이터 가공
  const gazeData = (() => {
    const raw = NV.gazePointList ?? [];
    const arr = Array.isArray(raw) ? raw.flat() : [];
    return arr
      .map((pt) =>
        Array.isArray(pt)
          ? { x: toNum(pt[0]), y: toNum(pt[1]) }
          : { x: toNum(pt?.x), y: toNum(pt?.y) }
      )
      .filter((d) => Number.isFinite(d.x) && Number.isFinite(d.y));
  })();

  // 움직임 데이터
  const movementData = Array.isArray(NV.gazePointList)
    ? [
        { name: '어깨 움직임', value: toNum(NV.avgShoulderTiltCount) },
        { name: '왼쪽으로 고개 돌림', value: toNum(NV.avgTurnLeftCount) },
        { name: '오른쪽으로 고개 돌림', value: toNum(NV.avgTurnRightCount) },
      ]
    : [];

  // 자세 코멘트: 가장 많은 항목을 찾아서 메시지 생성
  const movementComment = (() => {
    if (!movementData.length) return '측정된 움직임 데이터가 부족합니다.';
    const top = movementData.reduce((a, b) => (b.value > a.value ? b : a), movementData[0]);
    const isShoulder = top.name.includes('어깨');
    const targetWord = isShoulder ? '어깨' : '고개';
    return `${top.name}이 심한 편이에요.\n${targetWord}를 고정시키고 말하는 연습이 필요해요.`;
  })();

  // 시선 코멘트: 두 문장 + 개행(\n)
  const gazeComment =
    '면접 중 시선 분산을 줄이고 정면 응시에 집중해 보세요.\n시선이 한쪽으로 치우치지 않도록 균형 있게 유지하면 안정감이 높아져요.';

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
        interviewTitle={`${NV.university ?? ''} 모의면접 결과`}
        reportTitle="비언어적 커뮤니케이션 분석 결과"
        timestamp={NV.createdAt ?? ''}
        onDownload={handleDownload}
      />

      {nonverbalData && (
        <div className="report-container">
          <h3 className="total-score">
            총점 <span>{totalScore}점</span>
          </h3>

          <div className="summary-section">
            <FeedbackSummaryBox
              title="자세"
              category="posture"
              myScore={postureScore}
              average={avgForAll}
            />
            <FeedbackSummaryBox
              title="긴장도"
              category="blink"
              myScore={tensionScore}
              average={avgForAll}
            />
            <FeedbackSummaryBox
              title="시선처리"
              category="gaze"
              myScore={gazeScore}
              average={avgForAll}
            />
          </div>

          <h3 className="detail-title">세부 분석 결과</h3>

          <div className="detail-section">
            {/* 자세 세부 분석 */}
            <div className="detail-row" style={{ justifyContent: 'flex-start' }}>
              <div className="detail-box drop-shadow-large full-width" style={{ padding: '32px 40px' }}>
                <div className="detail-left" style={{ paddingRight: '64px' }}>
                  <h4 style={{ fontSize: '20px', marginTop: '0px', marginBottom: '40px' }}>
                    자세 세부 분석 결과
                  </h4>
                  <p>{movementComment}</p>
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
                      <Tooltip cursor={{ fill: 'transparent' }} />
                      <Bar dataKey="value" radius={[6, 6, 0, 0]} minPointSize={2}>
                        {movementData.map((entry, index) => {
                          const value = entry.value;
                          let fillColor = 'var(--success-40)'; 
                          if (value >= 40) fillColor = 'var(--warning-40)'; 
                          return <Cell key={`cell-${index}`} fill={fillColor} />;
                        })}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* 시선 세부 분석 */}
            <div className="detail-row" style={{ justifyContent: 'flex-start' }}>
              <div className="detail-box drop-shadow-large full-width" style={{ padding: '32px 40px' }}>
                <div className="detail-left" style={{ paddingRight: '64px' }}>
                  <h4 style={{ fontSize: '20px', marginTop: '0px', marginBottom: '40px' }}>
                    시선 세부 분석 결과
                  </h4>
                  <p style={{ whiteSpace: 'pre-wrap' }}>{gazeComment}</p>
                </div>

                <div
                  className="detail-right"
                  style={{ marginLeft: '60px', display: 'flex', justifyContent: 'center' }}
                >
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
                        domain={[-20, 120]}
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
                          fontSize: 14,
                        }}
                      />
                      <ReferenceLine
                        x={50}
                        stroke="var(--nuetral-50)"
                        strokeWidth={0}
                        label={{
                          position: 'insideBottomLeft',
                          value: '하단 응시',
                          fill: 'var(--nuetral-50)',
                          fontSize: 14,
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
                          fontSize: 14,
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
                          fontSize: 14,
                        }}
                      />
                      <ZAxis type="number" dataKey="z" range={[60]} tick={false} />
                      <Scatter name="Gaze" data={gazeData} fill="var(--primary-60)" fillOpacity={0.1} />
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* 표정 세부 분석 */}
            <div className="detail-row">
              <div className="detail-box drop-shadow-large full-width" style={{ padding: '32px 40px' }}>
                <div className="detail-left">
                  <h4 style={{ fontSize: '20px', marginTop: '0px', marginBottom: '40px' }}>
                    표정 세부 분석 결과
                  </h4>
                  <p>질문을 듣거나 발언을 할 때 보다 밝은 표정을 유지하세요.</p>
                </div>
              </div>
            </div>
          </div>

          <ButtonPair
            leftText=""
            rightText="전달력 분석 결과 보러가기"
            onLeftClick={undefined}
            onRightClick={() =>
              navigateAndScrollTop(`${PATH.REPORT_DELIVERY}?interviewId=${interviewId}`)
            }
          />
        </div>
      )}

      <Footer />
    </Container>
  );
};

export default ReportNonverbal;
