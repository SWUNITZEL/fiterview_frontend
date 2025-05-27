import './ReportAnswer.css';
import NavbarComponent from '../../components/Navbar'
import ReportHeader from './ReportHeader';
import ButtonPair from './buttonPair';
import { Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { usePdfDownload } from '../../hooks/usePdfDownload';
import { PATH } from "../../data/paths";

const ReportAnswer = () => {
  const navigate = useNavigate();
  const { pageRef, handleDownload } = usePdfDownload('answer_report.pdf');

  const answerData = {
  question: "자신의 강점은 무엇인가요?",
  intent: "지원자의 자기 인식과 강점, 이를 활용한 경험을 파악하기 위함입니다.",
  answerText: "저의 강점은 문제 해결 능력입니다. 예를 들어, 팀 프로젝트에서 발생한 갈등을 중재하며 최종 목표에 집중할 수 있도록 조율한 경험이 있습니다.",
  evaluation: [
    {
      title: "구체성",
      detail: "경험 사례가 비교적 구체적이지만, 추가적인 수치나 결과가 있으면 더 좋습니다."
    },
    {
      title: "논리성",
      detail: "질문 의도에 맞게 강점과 사례를 연결했으며, 전반적으로 논리적인 흐름을 보였습니다."
    },
    {
      title: "자신감",
      detail: "목소리 톤과 표정에서 자신감이 느껴졌으나, 제스처를 조금 더 활용하면 좋겠습니다."
    }
  ],
  goodExample: "강점을 설명할 때 단순한 나열보다는 구체적인 행동과 결과를 강조하면 면접관에게 더 강한 인상을 줄 수 있습니다.",
  summary: "전반적으로 강점을 잘 설명했으며, 실제 사례로 설득력을 높였습니다. 다만, 사례의 구체성과 표현력에서 약간의 개선 여지가 보입니다."
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
        reportTitle = "답변 구성 분석 결과"
        timestamp="2025-03-15 21:25:41" 
        onDownload={handleDownload}
        ></ReportHeader>
      <div className="answer-container">
        

        <h2 className="title-24-bold question">Q1. <span className="primary">{answerData.question}</span></h2>

        <div className="answer-visual-box drop-shadow-medium">
          <div className="video-box">[영상 placeholder 또는 영상 컴포넌트]</div>
          <div className="question-intent">
            <h3 className="subtitle-18-bold">질문 의도</h3>
            <p className="body-14-regular">{answerData.intent}</p>
            <h3 className="subtitle-18-bold">답변 내용</h3>
            <p className="body-14-regular">{answerData.answerText}</p>
          </div>
        </div>

        <div className="answer-detail-section">
          <div className="analysis-box">
            <h4 className="subtitle-18-bold">답변 세부 분석 결과</h4>
            <ul className="accordion-list">
              {answerData.evaluation.map((item, idx) => (
                <li key={idx} className="accordion-item">
                  <button className="accordion-title subtitle-16-semibold">{item.title}</button>
                  <p className="accordion-detail body-14-regular">{item.detail}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="feedback-box drop-shadow-medium">
            <img className="emoji" src="/icons/thumb-up.png" alt="thumbs up" />
            <h4 className="subtitle-18-bold primary">이렇게 답변하면 좋아요!</h4>
            <p className="body-14-regular">{answerData.goodExample}</p>
          </div>
        </div>

        <div className="answer-summary-box drop-shadow-medium">
          <h4 className="subtitle-18-bold">답변 총평</h4>
          <p className="body-14-regular">{answerData.summary}</p>
        </div>

        <ButtonPair 
        leftText="전달력 분석 결과 보러가기"
        rightText="비교 분석 결과 보러가기"
        onLeftClick={()=>{
          navigate(PATH.REPORT_DELIVERY)
          window.scrollTo(0,0)
        }}
        onRightClick={()=>{
          navigate(PATH.REPORT_COMPARE)
          window.scrollTo(0,0)
        }}
        />
      </div>
    </Container>
  );
};

export default ReportAnswer;
