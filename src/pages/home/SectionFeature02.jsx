import { CheckCircleIcon  } from "@heroicons/react/24/solid";

export default function SectionPersona() {
  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "var(--background-color)",
        padding: "60px 20px",
        textAlign: "center",
      }}
    >
      <h2 style={{ fontSize: "40px", marginBottom: "10px", color: "var(--primary-60)" }}>
        다양한 면접관 페르소나
      </h2>
      <p style={{ fontSize: "18px", marginTop:"0px", marginBottom: "30px", color: "var(--nuetral-60)" }}>
        AI와 면접의 고난이도를 단계별로! <br />
        어떤 면접관을 만나도 당황하지 않도록, 면접을 체감해 보세요.
      </p>

      <div style={{ textAlign: "left", width: "fit-content", margin: "0 auto" }}>
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            marginTop: "48px",
            marginBottom: "96px",
            width: "fit-content",
            display:"flex",
            flexDirection:"column",
            gap:"24px"
          }}
        >
          <FeatureItem
            icon={<CheckCircleIcon style={{ height: "20px", marginRight:"10px", color:"var(--primary-60)" }} />}
            text=" 실제 면접 스타일과 유사한 환경 제공"
          />
          <FeatureItem
            icon={<CheckCircleIcon style={{ height: "20px", marginRight:"10px", color:"var(--primary-60)" }} />}
            text=" 면접관 성향에 대비 가능 – 논리형, 압박형, 칭찬형 등"
          />
          <FeatureItem
            icon={<CheckCircleIcon style={{ height: "20px", marginRight:"10px", color:"var(--primary-60)" }} />}
            text=" 다양한 대화 맥락 경험을 통해 면접 실력 향상"
          />
        </ul>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          // gap: "20px",
          alignItems: "center",
          marginBottom: "96px",
        }}
      >
        <PersonaChat1
          imgSrc="/images/home/personas/persona1.png"
          text="이 개념을 다시 설명해보세요. 본인이 이해한 방식이 있을까요?"
        />
        <PersonaChat2
          imgSrc="/images/home/personas/persona2.png"
          text="좋아요, 그렇다면 이런 상황에서는 어떻게 대답하시겠어요?"
        />
        <PersonaChat1
          imgSrc="/images/home/personas/persona3.png"
          text="글쎄요? 그렇게 생각한 이유가 있나요?"
        />
        <PersonaChat2
          imgSrc="/images/home/personas/persona4.png"
          text="이 문제를 새로운 시각에서 접근해본다면 어떤 해결책이 있을까요?"
        />
      </div>

      <p className="subtitle-20-medium" style={{ color: "var(--primary-60)" }}>
        AI 면접관의 다양한 성격과 질문 스타일을 시뮬 구동! <br />
        논리적인 교수부터 까다로운 교수까지, 실제 면접장에서 마주할 수 있는 면접관들을 경험해보세요.
      </p>
    </div>
  );
}

function FeatureItem({ icon, text }) {
  return (
    <li
      className="subtitle-20-semibold"
      style={{
        marginBottom: "10px",
        width: "fit-content",
        display: "inline-flex",
        alignItems: "center",
      }}
    >
      {icon}
      {text}
    </li>
  );
}


function PersonaChat1({ imgSrc, text }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        color: "#000",
        borderRadius: "16px",
        padding: "20px",
        maxWidth: "calc(100% - 480px)",
        width: "100%",
      }}
    >
      <img
        src={imgSrc}
        alt="Persona"
        style={{ width: "70px", height: "70px", borderRadius: "50%", marginRight: "20px" }}
      />
      <div className="yours">
        <div className="message last">
         <p style={{ margin: "8px 20px", fontSize: "20px", lineHeight: "1.5" }}>{text}</p>
        </div>
      </div>
      
    </div>
  );
}

function PersonaChat2({ imgSrc, text }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        color: "#000",
        borderRadius: "16px",
        padding: "20px",
        maxWidth: "calc(100% - 480px)",
        width: "100%",
      }}
    >
      
      <div className="mine">
        <div className="message last">
         <p style={{ margin: "8px 20px", fontSize: "20px", lineHeight: "1.5" }}>{text}</p>
        </div>
      </div>
      <img
        src={imgSrc}
        alt="Persona"
        style={{ width: "70px", height: "70px", borderRadius: "50%", marginLeft: "20px" }}
      />
    </div>
  );
}