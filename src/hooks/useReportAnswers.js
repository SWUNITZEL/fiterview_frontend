import { useEffect, useState } from 'react';
import { getReportAnswers } from '../api/report';

const useReportAnswers = (interviewId) => {
  const [answerList, setAnswerList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!interviewId) return; // 인터뷰 ID 없으면 실행 안함

    const fetchAnswers = async () => {
      try {
        const result = await getReportAnswers(interviewId);
        console.error('답변 분석 정보 받아오기 성공:', result);
        console.error('답변 분석 정보 받아오기 성공:', result.report);
        setAnswerList(result.report);
      } catch (err) {
        console.error('답변 분석 정보 받아오기 실패:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnswers();
  }, [interviewId]);

  return { answerList, loading, error };
};

export default useReportAnswers;
