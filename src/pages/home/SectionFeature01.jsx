export default function SectionFeature01() {
  return (
    <div
      className="center-both child-column-center"
      style={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#E7EFFF",
        textAlign: "center",
      }}
    >
      <p
        className="subtitle-18-medium"
        style={{ marginTop:"0px",marginBottom: "0px", color:"var(--nuetral-60)" }}
      >
        면접 준비, 더 이상 고민하지 마세요.
      </p>
      <h2
        className="title-32-bold"
        style={{
          color: "var(--primary-60)",
          fontWeight: "bold",
          marginTop:"0px",
          marginBottom: "24px",
        }}
      >
        생기부 업로드 하면 나에게 맞는 질문이 생성!
      </h2>
      <p
        style={{
          maxWidth: "calc(100% - 480px)",
          margin: "0 auto 40px",
          fontSize: "18px",
          color: "var(--nuetral-70)",
          lineHeight: "1.6",
        }}
      >
        내 생기부를 업로드하면, AI가 지원자의 강점·활동·관심사를 분석해 맞춤형 질문과 피드백을 생성합니다.
        <br/>실제 면접에서 나올 법한 질문을 연습하고, 친구들이랑 비교해 있는 답변을 만들어보세요!
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        <FeatureCard
          iconSrc="/images/home/icons/Dictionary.png"
          title="자동 질문 생성"
          description={
            <>
              지원자의 생기부 내용을 분석하여<br />
              면접관의 질문을 만듭니다
            </>
          }
        />
        <FeatureCard
          iconSrc="/images/home/icons/DigitalLibrary.png"
          title="개인 맞춤 피드백"
          description={
            <>
              확인, 동의어, 약점 활동 등을 고려한<br />
              심층 피드백 제공
            </>
          }
        />
        <FeatureCard
          iconSrc="/images/home/icons/BookReturn.png"
          title="반복 연습 가능"
          description={
            <>
              다양한 각도의 AI 분석 질문으로<br />
              면접 최종 완성 향상
            </>
          }
        />
      </div>
    </div>
  );
}

function FeatureCard({ iconSrc, title, description }) {
  return (
    <div
      className="drop-shadow-medium"
      style={{
        backgroundColor: "var(--background-color)",
        borderRadius: "16px",
        padding: "30px 20px",
        width: "300px",
        textAlign: "center",
      }}
    >
      <img
        src={iconSrc}
        alt={title}
        style={{ height: "150px", width: "auto", marginBottom: "20px" }}
      />
      <h3
        style={{
          fontSize: "20px",
          fontWeight: "600",
          marginTop:"0px",
          marginBottom: "8px",
        }}
      >
        {title}
      </h3>
      <p style={{ marginTop:"0px", fontSize: "16px", color: "#666" }}>{description}</p>
    </div>
  );
}
