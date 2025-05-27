import PropTypes from 'prop-types';

export const AverageDataByCategoryPropType = PropTypes.objectOf(
  PropTypes.arrayOf(PropTypes.number)
);

export const PostUploadContentsPropTypes = {
  userName: PropTypes.string.isRequired,
  averageDataByCategory: AverageDataByCategoryPropType.isRequired,
};

//nonverbal 페이지
export const analysisData = {
  totalScore: 58,
  posture: {
    score: 58,
    average: 56,
    detail: '흔들림 비율은 35%로 자세를 바르게 유지하고 있습니다. 이대로 유지하세요.'
  },
  eyes: {
    score: 70,
    average: 64,
    blinkRate: 28,
    detail: '시선 분포가 중앙으로부터 45% 흩어져 시선 처리가 좋습니다. 이대로만 준비하세요.'
  },
  shoulder: {
    score: 72,
    average: 60,
    movementRatio: 12,
    detail: '어깨 움직임은 다음과 같이 나타났습니다. 어깨의 수평을 맞춰 정적인 자세를 유지하도록 연습한다면 면접관이 답변에 더 집중할 수 있습니다.'
  }
};

//Delivery 페이지
export const deliveryData = {
  totalScore: 58,
  pronunciation: {
    score: 90,
    average: 85,
    detail: "'어', '그' 와 같은 발음을 연습해보세요."
  },
  tone: {
    hz: 260.7,
    std: 48,
    average: 220.3,
    detail: "목소리 톤이 260.7Hz로 평균값 220.3Hz보다 높습니다. 높은 목소리는 안정감과 신뢰감을 주기 어려움으로 톤을 낮추는 연습이 필요합니다."
  },
  speed: {
    score: 68,
    average: 64,
    detail: "말하는 속도가 다른 사용자보다 빠른 편입니다. 속도를 늦추는 연습이 필요합니다."
  },
  wordHabit: {
    detail: '문장 앞에 해당 어휘를 반복적으로 사용했어요. 습관적인 어휘 사용을 줄이기 위해 다음 문장을 얘기하기 전 한 템포 쉬고 얘기해보세요.'
  }
};

//Answer 페이지
export const answerData = {
  question: '자기소개 해주세요.',
  intent: '또박또박 잘 전달했어요.',
  answerText: `저는 학교 프로젝트뿐 아니라 방과 후 시간에 다양한 협업에서의 역할을 경험했습니다...`,
  evaluation: [
    {
      title: '답변이 맥락과 일치해요',
      detail: '지원자의 경험과 질문의 의도가 잘 맞고 구체적입니다.'
    },
    {
      title: '두괄식으로 말하는 연습이 필요해요',
      detail: '전반적인 맥락은 좋으나, 결론 제시와 핵심 전달이 다소 아쉬워요.'
    },
    {
      title: '답변의 길이 좋아요',
      detail: '00대학교 면접은 약 ○○○자의 답변을 권장해요.'
    }
  ],
  summary: '질문에 정확한 정보를 함께 언급해 구체적이고 믿음직한 인상을 주었습니다.',
  goodExample: `지금까지 학교 프로젝트를 통해 수십 명의 기획과 협업하며 이벤트를 진행했습니다...`
};

//Compare 페이지
export const compareData = {
  previousScore: 630,
  currentScore: 840,
  summary: '지난 면접보다 전달력 연습이 낮게 나왔어요. 하지만 전반적으로 STT 정확도와 발화 음역대가 향상되며 좋은 결과를 보여줬습니다.',
  radarData: [
    { category: '커뮤니케이션 능력', previous: 40, current: 65 },
    { category: '전문성', previous: 50, current: 80 },
    { category: '집중도', previous: 45, current: 68 },
    { category: '문제해결력', previous: 38, current: 74 },
    { category: '인성 및 태도', previous: 60, current: 85 },
  ],
  nonverbalComparison: [
    { name: '표정', previous: 43, current: 58 },
    { name: '자세', previous: 43, current: 58 },
    { name: '제스처', previous: 43, current: 58 },
  ],
  deliveryComparison: [
    { name: '발음', previous: 43, current: 58 },
    { name: '톤', previous: 43, current: 58 },
    { name: '속도', previous: 43, current: 58 },
  ],
  previousSummary: '목소리 톤이 360.7Hz로 평균보다 높습니다. 높은 톤은 신뢰감을 줄 수 없어 음역대를 낮추는 연습이 필요합니다.',
  currentSummary: '문장 앞에 “어떤”, “그”라는 어휘를 반복적으로 사용했어요. 다음 문장을 말하기 전에 템포를 쉬고 이어가면 좋아요.'
}; 