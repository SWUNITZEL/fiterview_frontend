import React from 'react';
import './Answer.css';
import { answerData } from '../../types/props';

const Answer = () => {
  return (
    <div className="answer-container">
      <p className="caption-14-regular timestamp">
        ○○대학교 모의면접 결과 (2025-03-15 21:25:41)
      </p>
      <p className="caption-14-regular download-link">PDF로 다운 받기</p>

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

      <div className="pagination-button-wrap">
        <button className="secondary-button">전달력 분석 결과 보러가기</button>
        <button className="primary-button">비교 분석 결과 보러가기</button>
      </div>
    </div>
  );
};

export default Answer;
