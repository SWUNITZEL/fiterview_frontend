import { Container } from "@mui/material";
import "./PersonaSelection.css";
import { personas } from "../../data/personas";
import NavbarComponent from "../../components/Navbar";
import LoadingModal from "../../components/LoadingModal";
import { useInterviewConfig } from "../../hooks/useInterviewConfig";

const PersonaSelection = () => {
  const { selectedIds, isLoading, handleSelect, handleStartInterview } = useInterviewConfig();

  return (
    <Container
      maxWidth={false}
      style={{
        backgroundColor: "var(--background-color)",
        minHeight: "100vh",
        padding: "0 0",
        overflow: "hidden",
        display: "flex",
      }}
    >
      <NavbarComponent />
      {isLoading && <LoadingModal />}
      <div className="side-margin"></div>

      <main className="child-column-center content-box move-down">
        <h2
          className="title-32-bold title-center"
          style={{ marginTop: "80px", marginBottom: "0", textAlign: "center" }}
        >
          어떤 면접관과 연습 면접을 진행할까요?
        </h2>
        <p className="subtitle-16-semibold">한 명 이상의 면접관을 골라주세요.</p>
        <span
          className="body-14-medium"
          style={{
            marginTop: "10px",
            marginBottom: "96px",
            textAlign: "center",
            color: "var(--primary-40)",
          }}
        >
          ({selectedIds.length}/2)
        </span>

        <div className="persona-list">
          {personas.map((item) => (
            <div
              className={`persona-box drop-shadow-small ${selectedIds.includes(item.id) ? "selected" : ""}`}
              key={item.id}
              onClick={() => handleSelect(item.id)}
            >
              <div className="persona-box-left">
                <img src="/logo-placeholder.png" alt="면접관 이미지" className="persona-img" />
              </div>
              <div className="persona-box-right">
                <div className="subtitle-18-bold persona-name">
                  {item.name} <span className="persona-role">{item.role}</span>
                </div>
                <div className="body-14-regular persona-desc">{item.description}</div>
                <div className="caption-14-regular persona-questions">
                  <span style={{ display: "none" }}>{item.questions}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="form-group center-horizontal">
          <button className="start-button small-button" onClick={handleStartInterview}>
            면접 시작하기
          </button>
        </div>
      </main>
      <div className="side-margin"></div>
    </Container>
  );
};

export default PersonaSelection;
