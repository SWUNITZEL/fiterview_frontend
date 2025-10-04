// src/pages/join/Step02.jsx
import { Container, Button } from "@mui/material";

function Step02({ onNext, toLogin }) {
  const API_BASE = process.env.REACT_APP_API_BASE;

  const handleSocialLogin = (provider) => {
    const redirectUri = encodeURIComponent(`${window.location.origin}/#/auth/callback`);
    window.location.href = `${API_BASE}/oauth2/authorization/${provider}?redirectUri=${redirectUri}`;
  };

  return (
    <Container
      maxWidth={false}
      style={{
        width: "100%",
        backgroundColor: "var(--background-color)",
        minHeight: "auto",
        paddingTop: "120px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >


      <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginTop: "40px" }}>
        <Button
          variant="contained"
          onClick={() => handleSocialLogin('kakao')}
          sx={{
            width: 280, height: 48, borderRadius: 2,
            backgroundColor: '#FEE500', color: '#000', fontWeight: 600
          }}
        >
          카카오로 시작하기
        </Button>

        
      </div>

      <h4
        className="body-16-medium"
        style={{ marginTop: "48px", cursor: "pointer", textAlign: "center" }}
        onClick={() => toLogin()}
      >
        로그인 페이지로 돌아가기
      </h4>
    </Container>
  );
}

export default Step02;
