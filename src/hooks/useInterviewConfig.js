import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PATH } from "../data/paths";
import { startInterview } from "../api/interview";

export const useInterviewConfig = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleStartInterview = async (university, department, questionCount, interviewDate) => {
    const payload = {
      university,
      department,
      questionCount,
      interviewDate,
      persona: [],
    };

    console.log("업데이트된 state:", payload);
    if (university==="" || !department==="" || questionCount==="" || interviewDate==="") {
      alert("모든 필드를 올바르게 입력해 주세요."); 
    }
    else{
      try {
        setIsLoading(true);
        const result = await startInterview(payload);

        console.log("서버 응답:", result);

        if (result.combineId) {
          navigate(`${PATH.INTERVIEW_SELF_CHECK}?combineId=${result.combineId}`);
        } else {
          alert("면접 ID를 받아올 수 없습니다.");
        }
      } catch (error) {
        console.error("면접 설정 저장 중 오류 발생:", error);
        alert("면접 시작 중 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return {
    isLoading,
    handleStartInterview,
  };
};
