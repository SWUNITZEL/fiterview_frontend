import { Container, Button } from "@mui/material";
import { handleKakaoLogin } from '../../hooks/useKakaoAuth';

function Step02({ toLogin }) {
  return (
    <Container maxWidth={false} style={{ paddingTop: 120, textAlign: "center" }}>
      <div style={{ marginTop: 40 }}>
        <Button
          variant="contained"
          onClick={handleKakaoLogin}
          sx={{
            width: "300px",
            height: "45px",
            borderRadius: "8px",
            backgroundImage: 'url(/images/social_login/kakao_login_medium_narrow.png)',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundColor: '#FEE500',
            '&:hover': {
              backgroundColor: '#FEE500',
            }
          }}
        >
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
