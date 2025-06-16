import { useEffect, useState } from 'react';
import { getReportDelivery } from '../api/report';

const useReportDelivery = (interviewId) => {
  const [deliveryData, setDeliveryData] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!interviewId) return; // 인터뷰 ID 없으면 실행 안함

    const fetchDelivery = async () => {
      try {
        const result = await getReportDelivery(interviewId);
        console.error('전달력 분석 정보 받아오기 성공:', result.result);
        setDeliveryData(result.result);
      } catch (err) {
        console.error('전달력 분석 정보 받아오기 실패:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDelivery();
  }, [interviewId]);

  return { deliveryData: deliveryData, loading, error };
};

export default useReportDelivery;

