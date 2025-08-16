import { Container } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { useEffect, useMemo, useRef, useState } from 'react';

import { useNavigateWithScrollTop } from '../../hooks/useNavigateWithScrollTop';
import { PATH } from '../../data/paths';
import { ACCORDION_CONTENTS } from '../../data/report';
import { usePdfDownload } from '../../hooks/usePdfDownload';
import useReportAnswers from '../../hooks/useReportAnswers';
import useInterviewId from '../../hooks/useInterviewId';

import NavbarComponent from '../../components/Navbar';
import ReportHeader from '../../components/ReportHeader';
import ButtonPair from '../../components/buttonPair';
import Footer from '../../components/Footer';

import './Report.css';

const guessMime = (url) => {
  if (!url) return undefined;
  const qless = url.split('?')[0] || '';
  if (qless.endsWith('.mp4')) return 'video/mp4';
  if (qless.endsWith('.webm')) return 'video/webm';
  if (qless.endsWith('.ogg') || qless.endsWith('.ogv')) return 'video/ogg';
  if (qless.endsWith('.m3u8')) return 'application/vnd.apple.mpegurl';
  return undefined; // 브라우저가 추정
};

const pickVideoUrl = (data) => {
  if (!data) return '';
  // 우선순위: 배열 → 단일 필드들
  if (Array.isArray(data.videos) && data.videos.length > 0) {
    // 비어있지 않은 값만
    const first = data.videos.find(Boolean);
    if (first) return first;
  }
  return (
    data.videoUrl ||
    data.video ||
    data.mediaUrl ||
    data.answerVideoUrl ||
    ''
  );
};

