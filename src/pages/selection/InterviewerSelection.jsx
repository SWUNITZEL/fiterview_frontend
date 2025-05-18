/**
 * @file InterviewerSelection.jsx
 * @description 면접 전 선택 페이지
 * @author 김하은
 * @created 2025-05-17
**/

import React, { useState } from "react";
import { Button } from "@mui/material";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { universities } from "../../data/universities";
import "./InterviewerSelection.css";

const InterviewerSelection = () => {
  const [school, setSchool] = useState("");
  const [department, setDepartment] = useState("");
  const [interviewType, setInterviewType] = useState("document");
  const [questionCount, setQuestionCount] = useState(1);
  const [timeLimit, setTimeLimit] = useState(4);
  const [interviewDate, setInterviewDate] = useState("");

  const handleSchoolChange = (e) => {
    setSchool(e.target.value);
    setDepartment("");
  };

  const selectedUniversity = universities.find((u) => u.name === school);

  return (
    <div className="interview-page-wrapper">
      <header className="logo-header">
        <img src="/logo-placeholder.png" alt="로고" className="logo-img" />
        <div className="header-right">
          <span className="login-placeholder">AI 모의면접</span>
          <div className="avatar-placeholder"></div>
        </div>
      </header>

      <main className="child-column-center content-box move-down">
        <h2 className="title-32-bold title-center">면접 연습 전 아래 사항을 체크해 주세요!</h2>

        <div className="form-area child-column-left">
          <div className="dual-row same-line">
            <div className="form-group flex-grow">
              <label className="form-label">지원 학교</label>
              <select value={school} onChange={handleSchoolChange}>
                <option value="">선택해주세요</option>
                {universities.map((u) => (
                  <option key={u.id} value={u.name}>{u.name}</option>
                ))}
              </select>
            </div>

            <div className="form-group flex-grow">
              <label className="form-label">지원 학과</label>
              <select value={department} onChange={(e) => setDepartment(e.target.value)} disabled={!school}>
                <option value="">선택해주세요</option>
                {selectedUniversity &&
                  selectedUniversity.departments.map((d, i) => (
                    <option key={i} value={d}>{d}</option>
                  ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">면접 종류</label>
            <div className="radio-column">
              <label>
                <input
                  type="radio"
                  checked={interviewType === "document"}
                  onChange={() => setInterviewType("document")}
                />
                서류 기반 면접
              </label>
              <label>
                <input
                  type="radio"
                  checked={interviewType === "knowledge"}
                  onChange={() => setInterviewType("knowledge")}
                />
                제시문 기반 면접
              </label>
            </div>
          </div>

          <div className="dual-row">
            <div className="form-group">
              <label className="form-label">질문 개수</label>
              <div className="count-box">
                <button onClick={() => setQuestionCount((prev) => Math.max(1, prev - 1))}>-</button>
                <span>{questionCount} 개</span>
                <button onClick={() => setQuestionCount((prev) => prev + 1)}>+</button>
              </div>
            </div>

            <div className="form-group align-right">
              <label className="form-label">답변 제한 시간</label>
              <div className="count-box">
                <button onClick={() => setTimeLimit((prev) => Math.max(1, prev - 1))}>-</button>
                <span>{timeLimit} 분</span>
                <button onClick={() => setTimeLimit((prev) => prev + 1)}>+</button>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">면접일</label>
            <input
              className="date-input"
              type="date"
              value={interviewDate}
              onChange={(e) => setInterviewDate(e.target.value)}
            />
          </div>

          <div className="form-group center-horizontal">
            <Button variant="contained" className="start-button" endIcon={<ChevronRightIcon />}>
              면접관 선택하기
            </Button>
          </div>
        </div>
      </main>

      <div className="divider-line"></div>

      <footer className="footer-area">
        <hr className="footer-divider" />
        <div className="footer-info">
          <div className="footer-links">
            <span>슈니첼</span>
            <span>이용약관</span>
            <span className="highlight">개인정보처리방침</span>
            <span className="highlight">임시저장</span>
          </div>
          <div className="footer-desc">
            (주)슈니첼 | 사업자등록번호 000-00-00000 | 통신판매업 신고번호 2025-서울노원-2025<br />
            02-0000-0000 | official@swu | 서울특별시 노원구 화랑로 621 (슈니첼)<br />
            © SWU Corp. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default InterviewerSelection;
