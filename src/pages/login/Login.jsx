import { Container, Button } from "@mui/material";
import NavbarComponent from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useNavigateWithScrollTop } from '../../hooks/useNavigateWithScrollTop';
import { PATH } from "../../data/paths";

function Login() {
  const navigateAndScrollTop = useNavigateWithScrollTop();

  // 🔥 카카오 로그인 엔드포인트 (백엔드 주소에 맞게 수정)
  const KAKAO_LOGIN_URL = `${process.env.REACT_APP_API_BASE_URL}/auth/kakao/login`;

  const handleKakaoLogin = () => {
    window.location.href = KAKAO_LOGIN_URL;
  };

  return (
    <Container
      maxWidth={false}
      style={{
        position: "relative",
        backgroundColor: "var(--background-color)",
        height: "100vh",
        paddingTop: "120px",
        overflow: "hidden"
      }}
    >
      <NavbarComponent />

      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "70vh"
        }}
      >
        <h2 className="title-32-bold" style={{ marginBottom: "40px" }}>
          로그인
        </h2>

        {/* 카카오 로그인 버튼 */}
        <Button
          onClick={handleKakaoLogin}
          fullWidth
          sx={{
            width: "400px",
            height: "56px",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: 600,
            color: "#3A1D1D",
            backgroundColor: "#FEE500",
            "&:hover": {
              backgroundColor: "#FDD835"
            }
          }}
        >
          카카오로 로그인
        </Button>

        {/* 회원가입 버튼 */}
        <Button
          fullWidth
          onClick={() => navigateAndScrollTop(PATH.JOIN)}
          sx={{
            width: "400px",
            height: "56px",
            borderRadius: "8px",
            mt: "12px",
            fontSize: "16px",
            border: "1px solid var(--nuetral-50)",
            backgroundColor: 'var(--nuetral-10)',
            color: 'var(--font-body)',
            '&:hover': {
              backgroundColor: 'var(--nuetral-20)',
            }
          }}
        >
          회원가입
        </Button>
      </div>

      <Footer />
    </Container>
  );
}

export default Login;