const ReportAnswer = () => {
  const interviewId = useInterviewId();
  const { answerList = [], loading, error } = useReportAnswers(interviewId);

  const navigateAndScrollTop = useNavigateWithScrollTop();
  const { pageRef, handleDownload } = usePdfDownload('answer_report.pdf');
  const [page, setPage] = useState(1);

  const currentData = answerList[page - 1];

  // [수험자 답변], [평가] 라벨 제거
  const cleanLabel = (txt) =>
    typeof txt === 'string'
      ? txt.replace(/\[수험자\s*답변\]/gi, '').replace(/\[평가\]/gi, '').trim()
      : txt ?? '';

  // 비디오 URL 선택
  const videoUrl = useMemo(() => pickVideoUrl(currentData), [currentData]);
  const mimeType = useMemo(() => guessMime(videoUrl), [videoUrl]);
  const isHls = useMemo(() => (videoUrl || '').split('?')[0]?.endsWith('.m3u8'), [videoUrl]);

  const videoRef = useRef(null);

  // HLS(.m3u8) 처리: Safari면 네이티브, 그 외는 hls.js 동적 로딩
  useEffect(() => {
    let hls;
    const el = videoRef.current;

    if (!el || !videoUrl) return;

    // 매 페이지 전환 시 비디오 초기화
    el.pause();
    el.removeAttribute('src');
    el.load();

    if (isHls) {
      const canPlayNative = el.canPlayType('application/vnd.apple.mpegurl');
      if (canPlayNative) {
        el.src = videoUrl;
        el.load();
      } else {
        // 동적으로 hls.js 로드 (npm 설치 없이 CDN 사용)
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/hls.js@latest';
        script.async = true;
        script.onload = () => {
          // eslint-disable-next-line no-undef
          if (window.Hls && window.Hls.isSupported()) {
            // eslint-disable-next-line no-undef
            hls = new window.Hls({ enableWorker: true });
            hls.loadSource(videoUrl);
            hls.attachMedia(el);
          } else {
            console.warn('HLS.js is not supported in this browser.');
          }
        };
        script.onerror = () => console.error('Failed to load hls.js');
        document.body.appendChild(script);
        return () => {
          if (hls) {
            hls.destroy();
          }
        };
      }
    } else {
      // 일반 mp4/webm 등
      el.src = videoUrl;
      el.load();
    }

    return () => {
      try {
        if (hls) hls.destroy();
      } catch {}
    };
  }, [videoUrl, isHls]);

  // 표지 대학명/타임스탬프
  const university =
    currentData?.university ??
    currentData?.univ ??
    currentData?.schoolName ??
    currentData?.college ??
    '';

  const createdAt =
    currentData?.createdAt ??
    currentData?.timestamp ??
    '';

  return (
    <Container
      ref={pageRef}
      maxWidth={false}
      style={{
        backgroundColor: 'var(--background-color)',
        minHeight: '100vh',
        padding: '0',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <NavbarComponent />
      <ReportHeader
        interviewTitle={`${university} 모의면접 결과`}
        reportTitle="답변 구성 분석 결과"
        timestamp={createdAt}
        onDownload={handleDownload}
      />

      {Array.isArray(answerList) && answerList.length > 0 && (
        <div className="report-container">
          <h2 className="title-24-bold question">
            <span className="primary">Q{page}.</span>{' '}
            <span className="primary">
              {(currentData?.question || '').replace(/^\s*\d{1,2}[\.\)]\s*/, '')}
            </span>
          </h2>

          <div
            className="answer-visual-box drop-shadow-large"
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '32px 28px',
              display: 'flex',
              gap: '32px',
              alignItems: 'flex-start',
              marginBottom: '60px',
              border: 'none',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <span className="subtitle-18-bold" style={{ marginBottom: '16px' }}>
                질문 의도 & 사용자 답변
              </span>

              {videoUrl ? (
                <video
                  key={videoUrl /* URL 바뀔 때 강제 재마운트 */}
                  ref={videoRef}
                  controls
                  controlsList="nodownload"
                  preload="metadata"
                  playsInline
                  style={{
                    width: '540px',
                    height: '340px',
                    borderRadius: '12px',
                    objectFit: 'cover',
                    backgroundColor: '#000',
                  }}
                  onError={(e) => {
                    console.error('Video load error:', e, 'url:', videoUrl, 'type:', mimeType);
                  }}
                >
                  {/* HLS는 상단 useEffect가 처리. 기타 포맷은 source로 타입 힌트 */}
                  {!isHls && mimeType && <source src={videoUrl} type={mimeType} />}
                </video>
              ) : (
                <img
                  src="/images/user-video-thumbnail.png"
                  alt="user video"
                  style={{
                    width: '540px',
                    height: '340px',
                    borderRadius: '12px',
                    objectFit: 'cover',
                  }}
                />
              )}
            </div>

            <div style={{ flex: 1 }}>
              <h4 className="subtitle-18-bold primary" style={{ marginBottom: '8px' }}>
                질문 의도
              </h4>
              <p className="body-16-regular" style={{ marginBottom: '16px' }}>
                {cleanLabel(currentData?.intent)}
              </p>
              <h4 className="subtitle-18-bold primary" style={{ marginBottom: '8px' }}>
                답변 내용
              </h4>
              <p className="body-16-regular" style={{ whiteSpace: 'pre-line' }}>
                {cleanLabel(currentData?.answerText)}
              </p>
            </div>
          </div>

          <div
            className="answer-detail-section"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '24px',
              alignItems: 'stretch',
              marginBottom: '32px',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '0px', margin: '0px' }}>
              <div
                className="drop-shadow-large"
                style={{
                  background: 'white',
                  borderRadius: '16px',
                  padding: '32px 28px',
                  overflowY: 'auto',
                  border: 'none',
                }}
              >
                <h4 style={{ fontSize: '20px', marginTop: '0px', marginBottom: '40px' }}>답변 세부 분석 결과</h4>
                {(currentData?.evaluation ?? []).map((evalKey, idx) => (
                  <Accordion
                    key={idx}
                    disableGutters
                    elevation={0}
                    square={false}
                    style={{
                      borderRadius: '16px',
                      marginBottom: '12px',
                      overflow: 'hidden',
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ChevronDownIcon style={{ color: 'var(--primary-20)', height: '20px' }} />}
                      className="subtitle-16-semibold"
                      style={{ backgroundColor: '#f0f6ff', padding: '8px 16px' }}
                    >
                      {ACCORDION_CONTENTS[evalKey]?.title ?? evalKey}
                    </AccordionSummary>
                    <AccordionDetails
                      className="body-16-regular"
                      style={{ padding: '12px 16px', backgroundColor: 'var(--nuetral-20)' }}
                    >
                      {ACCORDION_CONTENTS[evalKey]?.detail ?? ''}
                    </AccordionDetails>
                  </Accordion>
                ))}
              </div>

              <div
                className="drop-shadow-large"
                style={{
                  background: 'white',
                  borderRadius: '16px',
                  padding: '32px 28px',
                  border: 'none',
                }}
              >
                <h4 style={{ fontSize: '20px', marginTop: '0px', marginBottom: '40px' }}>답변 총평</h4>
                <p className="body-16-regular">{currentData?.summary ?? ''}</p>
              </div>
            </div>

            <div
              className="feedback-box drop-shadow-large"
              style={{
                position: 'relative',
                backgroundColor: 'white',
                borderRadius: '16px',
                padding: '0',
                display: 'flex',
                flexDirection: 'column',
                overflowY: 'visible',
              }}
            >
              <div
                style={{
                  backgroundColor: '#4D8EFF',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'flex-end',
                  padding: '12px 24px',
                  height: '80px',
                  overflowY: 'visible',
                  borderRadius: '16px 16px 0px 0px  ',
                }}
              >
                <img
                  src="/thumb-feedback.png"
                  alt="thumbs up"
                  style={{
                    position: 'absolute',
                    height: '120px',
                    width: 'auto',
                    marginRight: '16px',
                    bottom: '0px',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    height: 'auto',
                    top: '16px',
                    right: '28px',
                    textAlign: 'end',
                    padding: '0px',
                  }}
                >
                  <h4 className="subtitle-18-bold" style={{ color: 'white', marginBottom: '4px', marginTop: '4px' }}>
                    이렇게 답변하면 좋아요!
                  </h4>
                  <p className="body-16-regular" style={{ color: '#d9e7ff', marginTop: '0px' }}>
                    전공과 연관된 단어를 추가해 답변을 개선했어요
                  </p>
                </div>
              </div>

              <div style={{ padding: '32px 28px' }}>
                <span className="body-16-regular" style={{ lineHeight: '1.6', color: '#333' }}>
                  {(currentData?.goodExample?.startsWith?.('"') && currentData?.goodExample?.endsWith?.('"'))
                    ? currentData.goodExample.slice(1, -1)
                    : (currentData?.goodExample ?? '')}
                </span>
              </div>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '24px',
              gap: '12px',
            }}
          >
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '24px',
                color: '#888',
                cursor: page === 1 ? 'default' : 'pointer',
              }}
            >
              &#8249;
            </button>
            <span style={{ fontSize: '18px', color: '#888' }}>
              {page} / {answerList.length}
            </span>
            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, answerList.length))}
              disabled={page === answerList.length}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '24px',
                color: '#888',
                cursor: page === answerList.length ? 'default' : 'pointer',
              }}
            >
              &#8250;
            </button>
          </div>

          <ButtonPair
            leftText="전달력 분석 결과 보러가기"
            rightText="나가기"
            onLeftClick={() => navigateAndScrollTop(`${PATH.REPORT_DELIVERY}?interviewId=${interviewId}`)}
            onRightClick={() => navigateAndScrollTop(PATH.HOME)}
          />
        </div>
      )}
      <Footer />
    </Container>
  );
};

export default ReportAnswer;
