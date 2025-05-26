/**
 * @file SectionIntro.jsx
 * @description 첫번째 섹션
 * @author 이찬우
**/

const buttonStyle = {
  width:"300px",
  padding: '20px 60px',
  border: 'none',
  borderRadius: '40px',
  background: '#E7EFFF',
  color: 'var(--primary-60)',
  textAlign:"center",
  fontSize:"18px",
  fontWeight:"500"
};

export default function SectionIntro() {
  return (
    <div className="center-both child-column-center" 
        style={{
            width:"100%", 
            minHeight:"100vh",
            backgroundColor: "var(--background-color)"}} >
      <img 
      src="/images/default/logo.png" 
      style={{ height: '36px', width: 'auto', marginBottom: '20px' }}
      />
      <p className="subtitle-18-regular" style={{ marginTop:"0px", marginBottom: '48px', textAlign: "center", color:"var(--nuetral-60)" }}>Ai 면접관과 함께하는 실전 면접 훈련
      <br />실제 대학 면접과 유사한 환경에서 맞춤형 질문을 받고, 즉각적인 피드백을 받아보세요</p>

      <div className="center-both child-column-center" style={{ gap: '24px', margin: '0 auto' }}>
        <div style={buttonStyle}>생기부 기반 맞춤 질문</div>
        <div style={buttonStyle}>다양한 성격의 면접관</div>
        <div style={buttonStyle}>AI 분석</div>
      </div>

      <p className="title-24-medium" style={{ marginTop: '64px'}}>이 모든걸 한 번에!</p>
    </div>
  );
}

