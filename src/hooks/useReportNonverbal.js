import { useEffect, useState } from 'react';
import { getReportNonverbal } from '../api/report';

const useReportNonverbal = (interviewId) => {
  const [nonverbalData, setNonverbalData] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!interviewId) return; // 인터뷰 ID 없으면 실행 안함

    const fetchNonverbal = async () => {
      try {
        const result = await getReportNonverbal(interviewId);
        console.error('신체언어 분석 정보 받아오기 성공:', result);
        setNonverbalData(result);
      } catch (err) {
        console.error('신체언어 분석 정보 받아오기 실패:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNonverbal();
  }, [interviewId]);

  return { nonverbalData: nonverbalData, loading, error };
};

export default useReportNonverbal;
