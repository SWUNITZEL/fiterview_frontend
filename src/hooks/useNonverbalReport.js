import { useEffect, useState } from 'react';

export const useNonverbalReport = (interviewId) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // 실제 API 연결 시 fetchNonverbalReport(interviewId) 사용 예정
    setTimeout(() => {
      setData({
        totalScore: 58,
        posture: {
          score: 58,
          average: 56,
          detail: '자세 변화가 일정하게 유지됐으며 어려움 상황에도 상체의 흔들림이 줄어들도록 의식하는 훈련이 필요해요.',
        },
        eyes: {
          score: 58,
          average: 64,
          blinkRate: 32,
          detail: '눈 깜빡임이 비교적 자주 나타났습니다. 시선 집중을 유지하도록 연습해보세요.',
        },
        shoulder: {
          score: 58,
          average: 43,
          movementRatio: 12,
          detail: '어깨 움직임이 적절하며 안정적인 자세를 유지하셨습니다.',
        },
      });
    }, 500); // 더미 데이터 시뮬레이션
  }, [interviewId]);

  return { data };
};
