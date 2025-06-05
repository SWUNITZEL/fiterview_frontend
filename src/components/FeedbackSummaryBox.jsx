import React from 'react';
import {
  BarChart, XAxis, YAxis, Tooltip, Bar, Cell, LabelList, ReferenceLine
} from 'recharts';

const getFeedback = (category, value) => {
    if (category === 'pronunciation') {
        if (value >= 90) return { label: '장점', comment: '또박또박 잘 전달했어요.' };
        if (value >= 80) return { label: '개선점', comment: '또박또박 전달하는 연습이 필요해요.' };
        return { label: '개선점', comment: '전달력이 좋지 않아요. 발음 연습이 많이 필요해요.' };
    }

    else if (category === 'tone') {
        const { hz, std } = value;
        if (hz <= 220 && hz >= 160) return { label: '장점', comment: '음역대가 또렷하고 안정적입니다.' };
        if (hz > 220 && std <= 55) return { label: '장점', comment: '다소 높은 톤이지만 안정적으로 들립니다.' };
        if (hz < 160) return { label: '개선점', comment: '음성이 다소 단조롭게 들릴 수 있습니다.' };
        if (hz > 220 && std <= 45) return { label: '개선점', comment: '톤이 높고 변화가 적어 단조롭거나 부자연스럽게 들릴 수 있습니다.' };
        if (hz > 250 && std > 700) return { label: '개선점', comment: '높은 음역과 변화가 많아 산만하게 들릴 수 있습니다.' };
    }

    else if (category === 'speed') {
        return value < 65
        ? { label: '장점', comment: '발화 속도가 일정합니다.' }
        : { label: '개선점', comment: '발화 속도가 빠릅니다.' };
    }

    else if (category === 'posture') {
        return value >= 60
            ? { label: '장점', comment: '자세를 안정적으로 유지했습니다.' }
            : { label: '개선점', comment: '자세가 불안정하여 개선이 필요합니다.' };
        }
    else if (category === 'eye') {
        return value >= 60
            ? { label: '장점', comment: '시선이 적절하게 분산되어 자연스러웠습니다.' }
            : { label: '개선점', comment: '시선의 집중도가 낮아 개선이 필요합니다.' };
        }
    else if (category === 'gesture') {
        return value >= 60
            ? { label: '장점', comment: '적절한 제스처로 전달력이 향상되었습니다.' }
            : { label: '개선점', comment: '제스처가 부족하거나 부자연스러웠습니다.' };
        }
};

const FeedbackSummaryBox = ({ title, category, myScore, average }) => {
  const feedback = getFeedback(category, myScore);
  const scoreValue = category === 'tone' ? myScore.hz : myScore;

  const data = [
    { name: '응시자 평균', score: average },
    { name: '내 점수', score: scoreValue },
  ];

  const isAboveAverage = scoreValue > average;
  const barColor = isAboveAverage ? 'var(--success-40)' : 'var(--warning-40)';

  return (
    <div
      style={{
        padding: '32px 40px',
        background: 'white',
        borderRadius: '16px',
        flex: '1',
      }}
      className="drop-shadow-large"
    >
      <h3 style={{ fontSize: '20px', margin:"0", padding:"0" }}>
        {title}{' '}
        <span style={{ color: barColor }}>
          {isAboveAverage ? '평균 이상' : '평균 이하'}
        </span>
      </h3>
      <div style={{ width: 200, margin: '0 auto' }}>
        <BarChart
          data={data}
          layout="horizontal"
          margin={{ top: 20, right: 0, bottom: 0, left: 0 }}
          width={200}
          height={170}
        >
          <XAxis
            type="category"
            dataKey="name"
            // height={0}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 14 }}
            interval={0}
          />
          <YAxis
            type="number"
            domain={[0, Math.max(average, scoreValue) + 20]}
            width={0}
            axisLine={false}
            tickLine={false}
            tick={false}
          />
          <Tooltip />
          <ReferenceLine y={average} stroke="var(--nuetral-50)" strokeDasharray="6 4" strokeWidth={2}/>
          <Bar dataKey="score" barSize={60} radius={[10, 10, 0, 0]}>
            <LabelList dataKey="score" position="top" />
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  entry.name === '응시자 평균'
                    ? 'var(--nuetral-40)'
                    : barColor
                }
              />
            ))}
          </Bar>
        </BarChart>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '24px',
        }}
      >
        <span
          style={{
            backgroundColor: barColor,
            whiteSpace: 'nowrap',
            color: 'white',
            height: 'fit-content',
            fontSize: '14px',
            padding: '1px 8px',
            borderRadius: '8px',
          }}
        >
          {feedback.label}
        </span>
        <p
          style={{
            marginTop: '0px',         
            marginBottom: '0px',         
            marginLeft: '8px',
            fontSize: '16px',
            fontWeight: '400',
          }}
        >
          {feedback.comment}
        </p>
      </div>
    </div>
  );
};

export default FeedbackSummaryBox;
