/**
 * @file InterviewConfig.jsx
 * @description 면접 전 선택 페이지
 * @author 김하은
 * @created 2025-05-17
**/

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container } from "@mui/material";
import { PlusCircleIcon , MinusCircleIcon , ChevronRightIcon } from "@heroicons/react/24/outline";
import { universities } from "../../data/universities";
import NavbarComponent from '../../components/Navbar'
import "./InterviewConfig.css";
import { PATH } from "../../data/paths"

const InterviewConfig = () => {
  const navigate = useNavigate();

  const [university, setUniversity] = useState("");
  const [department, setDepartment] = useState("");
  const [interviewType, setInterviewType] = useState("document");
  const [questionCount, setQuestionCount] = useState(4);
  const [timeLimit, setTimeLimit] = useState(60);
  const [interviewDate, setInterviewDate] = useState("");

  const handleUniversityChange = (e) => {
    setUniversity(e.target.value);
    setDepartment("");
  };


 const handleSelectPersona = () => {
    if (
      university &&
      department &&
      interviewType &&
      questionCount &&
      timeLimit &&
      interviewDate
    ) {
      const queryParams = new URLSearchParams({
        university,
        department,
        interviewType,
        questionCount: questionCount.toString(),
        timeLimit: timeLimit.toString(),
        interviewDate,
      }).toString();

      navigate(`${PATH.INTERVIEW_CONFIG_PERSONA}?${queryParams}`);
    } else {
      alert("모든 항목을 입력해 주세요.");
    }
  }

  const selectedUniversity = universities.find((u) => u.name === university);

  return (
    <Container maxWidth={false}
      style={{
        backgroundColor: "var(--background-color)",
        minHeight: "100vh",
        padding: "0 0",
        overflow: "hidden"
      }}>
      <NavbarComponent />
      <div style={{display:"flex"}}>
      <div className="side-margin"></div>
      <main className="child-column-center content-box move-down">
        <h2 className="title-32-bold title-center" style={{marginTop: "80px", marginBottom: "96px", textAlign:"center"}}>면접 연습 전 아래 사항을 체크해 주세요!</h2>
        <div className="form-area child-column-left">
          <div className="dual-row same-line">
            <div className="form-group flex-grow">
              <label className="form-label">지원 학교</label>
              <select value={university} onChange={handleUniversityChange}>
                <option value="">선택해주세요</option>
                {universities.map((u) => (
                  <option key={u.id} value={u.name}>{u.name}</option>
                ))}
              </select>
            </div>

            <div className="form-group flex-grow">
              <label className="form-label">지원 학과</label>
              <select value={department} onChange={(e) => setDepartment(e.target.value)} disabled={!university}>
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
                <MinusCircleIcon style={{color:(questionCount>4)?"var(--primary-40)":"var(--nuetral-50)", width:"32px", height:"auto"}} onClick={() => (questionCount>4)?setQuestionCount((prev) => Math.max(1, prev - 1)):{}} />
                <span>{questionCount} 개</span>
                <PlusCircleIcon style={{color:"var(--primary-40)", width:"32px", height:"auto"}} onClick={() => setQuestionCount((prev) => prev + 1)} />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">답변 제한 시간</label>
              <div className="count-box">
                <MinusCircleIcon style={{color:(timeLimit>60)?"var(--primary-40)":"var(--nuetral-50)", width:"32px", height:"auto"}} onClick={() => (timeLimit>60)?setTimeLimit((prev) => Math.max(60, prev - 30)):{}}/>
                <span>{timeLimit} 초</span>
                <PlusCircleIcon style={{color:"var(--primary-40)", width:"32px", height:"auto"}} onClick={() => setTimeLimit((prev) => prev + 30)} />
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

          
        </div>
        <div className="form-group child-column-center" style={{marginTop:"96px"}}>
            <Button onClick={()=> handleSelectPersona()} variant="contained" className="start-button" endIcon={<ChevronRightIcon />}>
              면접관 선택하기
            </Button>
          </div>
      </main>
      <div className="side-margin"></div>
      </div>
    </Container>
  );
};

export default InterviewConfig;
