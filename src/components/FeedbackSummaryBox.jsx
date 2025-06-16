import {
  BarChart, XAxis, YAxis, Tooltip, Bar, Cell, LabelList, ReferenceLine
} from 'recharts';
import { FEEDBACK_RULES } from "../data/report"

const getFeedback = (category, value) => {
    const rules = FEEDBACK_RULES[category];
    if (!rules) return { label: '', comment: '' };

    return rules.find(rule => rule.condition(value)) || { label: '', comment: '' };
};

export default function FeedbackSummaryBox({ title, category, myScore, average }) {
  const feedback = getFeedback(category, myScore);
  const scoreValue = category === 'tone' ? myScore : myScore;

  const data = [
    { name: '응시자 평균', score: average },
    { name: '내 점수', score: scoreValue },
  ];

  const isBetterThanAverage = (category === "blink")? (scoreValue < average): (scoreValue > average);
  const barColor = isBetterThanAverage ? 'var(--success-40)' : 'var(--warning-40)';

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
          {(category === "blink")&&isBetterThanAverage ? '평균 이하': (category === "blink")||((category !== "blink")&&isBetterThanAverage) ?'평균 이상' : '평균 이하'}
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
          <Tooltip cursor={{ fill: 'transparent' }} />
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
