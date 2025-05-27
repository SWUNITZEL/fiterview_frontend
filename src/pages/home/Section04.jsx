import { Button } from "@mui/material";

export default function Section04({onNavigate}) {
  const containerStyle = {
    padding: '120px 240px',
    backgroundColor: 'var(--background-color)',
    color: 'var(--font-body)'
  };

  const headingStyle = {
    textAlign: 'center',
    fontSize: '32px',
    marginTop: '0px',
    marginBottom: '100px',
    color: 'var(--primary-60)'
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>FITERVIEW 이용 방법 안내</h2>

      <StepCard
        step="01"
        title="생기부 업로드 및 면접관 선택"
        items={[
          '생기부를 업로드하면 AI가 자동으로 맞춤형 질문을 생성합니다.',
          '다양한 유형의 면접(논술형, 일반형, 심화형 등)을 선택할 수 있습니다.'
        ]}
        imageSrc="/images/home/how_to_use/step01.png"
      />

      <StepCard
        step="02"
        title="실전 모의 면접 진행"
        items={[
          '실제 면접처럼 음성/영상 기반으로 진행됩니다.',
          '면접관과의 대화 흐름을 통해 실전 감각을 익힙니다.'
        ]}
        imageSrc="/images/home/how_to_use/step02.png"
      />

      <StepCard
        step="03"
        title="AI 면접 분석 리포트 제공"
        items={[
          '답변의 논리성, 유창성, 태도 등을 AI가 분석합니다.',
          '부족한 부분을 보완할 수 있도록 맞춤형 피드백을 제공합니다.'
        ]}
        imageSrc="/images/home/how_to_use/step03.png"
      />
      <Button 
      onClick={()=>onNavigate()}
      sx={{
        marginLeft:"auto",
        marginRight:"auto",
        marginTop:"160px",
        marginBottom:"0px",
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10px',
        gap: '10px',
        width: '320px',
        height: '64px',
        color:"var(--background-color)",
        fontSize:"18px",
        fontWeight:500,
        backgroundColor: 'var(--primary-60)',
        borderRadius: '8px',
        '& .MuiButton-label': {
          fontWeight: 500,
        },
        '&:hover': {
          backgroundColor: 'var(--primary-80)',
        },
     }}>FITERVIEW 체험해보기</Button>
    </div>
  );
}

function StepCard({ step, title, items, imageSrc }) {
  const stepContainerStyle = {
    display: 'flex',
    alignItems: 'flex-start',
    marginTop: '60px'
  };

  const stepNumberWrapperStyle = {
    width: '120px',
    textAlign: 'center'
  };

  const stepCircleStyle = {
    width: '70px',
    height: '70px',
    borderRadius: '50%',
    backgroundColor: '#E5E9FF',
    color: 'var(--primary-60)',
    fontSize: '16px',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto',
    whiteSpace: 'pre-line'
  };

  const stepContentStyle = {
    flex: 1,
    marginLeft: '20px'
  };

  const stepTitleStyle = {
    fontSize: '18px',
    fontWeight: '700',
    marginTop: '0px',
    marginBottom: '0px'
  };

  const listStyle = {
    paddingLeft: '20px',
    marginTop: '0px',
    marginBottom: '0px'
  };

  const imageStyle = {
    marginLeft: '40px',
    width: '400px',
    borderRadius: '8px'
  };

  return (
    <div style={stepContainerStyle}>
      <div style={stepNumberWrapperStyle}>
        <div style={stepCircleStyle}>{`STEP\n${step}`}</div>
      </div>
      <div style={stepContentStyle}>
        <h3 style={stepTitleStyle}>{title}</h3>
        <ul style={listStyle}>
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
      <div style={imageStyle}>
        <img src={imageSrc} alt={`Step ${step}`} style={{ width: '100%' }} />
      </div>
    </div>
  );
}

