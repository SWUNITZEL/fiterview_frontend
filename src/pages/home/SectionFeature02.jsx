export default function SectionFeature02() {
  return (
    <div className="center-both child-column-center" 
        style={{
            width:"100%", 
            minHeight:"100vh",
            backgroundColor: "var(--background-color)",
          textAlign: 'center'}} >
      <h2
        style={{
          fontSize: '28px',
          fontWeight: 'bold',
          marginBottom: '10px',
        }}
      >
        다양한 면접관 페르소나
      </h2>
      <p
        style={{
          fontSize: '16px',
          marginBottom: '30px',
          color: '#555',
        }}
      >
        어떤 유형의 교수님과 마주하게 될지 모르겠죠?
        <br />
        어떤 면접관을 만나도 당황하지 않는, 준비된 지원자가 되세요.
      </p>

      <ul
        style={{
          listStyle: 'none',
          padding: 0,
          marginBottom: '40px',
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          flexWrap: 'wrap',
        }}
      >
        {['실제 면접 스타일과 유사한 환경 제공', '면접관 성향별 대비 가능 – 논리형, 압박형, 친절형 등', '다양한 대화 흐름 경험을 통한 면접 실력 향상'].map((text, index) => (
          <li
            key={index}
            style={{
              backgroundColor: '#f0f0f0',
              padding: '10px 20px',
              borderRadius: '20px',
              fontSize: '14px',
            }}
          >
            {text}
          </li>
        ))}
      </ul>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '40px',
        }}
      >
        {[
          { label: '철저한 논리형 교수', text: '이 개념을 다시 설명해보세요. 본인이 어떤 방식이 맞을까요?' },
          { label: '부드러운 격려형 교수', text: '좋아요. 그런데 이런 상황에서는 어떻게 대답하시겠어요?' },
          { label: '압박 면접형 교수', text: '이 문제를 새로운 시각에서 접근해본다면 어떤 해법이 있을까요?' },
          { label: '정리형 사교형 교수', text: '이 문제를 새로운 시각에서 접근해본다면 어떤 해결책이 있을까요?' },
        ].map((prof, index) => (
          <div
            key={index}
            style={{
              width: '200px',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                width: '100px',
                height: '100px',
                backgroundColor: '#ddd',
                borderRadius: '50%',
                margin: '0 auto 10px',
              }}
            >
              {/* 여기에 3D 캐릭터 이미지가 들어갑니다 (실제 앱에서는 <img>로 대체) */}
            </div>
            <p
              style={{
                fontWeight: 'bold',
                marginBottom: '8px',
              }}
            >
              {prof.label}
            </p>
            <p
              style={{
                fontSize: '14px',
                color: '#666',
              }}
            >
              {prof.text}
            </p>
          </div>
        ))}
      </div>

      <p
        style={{
          marginTop: '50px',
          fontSize: '14px',
          color: '#888',
        }}
      >
        최첨단 면접관의 대답과 다양한 성향과 질문 스타일을 AI로 구현!
        <br />
        논리적인 교수부터 까다로운 압박형 교수까지, 실제 면접장에서 마주할 수 있는 면접관 경험을 체험해보세요.
      </p>
    </div>
  );
}
