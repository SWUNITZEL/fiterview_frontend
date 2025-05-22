import React from "react";

const boxSize = 32;
const duration = 800;

const LoadingModal = () => {
  // keyframes 애니메이션을 style 태그로 삽입
  React.useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes box1 {
        0%, 50% { transform: translate(100%, 0); }
        100% { transform: translate(200%, 0); }
      }
      @keyframes box2 {
        0% { transform: translate(0, 100%); }
        50% { transform: translate(0, 0); }
        100% { transform: translate(100%, 0); }
      }
      @keyframes box3 {
        0%, 50% { transform: translate(100%, 100%); }
        100% { transform: translate(0, 100%); }
      }
      @keyframes box4 {
        0% { transform: translate(200%, 0); }
        50% { transform: translate(200%, 100%); }
        100% { transform: translate(100%, 100%); }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const backdropStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backdropFilter: "blur(10px)",
    background: "rgba(0, 0, 0, 0.2)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  };

  const cardStyle = {
    background: "var(--background-color)",
    borderRadius: 16,
    padding: "40px 60px",
    backdropFilter: "blur(20px)",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 20,
    width: "300px",
    height: "360px"
  };

  // 박스 애니메이션용 스타일과 색상
  const color = "var(--primary-40)";
  const colorRight = "var(--primary-80)"; // darken 15%
  const colorLeft = "var(--primary-60)"; // darken 5%
  const shadow = "var(--nuetral-50)";

  const size = boxSize;
  const translateZ = size / 2;

  const boxStyleBase = {
    width: size,
    height: size,
    position: "absolute",
    transformStyle: "preserve-3d",
  };

  const boxesContainerStyle = {
    height: size * 2,
    width: size * 3,
    position: "relative",
    transformStyle: "preserve-3d",
    transformOrigin: "50% 50%",
    transform: "rotateX(60deg) rotateZ(45deg) rotateY(0deg) translateZ(0px)",
    marginBottom: 0,
  };

  const faceStyle = (background, rotateY = "0deg", rotateX = "0deg", top, right, bottom, left, translateZValue) => ({
    position: "absolute",
    width: "100%",
    height: "100%",
    background,
    top,
    right,
    bottom,
    left,
    transform: `rotateY(${rotateY}) rotateX(${rotateX}) translateZ(${translateZValue}px)`,
  });

  return (
    <div style={backdropStyle}>
      <div style={cardStyle}>
        <p className = "body-16-medium" style={{ marginTop: "30px", marginBottom:"30px" }}>
          저장 중 입니다<br />페이지를 나가지 마세요
        </p>
        <div style={boxesContainerStyle}>
          {[1, 2, 3, 4].map((box, i) => {
            const positions = [
              { transform: "translate(100%, 0)", animationName: "box1" },
              { transform: "translate(0, 100%)", animationName: "box2" },
              { transform: "translate(100%, 100%)", animationName: "box3" },
              { transform: "translate(200%, 0)", animationName: "box4" },
            ];
            return (
              <div
                key={i}
                style={{
                  ...boxStyleBase,
                  top: 0,
                  left: 0,
                  transform: positions[i].transform,
                  animation: `${positions[i].animationName} ${duration}ms linear infinite`,
                }}
              >
                <div
                  style={faceStyle(color, "0deg", "0deg", 0, "auto", "auto", 0, translateZ)}
                />
                <div
                  style={faceStyle(colorRight, "90deg", "0deg", "auto", 0, "auto", "auto", translateZ)}
                />
                <div
                  style={faceStyle(colorLeft, "0deg", "-90deg", "auto", "auto", 0, "auto", translateZ)}
                />
                <div
                  style={faceStyle(shadow, "0deg", "0deg", 0, "auto", "auto", 0, -size * 3)}
                />
              </div>
            );
          })}
        </div>
        
      </div>
    </div>
  );
};

export default LoadingModal;
