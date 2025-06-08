import { Container } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

import { useNavigateWithScrollTop } from '../../hooks/useNavigateWithScrollTop';
import { PATH } from '../../data/paths';
import { ACCORDION_CONTENTS } from '../../data/report';
import { usePdfDownload } from '../../hooks/usePdfDownload';

import NavbarComponent from '../../components/Navbar';
import ReportHeader from '../../components/ReportHeader';
import ButtonPair from '../../components/buttonPair';
import Footer from '../../components/Footer';

import './Report.css';

const answerList = [
  {
    question: "자기소개 해주세요.",
    intent: "답변자를 잘 파악하고 싶어요.",
    answerText: "저는 프로젝트 수업 중 팀 내 기획과 운영을 맡으며...",
    evaluation: [
      "1", "2", "3"
    ],
    goodExample: "지원자는 학교 프로젝트를 수행 중 외부 기관과 협업하여 이벤트를 진행하였다...",
    summary: "질 높은 답변은 정확한 정보와 함께 명확한 구조를 갖추고 있어 듣는 사람이 쉽게 이해하고 신뢰할 수 있습니다..."
  },
  {
    question: "지원동기는 무엇인가요?",
    intent: "답변자를 잘 파악하고 싶어요.",
    answerText: "저는 프로젝트 수업 중 팀 내 기획과 운영을 맡으며...",
    evaluation: [
      "1","2","3"
    ],
    goodExample: "지원자는 학교 프로젝트를 수행 중 외부 기관과 협업하여 이벤트를 진행하였다...",
    summary: "질 높은 답변은 정확한 정보와 함께 명확한 구조를 갖추고 있어 듣는 사람이 쉽게 이해하고 신뢰할 수 있습니다..."
  },
  {
    question: "더미질문",
    intent: "답변자를 잘 파악하고 싶어요.",
    answerText: "저는 프로젝트 수업 중 팀 내 기획과 운영을 맡으며...",
    evaluation: [
      "1","2","3"
    ],
    goodExample: "지원자는 학교 프로젝트를 수행 중 외부 기관과 협업하여 이벤트를 진행하였다...",
    summary: "질 높은 답변은 정확한 정보와 함께 명확한 구조를 갖추고 있어 듣는 사람이 쉽게 이해하고 신뢰할 수 있습니다..."
  },
  {
    question: "더미질문",
    intent: "답변자를 잘 파악하고 싶어요.",
    answerText: "저는 프로젝트 수업 중 팀 내 기획과 운영을 맡으며...",
    evaluation: [
      "1","2","3"
    ],
    goodExample: "지원자는 학교 프로젝트를 수행 중 외부 기관과 협업하여 이벤트를 진행하였다...",
    summary: "질 높은 답변은 정확한 정보와 함께 명확한 구조를 갖추고 있어 듣는 사람이 쉽게 이해하고 신뢰할 수 있습니다..."
  }
];

