export const FEEDBACK_RULES = {
  pronunciation: [
    { condition: (v) => v >= 90, label: '장점', comment: '또박또박 잘 전달했어요.' },
    { condition: (v) => v >= 80, label: '개선점', comment: '또박또박 전달하는 연습이 필요해요.' },
    { condition: () => true, label: '개선점', comment: '전달력이 좋지 않아요. 발음 연습이 많이 필요해요.' },
  ],
  tone: [
    { condition: ({ hz, std }) => hz <= 220 && hz >= 160, label: '장점', comment: '음역대가 또렷하고 안정적입니다.' },
    { condition: ({ hz, std }) => hz > 220 && std <= 55, label: '장점', comment: '다소 높은 톤이지만 안정적으로 들립니다.' },
    { condition: ({ hz }) => hz < 160, label: '개선점', comment: '음성이 다소 단조롭게 들릴 수 있습니다.' },
    { condition: ({ hz, std }) => hz > 220 && std <= 45, label: '개선점', comment: '톤이 높고 변화가 적어 단조롭거나 부자연스럽게 들릴 수 있습니다.' },
    { condition: ({ hz, std }) => hz > 250 && std > 700, label: '개선점', comment: '높은 음역과 변화가 많아 산만하게 들릴 수 있습니다.' },
  ],
  speed: [
    { condition: (v) => v < 65, label: '장점', comment: '발화 속도가 일정합니다.' },
    { condition: () => true, label: '개선점', comment: '발화 속도가 빠릅니다.' },
  ],
  posture: [
    { condition: (v) => v >= 60, label: '장점', comment: '자세를 안정적으로 유지했습니다.' },
    { condition: () => true, label: '개선점', comment: '자세가 불안정하여 개선이 필요합니다.' },
  ],
  gaze: [
    { condition: (v) => v >= 60, label: '장점', comment: '시선이 적절하게 분산되어 자연스러웠습니다.' },
    { condition: () => true, label: '개선점', comment: '시선의 집중도가 낮아 개선이 필요합니다.' },
  ],
  blink: [
    { condition: (v) => v < 60, label: '장점', comment: '눈 깜빡임이 적당합니다.' },
    { condition: () => true, label: '개선점', comment: '눈 깜빡임이 잦습니다. 면접 전 이완 운동을 통해 긴장을 해소해보아요.' },
  ]
};
