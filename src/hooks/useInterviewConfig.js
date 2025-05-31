import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PATH } from "../data/paths";
import { startInterview } from "../api/interview";

export const useInterviewConfig = () => {
  const [selectedIds, setSelectedIds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const university = query.get("university");
  const department = query.get("department");
  const questionCount = parseInt(query.get("questionCount"));
  const interviewDate = query.get("interviewDate");

  const handleSelect = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      if (selectedIds.length < 2) {
        setSelectedIds([...selectedIds, id]);
      } else {
        alert("최대 2명까지 선택할 수 있습니다.");
      }
    }
  };

  const handleStartInterview = async () => {
    if (selectedIds.length === 0) {
      alert("면접관을 최소 1명 이상 선택해주세요.");
      return;
    }

    const payload = {
      university,
      department,
      questionCount,
      interviewDate,
      persona: selectedIds,
    };

    console.log("업데이트된 state:", payload);

    try {
      setIsLoading(true);
      const result = await startInterview(payload);

      console.log("서버 응답:", result);

      if (result.interviewId) {
        navigate(PATH.INTERVIEW_SELF_CHECK);
      } else {
        alert("면접 ID를 받아올 수 없습니다.");
      }
    } catch (error) {
      console.error("면접 설정 저장 중 오류 발생:", error);
      alert("면접 시작 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    selectedIds,
    isLoading,
    handleSelect,
    handleStartInterview,
  };
};
