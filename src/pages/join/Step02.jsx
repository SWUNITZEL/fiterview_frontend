// src/pages/join/Step02.jsx

import { Container, Button } from "@mui/material";

function Step02({ onNext, toLogin }) {
  const authorizeUrl = `https://api.fiterview.site/springboot/oauth2/authorization/kakao`;

  const handleKakaoLogin = () => {
    window.location.href = authorizeUrl;
  };

  return (
    <Container maxWidth={false} style={{ paddingTop: 120, textAlign: "center" }}>
      <div style={{ marginTop: 40 }}>
        <Button
          variant="contained"
          onClick={handleKakaoLogin}
          sx={{
            width: 280,
            height: 48,
            borderRadius: 2,
            backgroundColor: "#FEE500",
            color: "#000",
            fontWeight: 600,
          }}
        >
          카카오로 시작하기
        </Button>
      </div>

      <h4
        className="body-16-medium"
        style={{ marginTop: 48, cursor: "pointer" }}
        onClick={() => toLogin?.()}
      >
        로그인 페이지로 돌아가기
      </h4>
    </Container>
  );
}

export default Step02;
