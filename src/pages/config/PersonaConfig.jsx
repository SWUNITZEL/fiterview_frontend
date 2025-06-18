import { Container, Button } from "@mui/material";
import "./PersonaConfig.css";
import { personas } from "../../data/personas";
import NavbarComponent from "../../components/Navbar";
import Footer from "../../components/Footer";
import LoadingModal from "../../components/LoadingModal";
import { useInterviewConfig } from "../../hooks/useInterviewConfig";

const PersonaConfig = () => {
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
        flexDirection:"column"
      }}
    >
      <NavbarComponent />
      {isLoading && <LoadingModal />}
      <main className="child-column-center content-box move-down" style={{margin:"120px 240px"}}>
        <h2
          className="title-32-bold title-center"
          style={{ marginTop: "0px", marginBottom: "0", textAlign: "center" }}
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
                <img src={`/images/config/persona0${item.id}.png`} alt="면접관 이미지" className="persona-img" />
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
          <Button 
            onClick={handleStartInterview}
            sx={{
              marginLeft:"auto",
              marginRight:"auto",
              marginTop:"80px",
              marginBottom:"0px",
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '10px',
              gap: '10px',
              width: '300px',
              height: '50px',
              color:"var(--background-color)",
              fontSize:"16px",
              fontWeight:500,
              backgroundColor: 'var(--primary-60)',
              borderRadius: '8px',
              '& .MuiButton-label': {
                fontWeight: 500,
              },
              '&:hover': {
                backgroundColor: 'var(--primary-80)',
              },
          }}>
            면접 시작하기</Button>
        </div>
      </main>
      <Footer/>
    </Container>
  );
};

export default PersonaConfig;
