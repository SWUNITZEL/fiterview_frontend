/**
 * @file SectionIntro.jsx
 * @description 첫번째 섹션
 * @author 이찬우
**/

const buttonStyle = {
  width:"300px",
  padding: '8px 32px',
  border: '2px solid var(--primary-60)',
  borderRadius: '40px',
  background: 'var(--background-color)',
  color: 'var(--primary-60)',
  textAlign:"center",
  fontSize:"18px",
  fontWeight:"700"
};

export default function SectionIntro() {
  return (
    <div className="center-both child-column-center" 
        style={{
            width:"100%", 
            minHeight:"100vh",
            backgroundColor: "var(--background-color)"}} >
      <h2 className="title-32-bold" style={{marginBottom:"40px"}}>FITERVIEW</h2>
      <p className="body-16-medium" style={{ marginTop:"0px", marginBottom: '70px', textAlign: "center" }}>Ai 면접관과 함께하는 실전 면접 훈련
      <br />실제 대학 면접과 유사한 환경에서 맞춤형 질문을 받고, 즉각적인 피드백을 받아보세요</p>

      <div className="center-both child-column-center" style={{ gap: '5px', margin: '0 auto' }}>
        <div style={buttonStyle}>생기부 기반 맞춤 질문</div>
        <h2 className="title-24-bold" style={{ color: 'var(--primary-60)', textAlign:"center", margin:"0px"}}>+</h2>
        <div style={buttonStyle}>다양한 성격의 면접관</div>
        <h2 className="title-24-bold" style={{ color: 'var(--primary-60)', textAlign:"center", margin:"0px"}}>+</h2>
        <div style={buttonStyle}>AI 분석</div>
      </div>

      <p className="body-16-medium" style={{ marginTop: '40px'}}>이 모든걸 한 번에!</p>
    </div>
  );
}