const ReportAnswer = () => {
  const navigateAndScrollTop = useNavigateWithScrollTop();
  const { pageRef, handleDownload } = usePdfDownload('answer_report.pdf');
  const [page, setPage] = useState(1);
  const currentData = answerList[page - 1];

  return (
    <Container
      ref={pageRef}
      maxWidth={false}
      style={{
        backgroundColor: "var(--background-color)",
        minHeight: "100vh",
        padding: "0",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <NavbarComponent />
      <ReportHeader
        interviewTitle="○○대학교 모의면접 결과"
        reportTitle="답변 구성 분석 결과"
        timestamp="2025-03-15 21:25:41"
        onDownload={handleDownload}
      />
      <div className="report-container">
        <h2 className="title-24-bold question">
          <span className="primary">Q{page}.</span> <span className="primary">{currentData.question}</span>
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
            border: 'none'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <span className="subtitle-18-bold" style={{ marginBottom: '16px' }}>
              질문 의도 & 사용자 답변
            </span>
            <img
              src="/images/user-video-thumbnail.png"
              alt="user video"
              style={{
                width: '540px',
                height: '340px',
                borderRadius: '12px',
                objectFit: 'cover'
              }}
            />
          </div>

          <div style={{ flex: 1 }}>
            <h4 className="subtitle-18-bold primary" style={{ marginBottom: '8px' }}>질문 의도</h4>
            <p className="body-14-regular" style={{ marginBottom: '16px' }}>{currentData.intent}</p>
            <h4 className="subtitle-18-bold primary" style={{ marginBottom: '8px' }}>답변 내용</h4>
            <p className="body-14-regular" style={{ whiteSpace: 'pre-line' }}>{currentData.answerText}</p>
          </div>
        </div>

        <div
          className="answer-detail-section"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '24px',
            alignItems: 'stretch',
            marginBottom: '32px'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding:"0px", margin:"0px" }}>
            <div
              className="drop-shadow-large"
              style={{
                background: "white",
                borderRadius: "16px",
                padding: "32px 28px",
                overflowY: "auto",
                border: 'none'
              }}
            >
              <h4 style={{fontSize:"20px",  marginTop:"0px",  marginBottom:"40px"}}>답변 세부 분석 결과</h4>
              {currentData.evaluation.map((evalKey, idx) => (
                <Accordion key={idx} disableGutters elevation={0} square={false}
                  style={{
                    // border: "1px solid #ddd",
                    borderRadius: "16px",
                    marginBottom: "12px",
                    overflow: "hidden",
                  }}>
                  <AccordionSummary
                    expandIcon={<ChevronDownIcon style={{color:"var(--primary-20)", height:"20px"}} />}
                    className="subtitle-16-semibold"
                    style={{ backgroundColor: '#f0f6ff', padding: '8px 16px' }}
                  >
                    {ACCORDION_CONTENTS[evalKey]["title"]}
                  </AccordionSummary>
                  <AccordionDetails className="body-14-regular" style={{ padding: '12px 16px', backgroundColor:"var(--nuetral-20)" }}>
                    {ACCORDION_CONTENTS[evalKey]["detail"]}
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
                border: 'none'
              }}
            >
              <h4 style={{fontSize:"20px",  marginTop:"0px",  marginBottom:"40px"}}>답변 총평</h4>
              <p className="body-14-regular">{currentData.summary}</p>
            </div>
          </div>

          <div
            className="feedback-box drop-shadow-large"
            style={{
              position:"relative",
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '0',
              display: 'flex',
              flexDirection: 'column',
              overflowY:"visible"
            }}
          >
            <div
              style={{
                backgroundColor: '#4D8EFF',
                position:"relative",
                display: 'flex',
                alignItems: 'flex-end',
                padding: '12px 24px',
                height: '80px',
                overflowY:"visible",
                borderRadius: "16px 16px 0px 0px  "
              }}
            >
              <img
                src="/thumb-feedback.png"
                alt="thumbs up"
                style={{
                  position:"absolute",
                  height: '120px',
                  width: 'auto',
                  marginRight: '16px',
                  // marginBottom: '-8px',
                  bottom:"0px"
                }}
              />
              <div
                style={{
                    position:"absolute",
                    // width: '150px',
                    height: 'auto',
                    top: "16px",
                    right:"28px",
                    textAlign:"end",
                    padding:"0px"
                  }}
              >
                <h4 className="subtitle-18-bold" style={{ color: 'white', marginBottom: '4px', marginTop:"4px" }}>
                  이렇게 답변하면 좋아요!
                </h4>
                <p className="body-14-regular" style={{ color: '#d9e7ff', marginTop:"0px" }}>
                  전공과 연관된 단어를 추가해 답변을 개선했어요
                </p>
              </div>
            </div>

            <div style={{ padding: '32px 28px' }}>
              <span className="body-14-regular" style={{ lineHeight: '1.6', color: '#333' }}>
                {currentData.goodExample}
              </span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '24px', gap: '12px' }}>
          <button
            onClick={() => setPage(prev => Math.max(prev - 1, 1))}
            disabled={page === 1}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              color: '#888',
              cursor: page === 1 ? 'default' : 'pointer'
            }}
          >
            &#8249;
          </button>
          <span style={{ fontSize: '18px', color: '#888' }}>
            {page} / {answerList.length}
          </span>
          <button
            onClick={() => setPage(prev => Math.min(prev + 1, answerList.length))}
            disabled={page === answerList.length}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              color: '#888',
              cursor: page === answerList.length ? 'default' : 'pointer'
            }}
          >
            &#8250;
          </button>
        </div>

        <ButtonPair
          leftText="전달력 분석 결과 보러가기"
          rightText="비교 분석 결과 보러가기"
          onLeftClick={() => navigateAndScrollTop(PATH.REPORT_DELIVERY)}
          onRightClick={() => navigateAndScrollTop(PATH.REPORT_COMPARE)}
        />
      </div>
      <Footer />
    </Container>
  );
};

export default ReportAnswer;
