export default function AiReportSection() {
  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "#eaf1ff",
        padding: "60px 240px",
        boxSizing: "border-box",
        textAlign: "center",
      }}
    >
      <h2 style={{ fontSize: "28px", fontWeight: "700", color: "#2979ff", marginBottom: "10px" }}>
        AI 기반 면접 분석&면접 리포트 제공
      </h2>
      <p style={{ fontSize: "16px", color: "#333", marginBottom: "20px" }}>
        나의 강점과 약점을 데이터로 확인하세요!
      </p>
      <p style={{ fontSize: "14px", color: "#333", marginBottom: "10px" }}>
        면접 후 AI가 답변을 분석하여 논리성, 유창성, 설득력, 태도 등을 평가
      </p>
      <p style={{ fontSize: "14px", color: "#333", marginBottom: "10px" }}>
        최첨단 AI 기술을 활용하여 당신의 답변을 분석하고, 개선 방향을 제시
      </p>
      <p style={{ fontSize: "14px", color: "#333", marginBottom: "30px" }}>
        객관적인 데이터와 피드백을 통해 실력을 체계적으로 향상시킬 수 있습니다.
      </p>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: "20px",
        }}
      >
        <InfoBox text="문장 구조 및 핵심 메시지 전달력 분석" />
        <InfoBox text="개선이 필요한 부분에 대한 구체적인 조언 제공" />
        <InfoBox text="AI 음성 분석: 발음, 속도, 어조 등 피드백 제공" />
        <InfoBox text="답변의 일관성과 논리성 평가" />
        <InfoBox text="실전 대비를 위한 피드백과 연습 가이드 제공" />
        <InfoBox text="답변의 논리성, 설득력, 유창성 등 항목별 점수 분석" />
      </div>
    </div>
  );
}

function InfoBox({ text }) {
  return (
    <div
      style={{
        flex: "1 1 calc(50% - 10px)",
        backgroundColor: "#fff",
        borderRadius: "12px",
        padding: "20px",
        fontSize: "14px",
        color: "#333",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        boxSizing: "border-box",
      }}
    >
      {text}
    </div>
  );
}
