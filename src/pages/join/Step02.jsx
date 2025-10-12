import { Container, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

function Step02({ onNext, toLogin }) {
  const navigate = useNavigate();

  const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_KEY;
  const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;

  const authorizeUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;

  const handleKakaoLogin = () => {
    window.location.href = authorizeUrl;
  };

  // ✅ 테스트용 (로그인 이후 자동 처리 로직)
  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    if (!code) return;

    axios
      .post(`https://api.fiterview.site/springboot/kakaoLogin?code=${code}`)
      .then((res) => {
        const { accessToken, refreshToken, role } = res.data;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        if (role === "GUEST") navigate("/join?step=2");
        else navigate("/join?step=3");
      })
      .catch((err) => {
        console.error("카카오 로그인 실패:", err);
      });
  }, [navigate]);

  return (
    <Container
      maxWidth={false}
      style={{ paddingTop: 120, textAlign: "center" }}
    >
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